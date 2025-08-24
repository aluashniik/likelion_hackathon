import React from 'react'
import './Lecture.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import LectureList from '../../components/Lecture/LectureList'
import SliderBanner from '../../components/SlideBanner/SlideBanner'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import { useEffect, useState } from "react";
// import lectures from '../../utils/lectures'

const Lecture = () => {

  const [lectures, setLectures] = useState([])
  const navigate = useNavigate();
  
  const sortLecture = () => {
    return [...lectures].sort((a, b) => {
      return new Date(b.schedule) - new Date(a.schedule);
    });
  }
  
  const recentLectures = sortLecture();

  useEffect(() => {
      async function fetchLectures() {
          try {
              const response = await fetch(
                  `${import.meta.env.VITE_API_URL}/classes/list`,
                  {
                    method: "GET",
                    credentials: "include",
                    headers: {
                      "Accept": "application/json",
                      // "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
                    },
                  }
                );
                
                if (!response.ok) {
                    throw new Error(`Error fetching lectures:${response.status}`);
                  }
                  const data = await response.json();
                  setLectures(data.classes);
                  console.log(lectures)
                } catch (error) {
                    console.error("Error fetching lectures:", error);
                  }
                }
                fetchLectures();
              }, [navigate]);
              
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


// const sortPostData = () => {
//   return [...posts].sort((a, b) => {
//     if (filter === "최신순") {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     } else if (filter === "인기순") {
//       return b.totalLike - a.totalLike;
//     } else if (filter === "댓글순") {
//       return b.totalComments - a.totalComments;
//     }
//     return 0;
//   });
// };

//   const sortedPosts = sortPostData();

//   return (
  //     <HomeContainer>
  //       <div>
  //         <HeaderSection filter={filter} setFilter={setFilter}/>
  //         <ListSection posts={sortedPosts} />
  //       </div>
  //     </HomeContainer>
  //   );
// }