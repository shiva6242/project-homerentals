import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import './Register.css'
const RegisterPage = () => {
  const [errorMsg,setErrorMsg]=useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    setFormData((prevVal)=>{
      return{
        ...prevVal,
        [e.target.name]:e.target.value,
        [e.target.name]: e.target.name === "profileImage" ? e.target.files[0] : e.target.value,
      }
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true)

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }
    
    const data =await (axios.post("https://homerentsbackend.onrender.com/auth/register",register_form))
      if(data)
      {
        alert('regestration successfull...')
        navigate('/login')
      }
    } catch (err) {
      setErrorMsg(err.response.data.message)
    }
  }

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            className="register_input"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
             className="register_input"
            placeholder="Last Name"
            name="lastName"
           value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
             className="register_input"
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
             className="register_input"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <input
           className="register_input"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />

          {!passwordMatch && (<div>
            <p style={{ color: "red" }}>Passwords are not matched!</p>
            </div>
          )}
            {
                          <p className="errorMsg">{errorMsg}</p>

            }
          <input
             className="register_input"
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p className="ppp">Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )} 
          <button  className="button" type="submit" disabled={!passwordMatch}>REGISTER</button>
        </form>
        <Link to="/login">Already have an account? Log In Here</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
