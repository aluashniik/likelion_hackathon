import React from 'react'
import './SignUp.css'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className='sign-up'>
        <Header title={"회원가입하기"}/>
        <div className="signup-age">
          <h1>저는...</h1>
          <button className='select-age senior' onClick={()=>{navigate('/signup/form', { state: { role: "senior" } })}}>
            <h3>디지털 기기<br/>도움을 받고 싶은</h3>
            <h1>어르신이에요!</h1>
          </button>
          <button className='select-age junior' onClick={()=>{navigate('/signup/form', { state: { role: "junior" }})}}> 
            <h3>디지털 기기<br/>도움을 드리고 싶은</h3>
            <h1>청년이에요!</h1>
          </button>
          <img src={logo} alt="" className='small-logo'/>
        </div>
    </div>
  )
}

export default SignUp