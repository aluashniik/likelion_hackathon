import React from 'react'
import './MyRequestEdit.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { useState } from 'react'

const MyRequestEdit = () => {
    
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [reqTime, setReqTime] = useState("");
  const [deviceSelect, setDeviceSelect] = useState(null);
  const devices = ["스마트폰", "텔레비전", "키오스크"];

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
                <form action="">
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
                        <input type="file" accept='image/*' placeholder='사진 첨부하기' />
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