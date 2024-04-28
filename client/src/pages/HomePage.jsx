import React from 'react'
import Navbar from '../components/Navbar'
import Slide from '../components/slide'
import Places from '../components/Places'
import ListingCard from '../components/ListingCard'
import Listings from '../components/Listing'
import Footer from '../components/Footer'

const HomePage = () => {
  return (<>
    <Navbar/>
    <Slide/>
    <Places/>
    <Listings/>
    <Footer/>
    {/* <ListingCard/> */}
    </>
  )
}

export default HomePage