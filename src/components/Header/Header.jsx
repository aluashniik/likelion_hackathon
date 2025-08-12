import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();
    
    return (
        <div className="header">
            임시헤더
        </div>
  )
}

export default Header