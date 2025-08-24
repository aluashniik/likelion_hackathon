// import React from 'react'
// import './Lecture.css'
// import Header from '../../components/Header/Header'
// import Navbar from '../../components/Navbar/Navbar'
// import LectureList from '../../components/Lecture/LectureList'
// import SliderBanner from '../../components/SlideBanner/SlideBanner'
// import { useNavigate } from 'react-router-dom'
// import SearchBar from '../../components/SearchBar/SearchBar'
// import { useEffect, useState } from "react";
// // import lectures from '../../utils/lectures'

// const Lecture = () => {

//   const [lectures, setLectures] = useState([])
//   const navigate = useNavigate();
  
//   const sortLecture = () => {
//     return [...lectures].sort((a, b) => {
//       return new Date(b.schedule) - new Date(a.schedule);
//     });
//   }
  
//   const recentLectures = sortLecture();

//   useEffect(() => {
//       async function fetchLectures() {
//           try {
//               const response = await fetch(
//                   `${import.meta.env.VITE_API_URL}/classes/list`,
//                   {
//                     method: "GET",
//                     credentials: "include",
//                     headers: {
//                       "Accept": "application/json",
//                       // "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
//                     },
//                   }
//                 );
                
//                 if (!response.ok) {
//                     throw new Error(`Error fetching lectures:${response.status}`);
//                   }
//                   const data = await response.json();
//                   setLectures(data.classes);
//                   console.log(lectures)
//                 } catch (error) {
//                     console.error("Error fetching lectures:", error);
//                   }
//                 }
//                 fetchLectures();
//               }, [navigate]);
              
//   return (
//     <div className='lecture'>
//       <Header title={"수업"}/>
//       <div className="lecture-content">
//         <div className="lecture-banner">
//           <SliderBanner />
//         </div>
//         <SearchBar/>
//         <div className="recent-lecture">
//           <div className="lecture-board">
//             <h2>최근 개설된 수업</h2>
//             <button onClick={()=>{navigate('/lecture/full')}}>수업 더보기</button>
//           </div>
//           <LectureList lectures={recentLectures.slice(0,3)} />
//         </div>
//         <div className="staff-ask">
//           <h2>수업 개설은 운영진에게 문의주세요!</h2>
//           <div className="staff-info">
//             <p>전화번호 010-1234-5678</p>
//             <p>이메일 qwerty1234@naver.com</p>
//           </div>
//         </div>

//       </div>
//       <Navbar/>
//     </div>
//   )
// }

// export default Lecture


// // const sortPostData = () => {
// //   return [...posts].sort((a, b) => {
// //     if (filter === "최신순") {
// //       return new Date(b.createdAt) - new Date(a.createdAt);
// //     } else if (filter === "인기순") {
// //       return b.totalLike - a.totalLike;
// //     } else if (filter === "댓글순") {
// //       return b.totalComments - a.totalComments;
// //     }
// //     return 0;
// //   });
// // };

// //   const sortedPosts = sortPostData();

// //   return (
//   //     <HomeContainer>
//   //       <div>
//   //         <HeaderSection filter={filter} setFilter={setFilter}/>
//   //         <ListSection posts={sortedPosts} />
//   //       </div>
//   //     </HomeContainer>
//   //   );
// // }


import React, { useEffect, useState, useMemo } from 'react'; // 💡 1. 'react'에서 useState와 useEffect, useMemo를 가져옵니다.
import './Lecture.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import LectureList from '../../components/Lecture/LectureList'
import SliderBanner from '../../components/SlideBanner/SlideBanner'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
// � 2. 목업 데이터 import는 이제 삭제합니다.
// import lectures from '../../utils/lectures'

const Lecture = () => {

  const [lectures, setLectures] = useState([])
  const [isLoading, setIsLoading] = useState(true); // 💡 3. 로딩 상태를 추가합니다.
  const navigate = useNavigate();
  
  // 💡 4. API를 호출하는 로직을 useEffect로 올바르게 감싸줍니다.
  useEffect(() => {
    async function fetchLectures() {
        try {
            setIsLoading(true); // 로딩 시작
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/class`, // 💡 API 명세서에 따라 /class로 수정
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json",
                    },
                }
            );
            
            if (!response.ok) {
                throw new Error(`Error fetching lectures:${response.status}`);
            }
            const data = await response.json();
            // 💡 API 응답에 따라 data.classList로 수정
            setLectures(data.classList || []); 
        } catch (error) {
            console.error("Error fetching lectures:", error);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    }
    fetchLectures();
  }, []); // [] 의존성 배열로, 처음 한 번만 실행되도록 합니다.
      
  // 💡 5. 정렬 로직은 useMemo를 사용해서 불필요한 재계산을 방지합니다.
  const recentLectures = useMemo(() => {
    return [...lectures].sort((a, b) => {
      return new Date(b.schedule) - new Date(a.schedule);
    });
  }, [lectures]);
  
  // 💡 6. 로딩 중일 때 보여줄 UI를 추가합니다.
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
      
  return (
    <div className='lecture'>
      <Header title={"수업"}/>
      <div className="lecture-content">
        <div className="lecture-banner">
          <SliderBanner />
        </div>
        <SearchBar/>
        <div className="recent-lecture">
          <div className="lecture-board">
            <h2>최근 개설된 수업</h2>
            <button onClick={()=>{navigate('/lecture/full')}}>수업 더보기</button>
          </div>
          {/* 💡 7. API로 받아와 정렬된 데이터를 LectureList에 넘겨줍니다. */}
          <LectureList lectures={recentLectures.slice(0,3)} />
        </div>
        <div className="staff-ask">
          <h2>수업 개설은 운영진에게 문의주세요!</h2>
          <div className="staff-info">
            <p>전화번호 010-1234-5678</p>
            <p>이메일 qwerty1234@naver.com</p>
          </div>
        </div>
      </div>
      <Navbar/>
    </div>
  )
}

export default Lecture
