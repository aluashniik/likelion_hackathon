import React from 'react'
import './MyRequestEdit.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const MyRequestEdit = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [reqTime, setReqTime] = useState("");
  const [photo, setPhoto] = useState(null)
  const [deviceSelect, setDeviceSelect] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const devices = ["스마트폰", "텔레비전", "키오스크"];

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
            // headers: { "Accept": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch request details.");
        }
        const data = await response.json();
        const request = data.data;

        // 폼 상태에 기존 데이터 채우기
        // setTitle(request.title);
        // setContent(request.description);
        // setLocation(request.location);
        setTitle(request.title || "");
        setContent(request.description || "");
        setLocation(request.location || "");
        setDeviceSelect(request.category || "");
        // 'datetime-local' 형식에 맞게 변환 (API 응답 형식에 따라 다를 수 있음)
        if (request.requestTime) {
            const local = new Date(request.requestTime);
            const offset = local.getTimezoneOffset();
            const localISOTime = new Date(local.getTime() - offset * 60000)
              .toISOString()
              .slice(0, 16);
            setReqTime(localISOTime);
          }        
        // deviceSelect는 API 응답에 해당 필드가 있다면 설정
        // setDeviceSelect(request.device); // 예시: API 응답에 device 필드가 있을 경우

      } catch (error) {
        console.error("Error fetching request details for edit:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRequestDetails();
  }, [requestId]); // requestId가 변경될 때마다 데이터를 다시 불러옴


  // 2. 변경사항 저장 API 호출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !location || !reqTime) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/request/${requestId}`,
        {
          method: "PATCH",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            title: title,
            description: content, // API 요청 바디에 'description' 필드가 있다고 가정
            location: location,
            requestTime: reqTime,
            // device: deviceSelect, // API 요청 바디에 'device' 필드가 있다면 추가
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save changes.");
      }

      alert("변경사항이 성공적으로 저장되었습니다!");
      navigate(`/myrequest/progress/${requestId}`); // 상세 조회 페이지로 돌아가기
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("변경사항 저장에 실패했습니다. 다시 시도해 주세요.");
    }
  };


  if (isLoading) {
    return (
        <div className='myrequest-edit'>
            <Header title={'요청'}/>
                <div className="myrequest-edit-container">
                    <h1>요청글 불러오는 중..</h1>
                </div>
            <Navbar/>
        </div>
    )
  }

  return (
    <div className='myrequest-edit'>
        <Header title={'요청'}/>
            <div className="myrequest-edit-container">
                <h1>요청글 수정하기</h1>
                <div className="myrequest-edit-device">
                    <h3>도움요청 기기</h3>
                    <div className="myrequest-select-device">
                        {devices.map((device) => (
                            <button
                                key={device}
                                className={`myrequest-device-btn ${deviceSelect === device ? "selected" : ""}`}
                                onClick={()=>setDeviceSelect(device)}>{device}</button>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="myrequest-edit-title">
                        <h3>요청 제목</h3>
                        <input type="text" value={title} placeholder='제목 입력' onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="myrequest-edit-content">
                        <h3>요청 내용</h3>
                        <input type="text" value={content} placeholder='상세내용 입력' onChange={(e) => setContent(e.target.value)}/>
                    </div>
                    <div className="myrequest-edit-location">
                        <h3>요청 위치</h3>
                        <input type="text" value={location} placeholder='위치 입력' onChange={(e) => setLocation(e.target.value)}/>
                    </div>
                    <div className="myrequest-edit-time">
                        <h3>요청 일시</h3>
                        <input type="datetime-local" value={reqTime} placeholder='일시 입력' onChange={(e) => setReqTime(e.target.value)}/>
                    </div>
                    <div className="myrequest-edit-photo">
                        <h3>사진 첨부</h3>
                        <input type="file" accept='image/*' value={photo} placeholder='사진 첨부하기' onChange={(e) => setPhoto(e.target.value)}/>
                    </div>
                    <p>청년이 요청을 수락하면 수정 및 취소가 어려워요!<br/>마지막으로 한 번 더 내용을 확인해주세요!</p>
                    <div className="myrequest-edit-finish">
                        <button>변경사항 저장하기!</button>
                    </div>
                    
                </form>
                
            </div>
        <Navbar/>
    </div>
  )
}

export default MyRequestEdit