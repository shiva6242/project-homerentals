import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import Create_Listing from './pages/Create_Listing'
import ListingDetails from './pages/ListingDetails'
import PropertyList from './pages/PropertyList'
import TripList from './pages/TripList'
import WishList from './pages/WishList'
import PlacePage from './pages/PlacePage'
import SearchPage from './pages/SearchPage'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/create-listing' element={<Create_Listing/>}/>
        <Route path='/properties/:listingId' element={<ListingDetails/>}/>
        <Route path="/properties/place/:place" element={<PlacePage />} />
        <Route path='/:userId/properties' element={<PropertyList/>}/>
        <Route path='/properties/search/:search' element={<SearchPage/>}/>
        <Route path='/:userId/trips' element={<TripList/>}/>
        <Route path='/:userId/wishlist' element={<WishList/>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
