import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import {facilities} from "../data"
import "./ListingDetails.css"
import { useSelector } from 'react-redux'
const ListingDetails = () =>{
    const [loading,setLoading]=useState(true);
    const [listing,setListing]=useState({})
    const {listingId}=useParams();

    try {
        useEffect(()=>{
            async function fetchingList(){
                const  response=await axios.get(`https://homerentsbackend.onrender.com/properties/${listingId}`);
                setListing(response.data.listing)
                setLoading(false)   
            }
            fetchingList();
        },[])
    } catch (error) {
    }
      const [startDate,setStartDate]=useState("")
      const [endDate,setEndDate]=useState("");
        const startString=startDate.toString();
        const endString=endDate.toString();
        const sDate=startString[8]+startString[9];
        const eDate=endString[8]+endString[9];
        const dayCount=Number(eDate)-Number(sDate);
    const navigate = useNavigate()
      const headers = {
        'Content-Type': 'application/json', // example header
      };
      const customerId=useSelector((state)=>state?.user?.user._id)

      const handleSubmit = async () => {
        try {
          const bookingForm = {
            customerId,
            listingId,
            hostId: listing.creator._id,
            startDate: startString,
            endDate: endString,
            totalPrice: listing.price * dayCount,
          }
    
          const bookingData= JSON.stringify(bookingForm)
          const respon=await axios.post("https://homerentsbackend.onrender.com/bookings/create",bookingData,{ 
            headers:headers
          })
    
          if (respon) {
            navigate(`/${customerId}/trips`)
          }
        } catch (err) {
        }
      }
    
   
  return (
    loading ? <Loading/>:(
        <>
        <Navbar/>
        <div className='listing-details'>Complete details of that listing</div>
        <div className='heart-icon'></div>
        <div className='photos'>
            {
                listing.listingPhotoPaths?.map((photo)=>(
                    <img className='listing-img' src={`https://homerentsbackend.onrender.com/${photo.replace("public","")}`}
                    alt='listing-photo'/>
                ))
            }
        </div>
        <h2 className='listing-h2'>{listing.streetAddress} {listing.district} in { listing.state}, {listing.city},</h2>
        <p className='listing-para'>{listing.guestCount} guests - {listing.bedroomCount} bedrooms -{" "}
          {listing.bathroomCount} bathrooms
        </p>
        <hr />

        <div className='profileImage'>
            <img src={`https://homerentsbackend.onrender.com/${listing.creator.profileImagePath.replace("public","")}`}/>
            <h3 className='profile-h3'>owned by {listing.creator.firstName} {listing.creator.lastName}</h3>

        </div>
        <hr />

        <div className='booking'>
            <div>
                <h2>What this place offers?</h2>
                <div className='amenities'>
                    {listing.amenities[0].split(",").map((item,index)=>(
                        <div className='facility' key={index}>
                            <div className='facility-icon'>
                                {
                                    facilities.find((facility)=>facility.name===item)?.icon
                                }
                            </div>
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='dateDiv'>
            <h2>How long do you want to stay?</h2>
            <div className='date'>
                <h4 className='date-h4'>start date: </h4>
                <input className='date-input' type='date' value={startDate} onChange={(e)=>setStartDate(e.target.value)}/>
                <h4 className='date-h4'>end date: </h4>
                <input className='date-input' type='date' value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
            </div>
            <button type='button' className='date-button' onClick={handleSubmit}>Book Now</button>
        </div>
        </div>
        </>
    )
   
  )
}

export default ListingDetails