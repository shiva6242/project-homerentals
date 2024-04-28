import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './Footer.css'
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <Link to="/"><img src="/assets/logoImage.jpeg" alt="logo" /></Link>
      </div>

      <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
          <li>About Us</li>
          <li>Terms and Conditions</li>
          <li>Return and Refund Policy</li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>  
        <div className="footer_right_info">
        <FaPhoneAlt  className="phone-icon"/>
          <p>+1 234 567 890</p>
        </div>
        <div className="footer_right_info">
        <MdEmail  className="email-icon"/>
          <p>homerentals@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Footer