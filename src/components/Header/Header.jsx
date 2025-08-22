import React from 'react'
import './Header.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = ({title}) => {
    const navigate = useNavigate();
    const locationNow = useLocation();

    if (
        locationNow.pathname === "/lecture" ||
        locationNow.pathname === "/myrequest" ||
        locationNow.pathname === "/" ||
        locationNow.pathname === "/mypage" ||
        locationNow.pathname === "/signup" ||
        locationNow.pathname === "/signup/form/login"
      ) {
        return (
            <div className="header">
                <div className="page-name">{title?title:"LOGO"}</div>
            </div>
        );
      } else {
        return (
            <div className="header">
                <div className="back" onClick={()=>navigate(-1)}><p> {"<"} 뒤로 </p></div>
                <div className="page-name">{title?title:"LOGO"}</div>
            </div>
        )
    }
}

export default Header