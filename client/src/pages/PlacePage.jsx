import React, { useEffect, useState } from 'react'
import axios from "axios"
import { places } from '../data';
import {useSelector,useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import { userActions } from '../redux/state';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import ListingCard from '../components/ListingCard';
import '../components/Listing.css'
import Footer from '../components/Footer';
const PlacePage = () => {
    const dispatch=useDispatch()
    const {place}=useParams()
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
       const  getPlaceListings=async()=>{
            const response=await axios.get(`https://homerentsbackend.onrender.com/properties?place=${place}`)
            if(response)
            {
                dispatch(userActions.setLisitings({listings:response.data}))
                setLoading(false)
            }
        }
        getPlaceListings();
    },[])
    const listings=useSelector((state)=>state?.user.listings);
  return loading ?<Loading/>:(
    <>
        <Navbar/>
        <h1 className='h1_page'>{place} listings</h1>
        <div className='listings'>
        {listings?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            state,
           streetAddress,
           district,
            price,
            booking = false,
          }) => (
            <ListingCard
            key={_id}
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              district={district}
              state={state}
              streetAddress={streetAddress}
              price={price}
              booking={booking}
            />
          )
        )}
        </div>
        <Footer/>
    </>
  )
}

export default PlacePage