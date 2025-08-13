import React from 'react'
import './Lecture.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import lecture1_img from '../../assets/lecture1.png'

const Lecture = () => {
  return (
    <div className='lecture'>
      <Header title={"수업"}/>
      <div className="lecture-content">
        <div className="lecture-banner">
          <img src={lecture1_img} alt="" />
        </div>
        
      </div>
      <Navbar/>
    </div>
  )
}

export default Lecture