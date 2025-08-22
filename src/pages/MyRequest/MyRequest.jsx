import React from 'react'
import './MyRequest.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import dum_request from '../../utils/dumRequest'
import MyRequestStatus from '../../components/MyRequest/MyRequestStatus'
import MyRequestBlock from '../../components/MyRequest/MyRequestBlock'


const MyRequest = () => {
  // const navigate = useNavigate();

  const myrequests = dum_request[0].data.active;

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
            {myrequests.map((req) => (
              <MyRequestBlock key={req.request_id} {...req} requestId={req.request_id} />
            ))}
          </div>
        </div>
      </div>
      <Navbar/>
    </div>
  )

}


export default MyRequest
// <div className="myrequest-content none">
//         {/* 요청 X 상태 */}
//         <h2>현재 요청한 도움이 없어요!</h2>
//         {/* 일단은 홈으로 이동하게 해둠 -> 채팅으로 이동? */}
//         <button className='no-request' onClick={()=>navigate('/')}>도움을 요청하려면 여기를 누르세요!</button>
//       </div>