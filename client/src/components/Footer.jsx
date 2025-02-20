import "../styles/Footer.scss"
import { LocationOn, LocalPhone, Email } from "@mui/icons-material"
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <a href="/"><img src="/assets/logo.png" alt="logo" /></a>
      </div>

      <div className="footer_center">
        <h3>Useful Links</h3>
        <li><a href="https://mumbaipolice.gov.in/TenantForm?ps_id=0" target="_blank" rel="noopener noreferrer">Mumbai Police Tenant Form</a></li>
        <li><a href="https://vcet.edu.in/" target="_blank" rel="noopener noreferrer">VCET ERP</a></li>
        <ul>
          <li>About Us</li>
          <li>Terms and Conditions</li>
          <li>Agreement Policy</li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+91 9987608710</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>Studenthive@gmail.com</p>
        </div>
        <img src="/assets/payment.png" alt="payment" />
      </div>
    </div>
  )
}

export default Footer