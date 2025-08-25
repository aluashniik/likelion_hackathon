import React from 'react'
import Home from './pages/Home/Home'
import MyRequest from './pages/MyRequest/MyRequest'
import Lecture from './pages/Lecture/Lecture'
import MyPage from './pages/MyPage/MyPage'
import Chat from './pages/Request/Chat'
import ChatComplete from './pages/Request/ChatComplete'
import ChatConfirm from './pages/Request/ChatConfirm'
import HelpRequests from './pages/HelpRequests/HelpRequests'
import HelpRequestsDetails from './pages/HelpRequests/HelpRequestsDetails'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import SeniorHelpList from './pages/MyPage/SeniorHelpList'
import ContactAdmin from './pages/MyPage/ContactAdmin'
import JuniorAcceptList from './pages/MyPage/JuniorAcceptList'

import  ClassOpenedList  from './pages/MyPage/ClassOpenedList'
import ClassAppliedList from './pages/MyPage/ClassAppliedList'

import  MyReviews  from './pages/MyPage/MyReviews'
import SeniorHelpDetail from './pages/MyPage/SeniorHelpDetail'
import EditProfile from './pages/MyPage/EditProfile'
import MyReviewsDetail  from './pages/MyPage/MyReviewsDetail'
import JuniorAcceptDetail from './pages/MyPage/JuniorAcceptDetail'
import FullLecture from './pages/Lecture/FullLecture'
import LectureDetail from './pages/LectureDetail/LectureDetail'
import MyRequestProgress from './pages/MyRequest/MyRequestProgress'
import MyRequestEdit from './pages/MyRequest/MyRequestEdit'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import SignUpForm from './pages/SignUp/SignUpForm'
import MyRequestJunior from './pages/MyRequest/MyRequestJunior'
import FinishSignup from './pages/SignUp/FinishSignup'
import LoginGuard from './components/LoginGuard'
import MyRequestJuniorDetail from './pages/MyRequest/MyRequestJuniorDetail'

const App = () => {
  // 스크린 사이즈 세팅
  function setScreenSize() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}

  const ProtectedHome = LoginGuard(Home);
  const ProtectedLecture = LoginGuard(Lecture);
  const ProtecetedMyRequest = LoginGuard(MyRequest);
  const ProtectedMyPage = LoginGuard(MyPage);

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


  //console.log('fdd');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedHome/>}/>
        {/* <Route path='/' element={<Home/>}/> */}
        <Route path='/junior' element={<MyRequestJunior/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signup/form' element={<SignUpForm/>}/>
        <Route path='/signup/form/login' element={<FinishSignup/>}/>
        <Route path='/lecture' element={<ProtectedLecture/>}/>
        {/* <Route path='/lecture' element={<Lecture/>}/> */}
        <Route path='/lecture/full' element={<FullLecture/>}/>
        <Route path='/lecture/:lectureId' element={<LectureDetail/>}/>
        {/* <Route path='/lecture/detail' element={<LectureDetail/>}/> */}

        <Route path='/myrequest' element={<MyRequest/>}/>
        {/* <Route path='/myrequest' element={<ProtecetedMyRequest/>}/> */}
        {/* <Route path='/myrequest/requestId' element={<MyRequestDetail/>}/> */}
        <Route path='/myrequest/progress' element={<MyRequestProgress/>}/>

        {/* <Route path='/myrequest' element={<MyRequest/>}/> */}
        <Route path='/myrequest' element={<ProtecetedMyRequest/>}/>
        <Route path='/myrequest/:requestId' element={<MyRequestJuniorDetail/>}/>
        {/* <Route path='/myrequest/progress' element={<MyRequestProgress/>}/> */}

        <Route path='/myrequest/progress/edit' element={<MyRequestEdit/>}/>
        <Route path='/mypage' element={<ProtectedMyPage/>}/>
        {/* <Route path='/mypage' element={<MyPage/>}/> */}
        <Route path='/request/chat' element={<Chat/>}/>
        <Route path='/request/chatcomplete' element={<ChatComplete/>}/>
        <Route path='/request/chatconfirm' element={<ChatConfirm/>}/>
        
        {/* **************************** */}
        <Route path="/list" element={<HelpRequests/>}/>
        <Route path="/list/details" element={<HelpRequestsDetails/>}/>

        <Route path="/mypage/help-requests" element={<SeniorHelpList/>}/>
        <Route path="/mypage/help-requests/:id" element={<SeniorHelpDetail/>}/>

        <Route path="/mypage/accepted-requests" element={<JuniorAcceptList/>}/>
        <Route path="/mypage/accepted-requests/:id" element={<JuniorAcceptDetail/>}/>

        <Route path="/mypage/class-opened" element={<ClassOpenedList/>} />
        <Route path="/mypage/class-applied" element={<ClassAppliedList/>} /> 

        <Route path= "/mypage/reviews" element={<MyReviews/>}/>
        <Route path= "/mypage/reviews/:id" element={<MyReviewsDetail/>}/>
       
        <Route path="/mypage/contact" element={<ContactAdmin/>}/>

        <Route path="/mypage/edit" element={<EditProfile/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App