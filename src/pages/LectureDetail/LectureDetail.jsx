import React from 'react'
import './LectureDetail.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import lectureDetail from '../../utils/lectureDetail'
import { formatKoreanDate } from '../../utils/dateFormat'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const LectureDetail = () => {
    const [lectureData, setLectureData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { lectureId } = useParams();
    const [registState, setRegistState] = useState(null);

    //수업 상세정보
    const fetchLectureData = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/classes/${lectureId}`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem(
                  "accessToken"
                )}`,
              },
            }
          );
    
          if (!response.ok) {
            throw new Error("something went wrong");
          }
          const data = await response.json();
          setLectureData(data);
          return data;
        } catch (error) {
          console.error("Error fetching article data:", error);
        }
      };

      // 내 수강목록 확인 - 이미 있으면 버튼 비활성화
      const fetchMyClasses = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/mypage/class`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
              },
            }
          );
    
          if (!response.ok) {
            throw new Error("something went wrong");
          }
          const data = await response.json();
          
        //   if (data.class_list.some(
        //     (lects) => String(lects.id) === String(lectureId)
        //   )) {
        //     setRegistState("applied")
        //   }
          return data?.class_list?.some(
            (lects) => String(lects.id) === String(lectureId)
          );
        } catch (error) {
          console.error("Error fetching my classes:", error);
          return false;
        }
      };

      useEffect(() => {
        const loadData = async () => {
          setIsLoading(true);
          const [lecture, isApplied] = await Promise.all([
            fetchLectureData(),
            fetchMyClasses(),
          ]);
    
          if (!lecture) {
            setRegistState(null);
            setIsLoading(false);
            return;
          }

          if (isApplied) {
            setRegistState('applied');
          } else {
            setRegistState(`${lecture.status}`);
          }
          setIsLoading(false);
        };
    
        loadData();

    }, [lectureId]);

    
    const handleRegister = async () => {
        try{
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/classes/${lectureId}/participants`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("something went wrong");
            }
            const data = await response.json();
            if (data.success) {
                setRegistState("applied");
            }
        } catch (error){
            console.error("Error :", error)
        }
    };

    if (isLoading) {
        return <div>loading...</div>;
    }

    return (
      <div className='lecture-detail'>
          <Header title={"수업"}/>
              <div className="lecture-detail-full">
                  <img src={lectureData?.image_url} alt="" className='lecture-detail-img'/>
                  <div className = {(registState==='open')?"lecture-status" : "lecture-status close"}>
                      {(registState==='open')?"모집 중" : "마감"}
                  </div>
                  <h1>{lectureData?.title}</h1>
                  <ul className='lecture-table'>
                      <li>
                          <span>강사&nbsp; </span>{lectureData?.host_id}
                      </li>
                      <li>
                          <span>수업일&nbsp; </span>{formatKoreanDate(lectureData?.schedule)}
                      </li>
                      <li>
                          <span>강의 한 줄 설명 </span><br/>{lectureData?.description}
                      </li>
                      <li>
                          <span>강의 시간표 </span><br/>
                          <ul className='lecture-timetable'>
                              {lectureData?.time_table.map((time, idx) => (
                                  <li key={idx}>{time}</li>
                              ))}
                          </ul>
                      </li>
                  </ul>
                  
                  {registState === 'open' && (<div className="lecture-regist">
                  <button onClick={handleRegister}>수강신청하기</button>
                  </div>
                  )}
                  {registState === 'applied' && (
                  <div className="lecture-regist closed">
                  <button disabled>신청 완료</button>
                  </div>
                  )}
                {registState === 'closed' && (
                <div className="lecture-regist closed">
                    <button disabled>마감된 수업입니다</button>
                </div>
                )}
          </div>
          <Navbar/>
      </div>
    )
  }
  
  export default LectureDetail



  

// ////////////////////////////////////////////////////////////

// const LectureDetail = () => {
//   const dum_lecture = lectureDetail[0];
//   const [registState, setRegistState] = useState(`${dum_lecture.status}`);
//   return (
//     <div className='lecture-detail'>
//         <Header title={"수업"}/>
//             <div className="lecture-detail-full">
//                 <img src={dum_lecture.image_url} alt="" className='lecture-detail-img'/>
//                 <div className = {(registState==='open')?"lecture-status" : "lecture-status close"}>
//                     {(registState==='open')?"모집 중" : "마감"}
//                 </div>
//                 <h1>{dum_lecture.title}</h1>
//                 <ul className='lecture-table'>
//                     <li>
//                         <span>강사&nbsp; </span>{dum_lecture.host_id}
//                     </li>
//                     <li>
//                         <span>수업일&nbsp; </span>{formatKoreanDate(dum_lecture.schedule)}
//                     </li>
//                     <li>
//                         <span>강의 한 줄 설명 </span><br/>{dum_lecture.description}
//                     </li>
//                     <li>
//                         <span>강의 시간표 </span><br/>
//                         <ul className='lecture-timetable'>
//                             {dum_lecture.time_table.map((time, idx) => (
//                                 <li key={idx}>{time}</li>
//                             ))}
//                         </ul>
//                     </li>
//                 </ul>
//             {(registState==='open')?
//             <div className="lecture-regist">
//                 <button onClick={() => {setRegistState('closed')}}>수강신청하기</button>
//             </div>:
//             <div className="lecture-regist closed">
//                 <button>마감된 수업입니다</button>
//             </div>
//             }
//         </div>
//         <Navbar/>
//     </div>
//   )
// }

// export default LectureDetail