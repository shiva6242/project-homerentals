import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { userActions } from '../redux/state'
import {  useDispatch } from 'react-redux'
import './LoginPage.css'
const LoginPage = () => {
  const dispatch=useDispatch()
  const [errorMsg,setErrorMsg]=useState("")
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const handleChange=(e)=>{
    setFormData((prevVal)=>{
      return{
        ...prevVal,
        [e.target.name]:e.target.value
      }
    })
  }
  const headers = {
    'Content-Type': 'application/json', // example header
  };
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const postData= JSON.stringify(formData)
      const respon=await axios.post("https://homerentsbackend.onrender.com/auth/login",postData,{ 
        headers:headers
      })
      // const loggedIn= await respon.json()
      if(respon)
      {
        dispatch(userActions.setUser({
          user:respon.data.user,
          token:respon.data.token
          }))
        navigate('/'); 
      }
    } catch (error) {
      setErrorMsg(error.response.data.msg)
    }
  }
  return ( <>
    <div className="login">
    <div className="login_content">
      <form className="login_content_form" onSubmit={handleSubmit}>
      <input className='login_input'
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
          className='login_input'
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <p className='errorMsg'>{errorMsg}</p>
           <button className='button' type="submit">LOGIN</button>
           <Link to='/register'>didn't have account ? signup here</Link>
      </form>
      </div>
      </div>
  </>
  )
}

export default LoginPage