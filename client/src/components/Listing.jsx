import { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/state";
import './Listing.css'
const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);



  const getFeedListings = async () => {
    try {
      const response = await fetch( "https://homerentsbackend.onrender.com/properties/create",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(userActions.setLisitings({ listings: data }));
      setLoading(false);
    } catch (err) {
    }
  };

  useEffect(() => {
    getFeedListings();
  }, []);
  const newlist = useSelector((state) => state.user)
const listings=newlist.listings

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="listings">
          {listings.data.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              district,
              state,
              price,
              booking=false
            }) => (
              <ListingCard
              key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                district={district}
                state={state}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
