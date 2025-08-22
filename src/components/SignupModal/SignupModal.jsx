import React from 'react'
import './SignupModal.css'

const SignupModal = ({openModal, setOpenModal}) => {
  return (
    <div className='signup-modal'>
        <div className="check-signup-container">
            <h2>정말 도움을 취소하시겠어요?</h2>
            <h3>한 번 취소된 도움은<br/>되돌리기 어려워요!</h3>
            <button className='real-cancel-btn'>네, 취소할게요</button>
            <button className='no-cancel-btn' onClick={()=>setOpenModal(false)}>아뇨, 취소하지 않을래요</button>
        </div>
    </div>
  )
}

export default SignupModal