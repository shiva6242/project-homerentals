import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { userActions } from '../redux/state';
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { MdOutlineFavorite } from "react-icons/md";

import './ListingCard.css'
const ListingCard = ({
    listingId,
    creator,
    listingPhotoPaths,
    city,
    district,
    state,
    price,
    startDate,
    endDate,
    totalPrice,
    booking,
}) => {
    const dispatch=useDispatch();
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate=useNavigate()
  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };



  const user=useSelector((state=>state?.user?.user))
  const wishList=user?.wishList||[]
  const isLiked=wishList?.find((item)=>item?._id===listingId)


  const bookingHandler=()=>{
    if(user)
    {
      navigate(`/properties/${listingId}`)
    }
    else{
      return{}
    }
  }
  const headers={
    'Content-Type':'application/json',
  }
  const patchWishList=async()=>{
    try {
      const response=await axios.patch(`https://homerentsbackend.onrender.com/users/${user?._id}/${listingId}`,{
        headers:headers
      })
     dispatch(userActions.setwishList(response.data.wishList))
    } catch (error) {
    }
  }


  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  return (
      <div className='listings'>
        <div
          className="listing_card"
          onClick={bookingHandler}
        >
          <div className="slider_container">
            <div
              className="slider"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
               {listingPhotoPaths?.map((photo, index) => (
                <div key={index} className="slides">
                  <img className='imageList'
                    src={`https://homerentsbackend.onrender.com/${photo.replace("public","")}`}
                  />
                  <div
                    className="prev-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevSlide(e);
                    }}
                  >
                    <FcPrevious />
                  </div>
                  <div
                    className="next-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextSlide(e);
                    }}
                  >
                <FcNext />                  
                </div>
               </div>
              ))} 
            </div>
          </div>
    
          <h3 className='listing-h3'>
            {city}, {state}
          </h3>
    
          {!booking ? (
            <>
              <p className='listing-p'>
                <span className='listing-span'>₹{price}</span> per day
              </p>
            </>
          ) : (
            <>
              <p className='listing1-p'>
                {startDate} - {endDate}
              </p>
              <p  className='listing1-p'>
                <span className='listing1-span'>${totalPrice}</span> total
              </p>
            </>
          )}
    
          <button
            className="favorite"
            onClick={(e) => {
              e.stopPropagation();
              patchWishList();
            }}
            disabled={!user}
          >
            {isLiked ? (
              <MdOutlineFavorite className='fav-icon' style={{color:'red'}}/>
            ) : (
              <MdOutlineFavorite className='fav-icon' style={{color:'white'}}/>
            )}
          </button>
        </div>
        </div>
    
  )
}

export default ListingCard
