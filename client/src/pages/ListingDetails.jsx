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
    const [errorMsg,setErrorMsg]=useState("")

    const[containsSubstring,setcontainsSubstring]=useState(false);
   console.log(containsSubstring)
    try {
        useEffect(()=>{
            async function fetchingList(){
                const  response=await axios.get(`http://localhost:3001/properties/${listingId}`);
                setListing(response.data.listing)
                console.log(response.data.listing)
                  const mainString = response.data.listing.creator.profileImagePath;
                  const substring = "public\\uploads\\";
              
                 const Substring = mainString.indexOf(substring) !== -1;
                 setcontainsSubstring(Substring)
                 console.log(containsSubstring)

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
      const user=useSelector((state)=>state?.user);
      console.log(user)
      const handleSubmit = async () => {
        if(startDate===""||endDate===""||dayCount<0)
          {
            setErrorMsg("select a proper date");
            setTimeout(()=>{
                setErrorMsg("")
            },3000)
            return ;
          }
        try {
          const bookingForm = {
            customerId,
            listingId,
            hostId: listing.creator._id,
            startDate: startString,
            endDate: endString,
            totalPrice:Math.floor((listing.price)/30 * dayCount),
          }
    
          const bookingData= JSON.stringify(bookingForm)
          const respon=await axios.post("http://localhost:3001/bookings/create",bookingData,{ 
            headers:headers
          })
          const subject = encodeURIComponent('Booking Inquiry');
          const body = encodeURIComponent(
            `I would like to book your listing ,these are the details...
            streetAddress:${listing.streetAddress},
            district:${listing.district},
            city:${listing.city},
            state:${listing.state},
            bedroomCount:${listing.bedroomCount},
            guestCount:${listing.guestCount},
            bathroomCount:${listing.bathroomCount},
            price:${listing.price}`
);
   const mailtoLink = `mailto:${listing.creator.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
          
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
                    <img className='listing-img' src={`http://localhost:3001/${photo.replace("public","")}`}
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
           {containsSubstring===true?<img src={`http://localhost:3001/${listing.creator.profileImagePath.replace("public","")}`}/>
           :<img src={listing.creator.profileImagePath} />}
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
            <h2 >The price of the listing: <span style={{color:'orange'}}>{listing.price}₹</span></h2>
            <div className='dateDiv'>
            <h2>How long do you want to stay?</h2>
<center><h5 style={{color:'red'}}>{errorMsg}</h5></center>
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
