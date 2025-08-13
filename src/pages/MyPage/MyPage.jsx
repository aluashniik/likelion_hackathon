import React from 'react'
import './MyPage.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'

const MyPage = () => {
  return (
    <div className='mypage'>
      <Header title={"내 정보"}/>
      <Navbar/>
    </div>
  )
}

export default MyPage