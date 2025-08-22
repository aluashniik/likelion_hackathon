import React from 'react'
import './MyRequestJuniorBlock.css'
import MyRequestStatus from './MyRequestStatus'
import { formatKoreanDate } from '../../utils/dateFormat'
import { useNavigate } from 'react-router-dom'

const MyRequestJuniorBlock = ({requestId, title, location, request_time, status}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        // navigate(`/myrequest/:${requestId}`)
        // navigate('/myrequest/progress')
    }
        return (
            <div className="myrequest-block junior" onClick={()=>{handleClick()}}>
                <MyRequestStatus status={status}/>
                <div className="myrequest-title junior">{title}</div>
                <div className="myrequest-junior">
                    <ul>
                        <li><span>장소&nbsp; </span> {location}</li>
                        <li><span>일정&nbsp; </span> {formatKoreanDate(request_time)}</li>
                    </ul>
                </div>
                <div className="senior-profile">
                    {/* <img src={junior_img} alt="" className='junior-img'/> */}
                    <div className="senior-info">
                        <h2>000 어르신</h2>
                        <h3>010-1234-5678</h3>
                    </div>
                </div>
            </div>
        )
    
}

export default MyRequestJuniorBlock



// const dum_request = [
//     {
//         "is_success": true,
//         "code": "S200",
//         "message": "요청 상태 조회 성공",
//         "data": {
//         "role": "senior",
//         "state": "accepted",
//         "active": [
//             {
//                 "request_id": 9876,
//                 "title": "핸드폰 화면 녹화 방법 알려주세요!",
//                 "location": "신수동 1번지",
//                 "request_time": "2025-08-07T15:00:00+09:00",
//                 "status": "accepted"
//             },
//             {
//                 "request_id": 8685,
//                 "title": "무언가를 알려주세요!",
//                 "location": "신수동 4번지",
//                 "request_time": "2025-08-08T15:00:00+09:00",
//                 "status": "pending"
//             }
//         ],
//         "actions": {},   // 수락된 요청 → 수정·삭제 버튼 없음
//         "mine_preview": {
//             "items": [
//             { "request_id": 9876, "title": "핸드폰 화면 녹화 방법 알려주세요!", "route": "/help-requests/9876" }
//             ],
//             "total": 17 // 내가 작성한 요청글들 총 개수
//         }
//         }
//     }
// ]

// export default dum_request;