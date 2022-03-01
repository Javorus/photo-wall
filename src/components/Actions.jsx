import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import {
  updateDoc,
  collection,
  doc,
  FieldValue,
  arrayUnion,
  arrayRemove,
    Timestamp,
  serverTimestamp, add
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Actions({ docId, likesArray, priority }) {
  const [toggleLiked, setToggleLiked] = useState(false);
  const [likes, setLikes] = useState(likesArray.length);

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);
  let userId = "";

  const nowTimestamp = Timestamp.now();
  const weekOldTimestamp = Timestamp.fromMillis(
    nowTimestamp.toMillis() - 604800000
  );
  

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);

    if (isMounted) {
        const nowTimestamp = Timestamp.now();
        const lowerPriority = Timestamp.fromMillis(priority.toMillis() - 604800000);
        const higherPriority = Timestamp.fromMillis( priority.toMillis() + 604800000);
      const listingsRef = doc(db, "listings", docId);
      
      onAuthStateChanged(auth, (user) => {
        if (user) {
    
          updateDoc(listingsRef, {
              likes: toggleLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
              priority:toggleLiked ? lowerPriority:higherPriority
                
          });
        } else {
          navigate("/sign-in");
        }
      });
    }

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if (likesArray.includes(user.uid)) {
            setToggleLiked(true);
          }
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <svg
            onClick={handleToggleLiked}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleToggleLiked();
              }
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
            className={`w-8 mr-4 select-none cursor-pointer focus:outline-none ${
              toggleLiked ? "fill-primary text-gray-700" : "text-black-light"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
      <div className="likes">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
      </div>
    </>
  );
}

export default Actions;
Actions.propTypes = {
  docId: PropTypes.string.isRequired,
    likesArray: PropTypes.array.isRequired,
  timestamp: PropTypes.instanceOf(Timestamp)
};
