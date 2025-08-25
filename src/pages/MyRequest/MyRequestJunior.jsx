import React from 'react'
import './MyRequestJunior.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import MyRequestBlockJunior from '../../components/MyRequest/MyRequestBlockJunior'

const MyRequestJunior = ({myrequests}) => {
  const navigate = useNavigate();

  if (myrequests.state === "none"){
    return (
      <div className="myrequest">
        <Header title={"요청"}/>
        <div className="myrequest-content none">
          <h2>현재 수락한 도움이 없어요!</h2>
          <button className='no-request' onClick={()=>navigate('/list')}>도움을 수락하려면 여기를 누르세요!</button>
        </div>
        <Navbar />
      </div>
    )
  }else{
    return (
      <div className='myrequest'>
        <Header title={'요청'}/>
        <div className="myrequest-content">
          <div className="myrequest-guide">
            <h2>요청 진행상황</h2>
            <h3>나의 요청글을 눌러서</h3>
            <h3>각각의 요청 진행상황을 확인해보세요!</h3>
          </div>
          <div className="myrequest-list">
            <div className="myrequest-item">
              {myrequests.acceptedRequests.map((req) => (
                <MyRequestBlockJunior key={req.requestId} {...req} requestId={req.requestId} />
              ))}
            </div>
          </div>
        </div>
        <Navbar/>
      </div>
    )
  }
}

export default MyRequestJunior;