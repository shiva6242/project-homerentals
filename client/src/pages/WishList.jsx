
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import '../components/Listing.css'
import Footer from "../components/Footer";

const WishList = () => {
  const wishList = useSelector((state) => state.user.user.wishList);

  return (
    <>
      <Navbar />
      <h1 className="h1_page">Your Wish List</h1>
      <div className="listings">
        {wishList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            state,
            district,
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
              district={district}
              streetAddress={streetAddress}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>
      <Footer/>
    </>
  );
};

export default WishList;
