import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import styles from './Create_Listing.module.css'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { facilities } from '../data';
import { IoIosImages } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Create_Listing = () => {
    const tokenUser= useSelector((state) => state.user);
    const creatorId=tokenUser.user._id
    const navigate=useNavigate()
    const [amenities, setAmenities] = useState([]);

    const [guestCount,setGuestCount]=useState(1);
    const [bedroomCount,setBedroomCount]=useState(1);
    const [bathroomCount,setBathroomCount]=useState(1);
    const [formLocation, setFormLocation] = useState({
        streetAddress: "",
        city: "",
        district: "",
        state: "",
      });
    const [price,setPrice]=useState(1500)
      
    const handleSelectAmenities = (facility) => {
        if (amenities.includes(facility)) {
          setAmenities((prevAmenities) =>
            prevAmenities.filter((option) => option !== facility)
          );
        } else {
          setAmenities((prev) => [...prev, facility]);
        }
      };    
  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };
  const [photos,setPhotos]=useState([])

  const handleUploadPhotos = async(e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

    const handlePost=async(e)=>{
        e.preventDefault()
        try {
            const newFormData=new FormData()
            newFormData.append("creator",creatorId);
            newFormData.append('streetAddress',formLocation.streetAddress)
            newFormData.append('city',formLocation.city);
            newFormData.append('district',formLocation.district);
            newFormData.append('state',formLocation.state);

            newFormData.append('guestCount',guestCount);
            newFormData.append('bedroomCount',bedroomCount);
            newFormData.append('bathroomCount',bathroomCount);
            newFormData.append('amenities',amenities)
            newFormData.append('price',price);
            photos.forEach(photo => {
                newFormData.append("listingPhotos",photo)
            });
            const response= await axios.post("https://homerentsbackend.onrender.com/properties/create",newFormData)
            if(response)
            {
                navigate('/');

            }
        } catch (err) {

        }

    }
  return (<>

  <Navbar/>    <center>

    <div className={styles.create_listing}></div>
    <h1>Publish Your Place</h1>
    <form onSubmit={handlePost}>
    <h3 className={styles.create_h3}>Where's your place located?</h3>
            <div className={styles.full}>
              <div className={styles.location}>
                <p className={styles.para1}>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className={styles.half}>
              <div className={styles.half}>
              <div className={styles.location}>
                <p className={styles.para1}>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              </div>
            </div>
            <div  className={styles.half} >
              <div className={styles.location}>
                <p className={styles.para1}>District</p>
                <input
                  type="text"
                  placeholder="District"
                  name="district"
                 value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div >
                <p className={styles.para1}>State</p>
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                 value={formLocation.country}
                 onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            <h3 className={styles.create_h3}>Share some basics about your place</h3>
            <div className={styles.basics}>
              <div className={styles.basic}>
                <p className={styles.para2}>Guests</p>
                <div className={styles.basic_count}>
                <CiCircleMinus                      className={styles.addMinBtn}
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                  />
                  <p  className={styles.counts}>{guestCount}</p>
                  <CiCirclePlus 
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                    className={styles.addMinBtn}
                  />
                </div>
              </div>

              <div className={styles.basic}>
                <p  className={styles.para2}>Bedrooms</p>
                <div className={styles.basic_count}>
                <CiCircleMinus 
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                    className={styles.addMinBtn}
                  />
                  <p  className={styles.counts}>{bedroomCount}</p>
                  <CiCirclePlus 
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
                    }}
                    className={styles.addMinBtn}
                  />
                </div>
              </div>
              <div className={styles.basic}>
                <p  className={styles.para2}>Bathrooms</p>
                <div className={styles.basic_count}>
                <CiCircleMinus
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                    className={styles.addMinBtn}
                  />
                  <p className={styles.counts}>{bathroomCount}</p>
                  <CiCirclePlus 
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
                    }}
                    className={styles.addMinBtn}
                  />
                </div>
              </div>
            </div>

            <h3 className={styles.create_h3}>Tell guests what your place has to offer</h3>
            <div className={styles.amenities}>
              {facilities?.map((item, index) => (
                <div
                  className={`${styles.facility} ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className={styles.facility_icon}>{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h3 style={{padding:"15px 10px"}}>Add some photos of your place</h3>
            <div className={styles.photos}>
            {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className={styles.imgages}>
                          <div className={styles.icon}>
                            <IoIosImages />
                          </div>
                          <p style={{color:"black"}}>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                        
                            
                        <div className={styles.photo}>
                                <img className={styles.uploadPhoto}
                                src={URL.createObjectURL(photo)}
                                alt="place"/>
                                </div>
                          )
                        })
                          }
                           <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className={styles.imgages}>
                          <div className={styles.icon}>
                            <IoIosImages />
                          </div>
                          <p style={{padding:"15px 10px",color:"black"}}>Upload from your device</p>
                        </label>
                        </> )        
                    }
            </div>
            <p className={styles.para}>Now, set your PRICE</p>
              <span>₹</span>
              <input
                type="number"
                placeholder="1500"
                name="price"
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                className={styles.price}
                required
              />
              <br/>
            <button className={styles.submit_btn} onClick={(e)=>handlePost(e)} type="submit">
            CREATE YOUR LISTING
          </button>
    </form>
    </center>
    </>
    )
}
export default Create_Listing