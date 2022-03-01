import { Link } from "react-router-dom";
import Actions from "./Actions";
import { FaTrash } from "react-icons/fa";
function ListingItem({ listing, id, onDelete }) {
  console.log(onDelete);
  return (
    <li className="post">
      <div className="info">
        <div className="user">
          <Link to={`/user/${listing.userRef}`}>
            <div className="username">{listing.username}</div>
          </Link>
        </div>
        {onDelete && (
          <FaTrash
            className="fa-trash"
            onClick={() => onDelete(listing.id, listing.name)}
          />
        )}
      </div>
      <Link to={`/category/${id}`} className="post-image">
        <img
          src={listing.imgUrls[0]}
          alt={listing.name}
          className="post-image"
        />
      </Link>
      <div className="post-content">
        <Actions
          docId={id}
          likesArray={listing.likes}
          priority={listing.priority}
        />
        {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="red"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>

          <p className="likes">{listing.likes.length} likes</p> */}
      </div>
    </li>
  );
}

export default ListingItem;
