import React from 'react'
import './Login.css'
import Navbar from '../../components/Navbar/Navbar'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
    return (
      <div className='login'>
        <img src={logo} alt="" className='logo-icon'/>
        <form className='login-box'>
          <input type="tel" placeholder='전화번호' />
          <input type="password" placeholder='비밀번호'/>
          <button className='login-btn'>로그인하기</button>
        </form>
          <h3>온마을이 처음이라면?</h3>
          <button className='to-signup' onClick={()=>navigate('/signup')}>회원가입하기</button>
      </div>
    )
  }
export default Login