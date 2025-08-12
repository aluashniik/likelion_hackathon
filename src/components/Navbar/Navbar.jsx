import React from 'react'
import './Navbar.css'
import { useNavigate, useLocation, Link } from 'react-router-dom'

const Navbar = () => {

  const locationNow = useLocation();
  const navigate = useNavigate();

  if (
    locationNow.pathname === "/login" ||
    locationNow.pathname === "/help/helpchat"
  ) {
    return null; // navbar 숨김
  } else {
    // 네비게이션 표시
    return (
      <nav className="navbar">
        <Link to="/" className="nav-link">
          <p>홈</p>
        </Link>
        <Link to="/lecture" className="nav-link">
          <p>수업</p>
        </Link>
        <Link to="/myrequest" className="nav-link">
          <p>요청</p>
        </Link>
        <Link to="/mypage" className="nav-link">
          <p>내 정보</p>
        </Link>
      </nav>
    );
  }
}

export default Navbar