import React from 'react'
import './MyRequestJunior.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import dum_request from '../../utils/dumRequest'
import MyRequestStatus from '../../components/MyRequest/MyRequestStatus'
import MyRequestJuniorBlock from '../../components/MyRequest/MyRequestJuniorBlock'

const MyRequestJunior = () => {
  const navigate = useNavigate();
  const myrequests = dum_request[0].data.active;

  return(
    <div className='myrequest junior'>
        <Header title={'요청'}/>
        <div className="myrequest-content junior">
            <div className="myrequest-guide junior">
            <h2>내가 수락한 도움</h2>
            </div>
            <div className="myrequest-list junior">
            <div className="myrequest-item junior">
                {myrequests.map((req) => (
                <MyRequestJuniorBlock key={req.request_id} {...req} requestId={req.request_id} />
                ))}
            </div>
            </div>
        </div>
        <Navbar/>
        </div>

  )
}

export default MyRequestJunior;

// <div className="myrequest-content none">
//         {/* 요청 X 상태 */}
//         <h2>현재 수락한 도움이 없어요!</h2>
//         {/* 일단은 홈으로 이동하게 해둠 -> 채팅으로 이동? */}
//         <button className='no-request' onClick={()=>navigate('/')}>도움을 수락하려면 여기를 누르세요!</button>
//       </div>