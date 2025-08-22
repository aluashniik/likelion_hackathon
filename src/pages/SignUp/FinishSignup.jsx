import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './FinishSignup.css'

const FinishSignup = () => {
  const navigate = useNavigate();
    return (
      <div className='finish-signup'>
        <Header title={'회원가입하기'}/>
        <h2>회원가입이 완료되었어요!</h2>
        <form className='login-box'>
          <input type="tel" placeholder='전화번호' />
          <input type="password" placeholder='비밀번호'/>
          <button className='login-btn' onClick={()=>navigate('/')}>로그인하기</button>
        </form>
        <div className="logo-cont">
        <img src={logo} alt="" className='small-logo'/>
        </div>
      </div>
    )
  }
export default FinishSignup
