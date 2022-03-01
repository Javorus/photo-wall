import { useEffect, useState } from 'react'
import {Timestamp ,collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import { db } from '../firebase.config'
//import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router'
import ListingItem from '../components/ListingItem'

function Hot() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(false)

    const params = useParams()
    useEffect(() => {
        const fetchListings = async() => {
            try {
                const listingsRef = collection(db, 'listings')
                const q = query(
                    listingsRef,
                    orderBy('priority', 'desc'),
                    
                    limit(10)
                )

                const querySnap = await getDocs(q)

          
                const listings = []

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setListings(listings)
                setLoading(false)
            } catch (error) {
                
                console.log(error)
            }
        }
        fetchListings()
    }, [])
    return (<>
        <header>
            <p className="main">
                
            </p>
        </header>
        {loading ? (<Spinner />)
            : listings && listings.length > 0 ? (
                <>
                    <main className='main'>
                        <div className="content-container">
                            <ul className="content-list">
                                {listings.map((listing) => (
                                    <ListingItem
                                        key={listing.id}
                                        id={listing.id}
                                        listing={listing.data}
                                    />
                                ))}
                            </ul>
                            </div>
                    </main>
                </>
            ): (<p>No lisitngs</p>)}
    </>)
}

export default Hot