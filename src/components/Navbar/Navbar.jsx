import React from 'react'
import './Navbar.css'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import class_icon from '../../assets/class_icon.png'
import home_icon from '../../assets/home_icon.png'
import mypage_icon from '../../assets/mypage_icon.png'
import myreq_icon from '../../assets/myreq_icon.png'

const Navbar = () => {

  const locationNow = useLocation();
  const navigate = useNavigate();

  if (
    locationNow.pathname === "/login" ||
    locationNow.pathname === "/request/chat"
  ) {
    return null; // navbar 숨김
  } else {
    return (
      <nav className="navbar">
        <Link to="/" className="nav-link">
          <img src={home_icon} alt="" className='icon' />
          <p>홈</p>
        </Link>
        <Link to="/lecture" className="nav-link">
          <img src={class_icon} alt="" className='icon' />
          <p>수업</p>
        </Link>
        <Link to="/myrequest" className="nav-link">
          <img src={myreq_icon} alt="" className='icon' /> 
          <p>요청</p>
        </Link>
        <Link to="/mypage" className="nav-link">
          <img src={mypage_icon} alt="" className='icon' />
          <p>내 정보</p>
        </Link>
      </nav>
    );
  }
}

export default Navbar