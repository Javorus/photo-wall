import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { collection, getDocs, query, where, orderBy, limit, startAfter,doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Profile() {
  const auth = getAuth();
  const {loggedIn, checkingStatus} = useAuthStatus()
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onToggle = () => {
    setChangeDetails(!changeDetails);
    if (changeDetails) {
      onSubmit();
    }
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: name,
        });
      }
    } catch (error) {
      //  toast.error('Could not update profile details')
    }
  };

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };


  useEffect(() => {
    const fetchListings = async () => {
      if (loggedIn) {
        try {
         
          const listingsRef = collection(db, "listings");
        
          const q = query(listingsRef, where("userRef", "==", auth.currentUser.uid));
       
          const querySnap = await getDocs(q);

          const listings = [];

          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
              
            });
          });
          setListings(listings);
          setLoading(false);
        } catch (error) {
             console.log(error)
        }
      }
    };
    fetchListings();
  }, );

  
  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this?'))
    {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter((listing) => listing.id !== listingId)
      setListings(updatedListings)
      toast.success('Listing deleted')
     }
}

  return (
    <div>
    <div className="profile ">
      <div className="listing-card p-4">
        <header className=" flex justify-evenly text-2xl text-semibold ">
          <p className="pr-1 ">
            My Profile</p>
            <button
              className="btn btn-primary btn-sm   text-lg "
              onClick={onLogout}
            >
              Logout
            </button>
        </header>
        <main>
          <div className="profileDetailsHeader">
            <div className="mt-4">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={changeDetails}
                onChange={onToggle}
              />
            </div>

            {/* <p className="mt-10" onClick={() => {
          changeDetails && onSubmit()
          setChangeDetails((prevState) => !prevState)
        }}>
          {changeDetails ? 'done' : 'change'}
        </p> */}
          </div>
          <div className="">
            <form
              className={
                "flex flex-col" + (!changeDetails ? "" : " text-black ")
              }
            >
              <label className="text-white"> Name</label>
              <input
                type="text"
                id="name"
                className={
                  "border-2 border-primary " + (!changeDetails ? "" : "")
                }
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
              <label className="text-white"> E-mail</label>
              <input
                type="Email"
                id="email"
                className={
                  "border-2 border-primary " + (!changeDetails ? "" : "")
                }
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </form>
          </div>
        </main>
      </div>

      </div>
      <div className='test'>
       
       {loading ? (<Spinner />)
             : listings && listings.length > 0 ? (
                 <>
                     <main className=''>
                         <div className="content-container">
                             <ul className="profile-grid">
                    {listings.map((listing) => (
                      <ListingItem
                        key={listing.id}
                        id={listing.id}
                        listing={listing.data}
                        onDelete={() => onDelete(listing.id)}
                                     />
                                 ))}
                             </ul>
                             </div>
                     </main>
                 </>
           ) : (<p>No lisitngs</p>)}
         </div>
      </div>
  );
}

export default Profile;
