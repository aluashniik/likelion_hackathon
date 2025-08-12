import React from 'react'
import Home from './pages/Home/Home'
import MyRequest from './pages/MyRequest/MyRequest'
import Lecture from './pages/Lecture/Lecture'
import MyPage from './pages/MyPage/MyPage'
import Chat from './pages/Request/Chat'
import ChatComplete from './pages/Request/ChatComplete'
import ChatConfirm from './pages/Request/ChatConfirm'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'


const App = () => {

  function setScreenSize() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}

	useEffect(() => {
		setScreenSize();

		const handleResize = () => {
			setScreenSize();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

  console.log('fdd');
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/lecture' element={<Lecture/>}/>
        <Route path='/myrequest' element={<MyRequest/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path='/request/chat' element={<Chat/>}/>
        <Route path='/request/chatcomplete' element={<ChatComplete/>}/>
        <Route path='/request/chatconfirm' element={<ChatConfirm/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App