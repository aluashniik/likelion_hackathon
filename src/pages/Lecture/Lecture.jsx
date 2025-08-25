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
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/lecture/full?keyword=${searchQuery}`);
    }
  };
  
  const sortLecture = () => {
    // lectures가 배열이 아니면 빈 배열 반환
    if (!Array.isArray(lectures)) {
      console.error("Lectures is not an array:", lectures);
      return [];
    }
    return [...lectures].sort((a, b) => {
      return new Date(b.schedule) - new Date(a.schedule);
    });
  }
  
  const recentLectures = sortLecture();

  useEffect(() => {
      async function fetchLectures() {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/class`,
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
            setIsLoading(false);

            if (Array.isArray(data.data.classes)) {
              setLectures(data.data.classes);
            } else {
              console.error("API 응답에 'classes' 배열이 유효하지 않습니다:", data);
              setLectures([]);
            }
          } catch (error) {
              console.error("Error fetching lectures:", error);
          }
        }
        fetchLectures();
    }, []);

  if (isLoading) {
    return (
      <div className='lecture'>
        <Header title={"수업"}/>
        <div className="lecture-content">
          <div className="lecture-banner">
            <SliderBanner />
          </div>
          <SearchBar 
            value={searchQuery} 
            onSearch={handleSearchChange} 
            onSubmit={handleSearchSubmit} 
          />          
          <div className="recent-lecture">
            <div className="lecture-board">
              <h2>최근 개설된 수업</h2>
              <button onClick={()=>{navigate('/lecture/full')}}>수업 더보기</button>
            </div>
            <h3>&nbsp;&nbsp; loading...</h3>
          </div>
        </div>
        <Navbar/>
      </div>
    )
  }
              
  return (
    <div className='lecture'>
      <Header title={"수업"}/>
      <div className="lecture-content">
        <div className="lecture-banner">
          <SliderBanner />
        </div>
        <SearchBar 
            value={searchQuery} 
            onSearch={handleSearchChange} 
            onSubmit={handleSearchSubmit} 
        />        
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