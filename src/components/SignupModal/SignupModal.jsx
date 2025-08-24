import React from 'react'
import './SignupModal.css'
import { useNavigate } from 'react-router-dom'

const SignupModal = ({openModal, setOpenModal}) => {
  const navigate = useNavigate('');
  return (
    <div className='signup-modal'>
        <div className="check-signup-container">
            <h2>회원가입이<br/>완료되었습니다!</h2>
            <button className='tohome-btn' onClick={() => navigate('/login')}>로그인하러 가기</button>
        </div>
    </div>
  )
}

export default SignupModal