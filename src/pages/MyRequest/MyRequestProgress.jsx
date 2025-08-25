import React from 'react'
import './MyRequestProgress.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import MyRequestStatus from '../../components/MyRequest/MyRequestStatus'
import { useState } from 'react'
import junior_img from '../../assets/junior_profile.png'
import star_org from '../../assets/star_org.png'
import star_gray from '../../assets/star_gray.png'
import { useNavigate, useParams } from 'react-router-dom'
import CancelModal from '../../components/CancelModal/CancelModal'
import { useEffect } from 'react'
import { formatKoreanDate } from '../../utils/dateFormat'

const MyRequestProgress = () => {
  const { requestId } = useParams();

  // const [progressState, setProgressState] = useState(null);
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [requestDetails, setRequestDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState(null);
  const [matchId, setMatchId] = useState(null);
  const [targetId, setTargetId] = useState(null);

  useEffect(() => {
    if (!requestId) {
        setIsLoading(false);
        return;
    }

    async function fetchRequestDetails() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/request/${requestId}`,
          {
            method: "GET",
            credentials: 'include',
            headers: {
              "Accept": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch request details.");
        }
        const data = await response.json();
        setRequestDetails(data.data); // API 응답의 data 필드 저장
      } catch (error) {
        console.error("Error fetching request details:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRequestDetails();
  }, [requestId]); // requestId가 변경될 때마다 API 호출

  //////////////////////////////////////////////////
  //도움 시작 버튼시 상태 변경
  const handleStartHelp = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/request/${requestId}/start`,
        {
          method: "PATCH",
          credentials: 'include',
          headers: {
            // "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        }
      );

      if (!response.ok) {
        throw new Error("도움 시작 요청 실패");
      }

      // 서버로부터 받은 응답 데이터
      // const result = await response.json(); 

      setRequestDetails(prevDetails => ({
        ...prevDetails,
        status: "in_progress"
      }));

      alert("도움이 시작되었습니다.");

    } catch (error) {
      console.error("도움 시작 중 오류 발생:", error);
      alert("도움 시작에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 도움 완료 버튼 클릭 핸들러
  const handleCompleteHelp = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/request/${requestId}/complete`,
        {
          method: "PATCH",
          credentials: 'include',
          headers: {
            // "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
            "Accept": "application/json"
          },
        }
      );

      if (!response.ok) {
        throw new Error("도움 완료 요청 실패");
      }

      const result = await response.json(); 
      
      setRequestDetails(prevDetails => ({
        ...prevDetails,
        status: "completed_unreviewed"
      }));

      setMatchId(result.data.matchId);
      setTargetId(result.data.reviewPrompt.targetUserId);

      alert("도움이 완료되었습니다.");
      navigate(`/myrequest/progress/${requestId}`);

    } catch (error) {
      console.error("도움 완료 중 오류 발생:", error);
      alert("도움 완료에 실패했습니다. 다시 시도해 주세요.");
    }
  };
  
  // 별점 설정 함수
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    console.log('Selected Rating:', rating);
  };

  //리뷰 작성 함수
  const handleReviewSubmit = async () => {
    if (!selectedRating) {
      alert("별점을 선택해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews`,
        {
          method: "POST",
          credentials: 'include',
          headers: {
            // "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            match_id: matchId,
            target_id: targetId,
            rating: selectedRating,
            content: review,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("리뷰 등록 실패");
      }

      alert("리뷰가 성공적으로 등록되었습니다.");
      navigate("/myrequest"); //요청 화면으로 이동

    } catch (error) {
      console.error("리뷰 작성 중 오류 발생:", error);
      alert("리뷰 등록에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  //도움 취소 함수
  const handleCancelRequest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/request/${requestId}`,
        {
          method: "DELETE",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save changes.");
      }

      alert("요청이 삭제되었습니다!");
      navigate('/myrequest'); // 상세 조회 페이지로 돌아가기
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("요청 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };



  if (isLoading) {
    return (
      <div className='myrequest-progress'>
        <Header title={'요청'}/>
        <div className="myrequest-progress-content">
          <h2>요청 정보를 불러오는 중...</h2>
        </div>
        <Navbar/>
      </div>
    )
  }

  // 데이터가 없을 경우 에러 처리
  if (!requestDetails) {
    return (
      <div className='myrequest-progress'>
        <Header title={'요청'}/>
        <div className="myrequest-progress-content">
          <h2>요청 정보를 찾을 수 없습니다.</h2>
        </div>
        <Navbar/>
      </div>
    )
  }

  const status = requestDetails.status;

  
  if (status ==='pending'){
    return (
      <div className='myrequest-progress'>
        <Header title={'요청'}/>
        <div className="myrequest-progress-content">
          {openModal?<CancelModal openModal={openModal} setOpenModal={setOpenModal} onConfirm={handleCancelRequest}/>:null}
          <h2>요청 진행상황</h2>
          <div className="progress-detail">
            <MyRequestStatus status={status}/>
            <p>청년들이 요청을 확인하는 중이에요!</p>
          </div>
          <div className="pending-btn">
            <button className='fix-btn' onClick={()=>navigate(`/myrequest/progress/edit/${requestId}`)}>수정하기</button>
            <button className='cancel-btn' onClick={()=>setOpenModal(true)}>취소하기</button>
          </div>
          <h2>내가 등록한 글</h2>
          <div className="myrequest-article">
            <h3>{requestDetails.title}</h3>
            <ul>
              <li>{requestDetails.seniorInfo?.name || '000 어르신'} </li>
              <li> | </li>
              <li> {requestDetails.location}</li>
              <li> | </li>
              <li> {formatKoreanDate(requestDetails.requestTime)}</li>
            </ul>
            <p>{requestDetails.description}</p>
          </div>
        </div>
        <Navbar/>
      </div>
    )
  } else if(status==='matched'){
    return (
      <div className='myrequest-progress'>
        <Header title={'요청'}/>
        <div className="myrequest-progress-content">
          <h2>요청 진행상황</h2>
          <div className="progress-detail">
            <MyRequestStatus status={status}/>
            <p>청년이 요청을 수락했어요!</p>
          </div>
          <div className="junior-profile">
            <img src={requestDetails.juniorInfo?.profileImageUrl || junior_img} alt="" className='junior-img'/>
            <div className="junior-info">
              <h2>{requestDetails.juniorInfo?.name || '000 청년'}</h2>
              <h3>{requestDetails.juniorInfo?.introduce || '한 줄 소개'}</h3>
              <h3>{requestDetails.juniorInfo?.phoneNumber}</h3>
            </div>
          </div>
          <button className='start-help-btn' onClick={handleStartHelp}>
            <h2>도움받기 시작</h2>
            <h3>청년이 도움을 시작할 때 눌러주세요!</h3>
          </button>
          <h2>내가 등록한 글 확인하기</h2>
          <div className="myrequest-article">
            <h3>{requestDetails.title}</h3>
            <ul>
              <li>{requestDetails.seniorInfo?.name || '000 어르신'}</li>
              <li> | </li>
              <li> {requestDetails.location}</li>
              <li> | </li>
              <li> {formatKoreanDate(requestDetails.requestTime)}</li>
            </ul>
            <p>
            {requestDetails.description.length > 25
              ? requestDetails.description.substring(0, 25) + "..."
              : requestDetails.description}
            </p>
          </div>
        </div>
        <Navbar/>
      </div>
    )
  } else if(status==='in_progress'){
    return (
      <div className='myrequest-progress'>
        <Header title={'요청'}/>
        <div className="myrequest-progress-content">
          <h2>요청 진행상황</h2>
          <div className="progress-detail">
            <MyRequestStatus status={status}/>
            <p>도움을 받는 중이에요!</p>
          </div>
          <div className="junior-profile">
          <img src={requestDetails.juniorInfo?.profileImageUrl || junior_img} alt="" className='junior-img'/>
            <div className="junior-info">
              <h2>{requestDetails.juniorInfo?.name || '000 청년'}</h2>
              <h3>{requestDetails.juniorInfo?.introduce || '한 줄 소개'}</h3>
              <h3>{requestDetails.juniorInfo?.phoneNumber}</h3>
            </div>
          </div>
          <button className='start-help-btn' onClick={handleCompleteHelp}>
            <h2>도움받기 완료</h2>
            <h3>청년이 도움을 완료했을 때 눌러주세요!</h3>
          </button>
          <h2>내가 등록한 글 확인하기</h2>
          <div className="myrequest-article">
            <h3>{requestDetails.title}</h3>
            <ul>
              <li>{requestDetails.seniorInfo?.name || '000 어르신'}</li>
              <li> | </li>
              <li> {requestDetails.location}</li>
              <li> | </li>
              <li> {formatKoreanDate(requestDetails.requestTime)}</li>
            </ul>
            <p>
              {requestDetails.description.length > 25
                ? requestDetails.description.substring(0, 25) + "..."
                : requestDetails.description}
            </p>
          </div>
        </div>
        <Navbar/>
      </div>
    )
  } else if(status==='completed_unreviewed'){
    return (
      <div className='myrequest-progress review'>
        <Header title={'요청'}/>
        <div className="myrequest-progress-content review">
          <h2>도움받기 완료!</h2>
          <div className="junior-review-box">
            <img src={junior_img} alt="" className='junior-img'/>
            <h2>{requestDetails.juniorInfo.name}</h2>
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
          <button className='send-review-btn' onClick={handleReviewSubmit}>후기 작성 완료하기</button>
          <button className='tohome-btn' onClick={() => navigate('/')}>홈 화면으로 돌아가기</button>
        </div>
      </div>
    )
  }
  
}

export default MyRequestProgress