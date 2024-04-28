import React,{useState,useEffect} from 'react' 
import {useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Loading from '../components/Loading'
import axios from 'axios'
import Navbar from '../components/Navbar'
import ListingCard from '../components/ListingCard'
import { userActions } from '../redux/state'
import '../components/Listing.css'
import Footer from '../components/Footer'

const SearchPage = () => {
    const {search}=useParams()
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(true);
    const listings=useSelector((state)=>state?.user.listings)
    try {
        useEffect(()=>{
            const fetchSearchList=async()=>{
                const response =await axios.get(`https://homerentsbackend.onrender.com/properties/search/${search}`)
                if(response)
                {
                    dispatch(userActions.setLisitings({listings:response.data}))
                    setLoading(false);
                }
            }
            fetchSearchList();
        },[])
    } catch (error) {
    }
  return loading ?<Loading/>:(
    <>
        <Navbar/>
        <h1 className='h1_page'>{search}</h1>
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

export default SearchPage