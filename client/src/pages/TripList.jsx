import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { userActions } from '../redux/state';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer'
import '../components/Listing.css'
const TripList = () => {
    const userId=useSelector((state)=>state?.user?.user._id);
    const dispatch=useDispatch();
    const tripList=useSelector((state)=>state?.user?.user.tripList)
    const [loading,setLoading]=useState(true);
    try {
        useEffect(()=>{
            const fetchTripList=async()=>{
                const response =await axios.get(`https://homerentsbackend.onrender.com/users/${userId}/trips`)
                if(response)
                {
                    dispatch(userActions.setTripList(response.data))
                    setLoading(false);
                }
            }
            fetchTripList();
        },[])
    } catch (error) {
        
    }
  
  return (
    loading?<Loading/>:(
        <>
        <Navbar/>
        <h1 className='h1_page'>Your trip List</h1>
        <div className='listings'>
            {
                tripList?.map(({listingId,hostId,startDate,endDate,totalPrice,booking=true})=>(
                    <ListingCard
                    listingId={listingId._id}
                    creator={hostId._id}
                    listingPhotoPaths={listingId.listingPhotoPaths}
                    district={listingId.district}
                    state={listingId.state}
                    streetAddress={listingId.streetAddress}
                    startDate={startDate}
                    endDate={endDate}
                    totalPrice={totalPrice}
                    booking={booking}
                    city={listingId.city}
                    />
                ))
            }

        </div>
        <Footer/>
        </>
    )
  )
}

export default TripList