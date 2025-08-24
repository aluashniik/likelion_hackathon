import React from 'react'
import './LectureItem.css'
import { formatKoreanDate } from '../../utils/dateFormat.js'
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'

const LectureItem = ({lectureId, title, schedule, host_id, status}) => {
    // const navigate = useNavigate();
    // const handleClick = () => {
    //     navigate(`/post/${postId}`);
    // }

    const navigate = useNavigate();
  
    const handleClick = () => {
        navigate(`/lecture/${lectureId}`);
        // navigate(`/lecture/detail`);
    }
    
    return (
        <div className='lecture-wrapper' onClick={handleClick}>
            <div className="lecture-main">
                <div className="lecture-title">{title}</div>
                <div className = {(status==='open')?"lecture-status" : "lecture-status close"}>
                    {(status==='open')?"모집 중" : "마감"}
                </div>
            </div>
            <div className="lecture-info">
                <div className="lecture-host">{host_id}</div>
                <span> | </span>
                <div className="lecture-schedule">{formatKoreanDate(schedule)}</div>
            </div>
        </div>
  )
}

export default LectureItem

    //   const navigate = useNavigate();
    
    //   const handleClick = () => {
    //     navigate(`/post/${postId}`);
    //   };
    
    //   return (
    //     <ListItemWrapper onClick={handleClick}>
    //       <ListItemTitle>{title}</ListItemTitle>
    //       <div className="info">
    //         <ListItemAuthor>{author}</ListItemAuthor>
    //         <span>·</span>
    //         <ListItemDate>{formatKoreanDate(createdAt)}</ListItemDate>
    //       </div>
    //       <div className="info">
    //         <ion-icon name="heart-outline" />
    //         <span>{totalLike}</span>
    //         <span>·</span>
    //         <ion-icon name="chatbubble-outline" />
    //         <span>{totalComments}</span>
    //       </div>
    //     </ListItemWrapper>
    //   );
    // }


// 이름 모집중
// 호스트 이름 // 날짜
// lectureId, title, schedule, host_id, status
// "title": "스마트폰 기초 배우기",
// "schedule": "2025-09-12T14:00:00",
// "host_id": 12,
// "status": "open",
// "description"

// "id": 101,
// "title": "스마트폰 기초 배우기",
// "schedule": "2025-09-12T14:00:00",
// "host_id": 12,
// "status": "open",
// "description": "스마트폰 기본 설정에 대해서 배웁니다."

// export default function ListItem({
//   postId,
//   title,
//   author,
//   createdAt,
//   totalComments,
//   totalLike,
// }) {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/post/${postId}`);
//   };

//   return (
//     <ListItemWrapper onClick={handleClick}>
//       <ListItemTitle>{title}</ListItemTitle>
//       <div className="info">
//         <ListItemAuthor>{author}</ListItemAuthor>
//         <span>·</span>
//         <ListItemDate>{formatKoreanDate(createdAt)}</ListItemDate>
//       </div>
//       <div className="info">
//         <ion-icon name="heart-outline" />
//         <span>{totalLike}</span>
//         <span>·</span>
//         <ion-icon name="chatbubble-outline" />
//         <span>{totalComments}</span>
//       </div>
//     </ListItemWrapper>
//   );
// }