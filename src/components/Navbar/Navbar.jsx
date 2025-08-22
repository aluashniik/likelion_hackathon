import React from 'react'
import './Navbar.css'

import { useNavigate, useLocation, Link } from 'react-router-dom'
import class_icon from '../../assets/class_icon.png'
import home_icon from '../../assets/home_icon.png'
import mypage_icon from '../../assets/mypage_icon.png'
import myreq_icon from '../../assets/myreq_icon.png'
import class_light from '../../assets/lecture_light.png'
import home_light from '../../assets/home_light.png'
import my_light from '../../assets/my_light.png'
import myreq_light from '../../assets/myreq_light.png'

const Navbar = () => {

  const locationNow = useLocation();
  // const navigate = useNavigate();

  if (
    locationNow.pathname === "/login" ||
    locationNow.pathname === "/request/chat"
  ) {
    return null; // navbar 숨김
  } else {
    return (
      <nav className="navbar">
        <Link to="/" className="nav-link">
          {locationNow.pathname === "/" ? 
            <img src={home_icon} alt="" className='icon' /> :
            <img src={home_light} alt="" className='icon' />}
          <p>홈</p>
        </Link>
        <Link to="/lecture" className="nav-link">
          {locationNow.pathname.startsWith("/lecture") ? 
            <img src={class_icon} alt="" className='icon' /> :
            <img src={class_light} alt="" className='icon' />}
          <p>수업</p>
        </Link>
        <Link to="/myrequest" className="nav-link">
          {locationNow.pathname.startsWith("/myrequest") ? 
            <img src={myreq_icon} alt="" className='icon' /> :
            <img src={myreq_light} alt="" className='icon' />}
          <p>요청</p>
        </Link>
        <Link to="/mypage" className="nav-link">
          {locationNow.pathname.startsWith("/mypage") ? 
            <img src={mypage_icon} alt="" className='icon' /> :
            <img src={my_light} alt="" className='icon' />}
          <p>내 정보</p>
        </Link>
      </nav>
    );
  }
}

export default Navbar