import React from 'react'
import './MyRequest.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'

const MyRequest = () => {
  return (
    <div className='myrequest'>
      <Header title={'요청'}/>
      <Navbar/>
    </div>
  )
}

export default MyRequest