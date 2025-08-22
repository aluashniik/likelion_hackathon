import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'

const Home = () => {
    // console.log('home렌더링')
  return (
    <div className='home'>
        <Header/>
        <Navbar/>
    </div>
  )
}

export default Home