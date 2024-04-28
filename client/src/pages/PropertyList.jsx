import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import axios from 'axios'
import { userActions } from "../redux/state";
import '../components/Listing.css'

const PropertyList = () => {
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state?.user?.user)
  const propertyList = user?.propertyList;

  const dispatch = useDispatch()
  const getPropertyList = async () => {
    try {
        const response=await axios.get(`https://homerentsbackend.onrender.com/users/${user._id}/properties`)
      dispatch(userActions.setPropertyList(response.data))
      setLoading(false)
    } catch (err) {
    }
  }

  useEffect(() => {
    getPropertyList()
  }, [])

  return loading ? <Loading /> : (
    <>
      <Navbar />
      <h1 className="h1_page">Your Property List</h1>
      <div className="listings">
        {propertyList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            state,
            streetAddress,
            price,
            booking = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              state={state}
              streetAddress={streetAddress}
            
              price={price}
              booking={booking}
            />
          )
        )}
      </div>

     
    </>
  );
};

export default PropertyList;
