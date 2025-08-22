import React from 'react'
import './LectureDetail.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import lectureDetail from '../../utils/lectureDetail'
import { formatKoreanDate } from '../../utils/dateFormat'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

// const LectureDetail = () => {
//     const [lectureData, setLectureData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const { lectureId } = useParams();
//     const [registState, setRegistState] = useState(null);

//     const fetchData = async () => {
//         try {
//           const response = await fetch(
//             `${import.meta.env.VITE_API_URL}/classes/${lectureId}`,
//             {
//               method: "GET",
//               headers: {
//                 "Content-type": "application/json",
//                 Authorization: `Bearer ${window.localStorage.getItem(
//                   "accessToken"
//                 )}`,
//               },
//             }
//           );
    
//           if (!response.ok) {
//             throw new Error("something went wrong");
//           }
//           const data = await response.json();
//           setLectureData(data);
//         } catch (error) {
//           console.error("Error fetching article data:", error);
//         } finally {
//           setIsLoading(false);
//         }
//       };

//     useEffect(() => {
//         fetchData();
//     }, [lectureId]);
    
//     useEffect(() => {
//         if (lectureData?.status) {
//           setRegistState(lectureData.status);
//         }
//       }, [lectureData]);
    
//     if (isLoading) {
//         return <div>loading...</div>;
//     }

//     return (
//       <div className='lecture-detail'>
//           <Header title={"수업"}/>
//               <div className="lecture-detail-full">
//                   <img src={lectureData?.image_url} alt="" className='lecture-detail-img'/>
//                   <div className = {(registState==='open')?"lecture-status" : "lecture-status close"}>
//                       {(registState==='open')?"모집 중" : "마감"}
//                   </div>
//                   <h1>{lectureData?.title}</h1>
//                   <ul className='lecture-table'>
//                       <li>
//                           <span>강사&nbsp; </span>{lectureData?.host_id}
//                       </li>
//                       <li>
//                           <span>수업일&nbsp; </span>{formatKoreanDate(lectureData?.schedule)}
//                       </li>
//                       <li>
//                           <span>강의 한 줄 설명 </span><br/>{lectureData?.description}
//                       </li>
//                       <li>
//                           <span>강의 시간표 </span><br/>
//                           <ul className='lecture-timetable'>
//                               {lectureData?.time_table.map((time, idx) => (
//                                   <li key={idx}>{time}</li>
//                               ))}
//                           </ul>
//                       </li>
//                   </ul>
//               {(registState==='open')?
//               <div className="lecture-regist">
//                   <button onClick={() => {setRegistState('closed')}}>수강신청하기</button>
//               </div>:
//               <div className="lecture-regist closed">
//                   <button>마감된 수업입니다</button>
//               </div>
//               }
//           </div>
//           <Navbar/>
//       </div>
//     )
//   }
  
//   export default LectureDetail



const LectureDetail = () => {
  const dum_lecture = lectureDetail[0];
  const [registState, setRegistState] = useState(`${dum_lecture.status}`);
  return (
    <div className='lecture-detail'>
        <Header title={"수업"}/>
            <div className="lecture-detail-full">
                <img src={dum_lecture.image_url} alt="" className='lecture-detail-img'/>
                <div className = {(registState==='open')?"lecture-status" : "lecture-status close"}>
                    {(registState==='open')?"모집 중" : "마감"}
                </div>
                <h1>{dum_lecture.title}</h1>
                <ul className='lecture-table'>
                    <li>
                        <span>강사&nbsp; </span>{dum_lecture.host_id}
                    </li>
                    <li>
                        <span>수업일&nbsp; </span>{formatKoreanDate(dum_lecture.schedule)}
                    </li>
                    <li>
                        <span>강의 한 줄 설명 </span><br/>{dum_lecture.description}
                    </li>
                    <li>
                        <span>강의 시간표 </span><br/>
                        <ul className='lecture-timetable'>
                            {dum_lecture.time_table.map((time, idx) => (
                                <li key={idx}>{time}</li>
                            ))}
                        </ul>
                    </li>
                </ul>
            {(registState==='open')?
            <div className="lecture-regist">
                <button onClick={() => {setRegistState('closed')}}>수강신청하기</button>
            </div>:
            <div className="lecture-regist closed">
                <button>마감된 수업입니다</button>
            </div>
            }
        </div>
        <Navbar/>
    </div>
  )
}

export default LectureDetail

// {
//     "success": true,
//   "code": "S200",
//   "message": "class 글 상세보기 성공 ",
//   "image_url": "https://cdn.example.com/banner1.png",
//   "title": "스마트폰 기초 배우기",
//   "schedule": "2025-09-12T14:00:00",
//   "host_id": 12,
//   "status": "open",
//   "description": "스마트폰 기본 설정에 대한 수업입니다",
//   "time_table": ["14:00 - 14:30 갤러리 기본 작동 방법",
//                                  "14:30 - 15:00 자르기 색감 조정 그리기"],
//     "created_at": "2025-08-10T09:32:10"
//     }	