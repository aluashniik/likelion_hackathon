import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

const Header = ({title}) => {
    const navigate = useNavigate();
    
    return (
        <div className="header">
            {title?title:"LOGO"}
        </div>
  )
}

export default Header