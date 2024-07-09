import React, { useState } from 'react'
import { IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userActions } from '../redux/state';
import { CiSearch } from "react-icons/ci";

import './Navbar.css'
const Navbar = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const tokenUser= useSelector((state) => state.user);
    const user=tokenUser.user
    let containsSubstring=false;
    console.log(user)
    if(user){
      const mainString = user.profileImagePath;
      const substring = "public";
  
     containsSubstring = mainString.indexOf(substring) !== -1;
     }
     console.log(containsSubstring)
    const dispatch = useDispatch();
  
    const [search, setSearch] = useState("")
  
    const navigate = useNavigate()
    const handleClick=()=>{
      if(search==="")
      {
        return {}
      }
      else{
        navigate(`/properties/search/${search}`)
      }
    }

  return (<>
      <div className='navbar1'>
        <Link to='/' className='anchor' >
          <img className='imageNav' src="/assets/logoImage.jpeg"
           alt='logo'/>
        </Link>
        <div className='navbar_search' >
        <input type='search' value={search} placeholder='search...' 
            onChange={(e)=>setSearch(e.target.value)}/>
        <div className='search_div'>
        <CiSearch  onClick={handleClick} className='search_icon'/>

        </div>

        </div>
        <button className='btnAtNavbar' onClick={()=>setDropdownMenu(!dropdownMenu)
}> 
            <div>
            <IoMenu className='menu'/>
            {!user ? (
                    (<FaUserCircle className='user'/>)          ) : (containsSubstring===true?
            <img className='navbar-profile' src={`http://localhost:3001/${user.profileImagePath.replace( 
              "public",
              ""
            )}`}

              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "10%" }}
            />: <img className='navbar-profile' src={user.profileImagePath}

              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
            </div>
            
        </button>
        {dropdownMenu && !user && (
          <div className="dropdownmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )} 

        {dropdownMenu && user && (
          <div className="dropdownmenu1">
            <Link to={`/${user._id}/trips`}>Trip List</Link>
            <Link to={`/${user._id}/wishlist`}>Wish List</Link>
            <Link to={`/${user._id}/properties`}>Property List</Link>
            <Link to="/create-listing">Become A Host</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(userActions.resetUser());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
    </div>
    </>
  )
}

export default Navbar

