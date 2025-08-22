import React from 'react'
import './MyRequestProgress.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import MyRequestStatus from '../../components/MyRequest/MyRequestStatus'
import { useState } from 'react'
import junior_img from '../../assets/junior_profile.png'
import star_org from '../../assets/star_org.png'
import star_gray from '../../assets/star_gray.png'
import { useNavigate } from 'react-router-dom'
import CancelModal from '../../components/CancelModal/CancelModal'

const MyRequestProgress = () => {
  const [progressState, setProgressState] = useState('accepted');
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  const [openModal, setOpenModel] = useState(false);

  const [selectedRating, setSelectedRating] = useState(null);

  const handleStarHover = (rating) => {
    setSelectedRating(rating);
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    console.log('Selected Rating:', rating);
  };

  
  if (progressState==='pending'){
    return (
      <div className='myrequest-progress'>
        <Header title={'요청'}/>
        <div className="myrequest-progress-content">
          {openModal?<CancelModal openModal={openModal} setOpenModal={setOpenModel}/>:null}
          <h2>요청 진행상황</h2>
          <div className="progress-detail">
            <MyRequestStatus status={'pending'}/>
            <p>청년들이 요청을 확인하는 중이에요!</p>
          </div>
          <div className="pending-btn">
            <button className='fix-btn' onClick={()=>navigate('/myrequest/progress/edit')}>수정하기</button>
            <button className='cancel-btn' onClick={()=>setOpenModel(true)}>취소하기</button>
          </div>
          <h2>내가 등록한 글</h2>
          <div className="myrequest-article">
            <h3>핸드폰 화면 녹화하는 방법을 알려주세요!</h3>
            <ul>
              <li>000 어르신 </li>
              <li> | </li>
              <li> 신수동 1번지</li>
              <li> | </li>
              <li> 2025.08.20 14:20</li>
            </ul>
            <p>제 핸드폰 화면을 녹화해서 손녀에게 보내주려고 합니다. 핸드폰 소리와 제가 말하는 소리가 모두 녹화되었으면 좋곘습니다.</p>
          </div>
        </div>
        <Navbar/>
      </div>
    )
  } else if(progressState==='accepted'){
    return (
      <div className='myrequest-progress'>
        <Header title={'요청'}/>
        <div className="myrequest-progress-content">
          <h2>요청 진행상황</h2>
          <div className="progress-detail">
            <MyRequestStatus status={progressState}/>
            <p>청년이 요청을 수락했어요!</p>
          </div>
          <div className="junior-profile">
            <img src={junior_img} alt="" className='junior-img'/>
            <div className="junior-info">
              <h2>000 청년</h2>
              <h3>한 줄 소개 한 줄 소개</h3>
              <h3>010-1234-5678</h3>
            </div>
          </div>
          <button className='start-help-btn' onClick={()=>setProgressState("in-progress")}>
            <h2>도움받기 시작</h2>
            <h3>청년이 도움을 시작할 때 눌러주세요!</h3>
          </button>
          <h2>내가 등록한 글 확인하기</h2>
          <div className="myrequest-article">
            <h3>핸드폰 화면 녹화하는 방법을 알려주세요!</h3>
            <ul>
              <li>000 어르신 </li>
              <li> | </li>
              <li> 신수동 1번지</li>
              <li> | </li>
              <li> 2025.08.20 14:20</li>
            </ul>
            <p>제 핸드폰 화면을 녹화해서 손녀에게...</p>
          </div>
        </div>
        <Navbar/>
      </div>
    )
  } else if(progressState==='in-progress'){
    return (
      <div className='myrequest-progress'>
        <Header title={'요청'}/>
        <div className="myrequest-progress-content">
          <h2>요청 진행상황</h2>
          <div className="progress-detail">
            <MyRequestStatus status={'in_progress'}/>
            <p>도움을 받는 중이에요!</p>
          </div>
          <div className="junior-profile">
            <img src={junior_img} alt="" className='junior-img'/>
            <div className="junior-info">
              <h2>000 청년</h2>
              <h3>한 줄 소개 한 줄 소개</h3>
              <h3>010-1234-5678</h3>
            </div>
          </div>
          <button className='start-help-btn' onClick={()=>setProgressState("completed_unreviewed")}>
            <h2>도움받기 완료</h2>
            <h3>청년이 도움을 완료했을 때 눌러주세요!</h3>
          </button>
          <h2>내가 등록한 글 확인하기</h2>
          <div className="myrequest-article">
            <h3>핸드폰 화면 녹화하는 방법을 알려주세요!</h3>
            <ul>
              <li>000 어르신 </li>
              <li> | </li>
              <li> 신수동 1번지</li>
              <li> | </li>
              <li> 2025.08.20 14:20</li>
            </ul>
            <p>제 핸드폰 화면을 녹화해서 손녀에게...</p>
          </div>
        </div>
        <Navbar/>
      </div>
    )
  } else if(progressState==='completed_unreviewed'){
    return (
      <div className='myrequest-progress review'>
        <Header title={'요청'}/>
        <div className="myrequest-progress-content review">
          <h2>도움받기 완료!</h2>
          <div className="junior-review-box">
            <img src={junior_img} alt="" className='junior-img'/>
            <h2>000 청년</h2>
          </div>
            <h3>청년의 도움이 어땠는지<br/>별점으로 알려주세요!</h3>
            <div className="star-box">
              {[1, 2, 3, 4, 5].map((rating) => (
              <img key={rating}
                src={rating <= selectedRating ? star_org : star_gray}
                alt={`star-${rating}`}
                className="star-input"
                onClick={() => handleStarClick(rating)}
              />
              ))}
            </div>
          <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder='도움 후기 남기기' className='review-box'/>
          <button className='send-review-btn'>후기 작성 완료하기</button>
          <button className='tohome-btn' onClick={() => navigate('/')}>홈 화면으로 돌아가기</button>
        </div>
      </div>
    )
  }
  
}

export default MyRequestProgress