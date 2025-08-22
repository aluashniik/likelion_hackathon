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
import FullLecture from './pages/Lecture/FullLecture'
import LectureDetail from './pages/LectureDetail/LectureDetail'
import MyRequestProgress from './pages/MyRequest/MyRequestProgress'
import MyRequestEdit from './pages/MyRequest/MyRequestEdit'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import SignUpForm from './pages/SignUp/SignUpForm'
import MyRequestJunior from './pages/MyRequest/MyRequestJunior'
import FinishSignup from './pages/SignUp/FinishSignup'

const App = () => {
  // 스크린 사이즈 세팅
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/junior' element={<MyRequestJunior/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signup/form' element={<SignUpForm/>}/>
        <Route path='/signup/form/login' element={<FinishSignup/>}/>
        <Route path='/lecture' element={<Lecture/>}/>
        <Route path='/lecture/full' element={<FullLecture/>}/>
        {/* <Route path='/lecture/:lectureId' element={<LectureDetail/>}/> */}
        <Route path='/lecture/detail' element={<LectureDetail/>}/>
        <Route path='/myrequest' element={<MyRequest/>}/>
        {/* <Route path='/myrequest/:requestId' element={<MyRequestDetail/>}/> */}
        <Route path='/myrequest/progress' element={<MyRequestProgress/>}/>
        <Route path='/myrequest/progress/edit' element={<MyRequestEdit/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path='/request/chat' element={<Chat/>}/>
        <Route path='/request/chatcomplete' element={<ChatComplete/>}/>
        <Route path='/request/chatconfirm' element={<ChatConfirm/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App