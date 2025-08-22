import React from "react";
import LectureItem from "./LectureItem";
import './LectureList.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import FullLectureItem from './FullLectureItem';

const LectureList = ({ lectures }) => {

  const locationNow = useLocation();
  // const navigate = useNavigate();
  
  return (
    <div className="lecture-list">
      <div className="lecture-item">
        {
          lectures.map((lecture) => (
            locationNow.pathname === "/lecture"?
            <LectureItem key={lecture.id} {...lecture} lectureId={lecture.id} />:
            <FullLectureItem key={lecture.id} {...lecture} lectureId={lecture.id} />
        ))}
      </div>
    </div>
  )
}

export default LectureList

// 이름 모집중
// 호스트 이름 // 날짜

// "id": 101,
// "title": "스마트폰 기초 배우기",
// "schedule": "2025-09-12T14:00:00",
// "host_id": 12,
// "status": "open",
// "description": "스마트폰 기본 설정에 대해서 배웁니다."


// export default function ListSection({ posts }) {
//   return (
//     <ListSectionWrapper>
//       <List>
        
//       </List>
//     </ListSectionWrapper>
//   );
// }

// const ListSectionWrapper = styled.section`
//   width: 100%;
//   max-width: 74.4rem;
//   display: flex;
//   flex-direction: column;
//   gap: 0.4rem;
// `;

// const List = styled.ul`
//   > li {
//     border-bottom: 1px solid var(--line-secondary);
//   }
// `;

