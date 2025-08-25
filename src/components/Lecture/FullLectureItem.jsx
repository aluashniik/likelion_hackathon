import React from 'react'
import './FullLectureItem.css'
import { formatKoreanDate } from '../../utils/dateFormat'
import { useNavigate } from 'react-router-dom'


// "id": 101,
// "title": "스마트폰 기초 배우기",
// "schedule": "2025-09-12T14:00:00",
// "host_id": 12,
// "status": "open",
// "description": "스마트폰 기본 설정에 대해서 배웁니다."

const FullLectureItem = ({lectureId, title, schedule, host_name, status, description}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lecture/${lectureId}`);
    // navigate(`/lecture/detail`);
  }

  return (
    <div className='full-lecture-wrapper' onClick={handleClick}>
        <div className="full-lecture-main">
            <div className="full-lecture-title">{title}</div>
            <div className = {(status==='OPEN')?"full-lecture-status" : "full-lecture-status close"}>
                    {(status==='OPEN')?"모집 중" : "마감"}
            </div>
        </div>
        <div className="full-lecture-info">
            <ul>
                <li><span>강사 </span> {host_name}</li>
                <li><span>수업일 </span> {formatKoreanDate(schedule)}</li>
            </ul>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default FullLectureItem