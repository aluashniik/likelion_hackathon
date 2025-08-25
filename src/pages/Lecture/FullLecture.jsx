import Header from '../../components/Header/Header'
import SearchBar from '../../components/SearchBar/SearchBar'
import Navbar from '../../components/Navbar/Navbar'
import './FullLecture.css'
import filter_icon from '../../assets/filter_icon.png'

import React from 'react'
import { useState } from 'react'
import LectureList from '../../components/Lecture/LectureList'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const FullLecture = () => {
  const [lectures, setLectures] = useState([])
  const [filterState, setFilterState]=useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("keyword") || '';
    setSearchKeyword(keyword);
  }, [location.search]);

  const filterOpen = () => {
    return [...lectures].filter((lecture)=>lecture.status === 'OPEN')
  }

  const openLectures = filterOpen();
  // const lectureShown = filterState === 'all' ? lectures : openLectures;
  const filteredLectures = (filterState === 'all' ? lectures : openLectures).filter(
    (lecture) =>
      lecture.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      lecture.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

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
                },
              }
            );
                
            if (!response.ok) {
              throw new Error(`Error fetching lectures:${response.status}`);
            }
            const data = await response.json();

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

  return (
    <div className='full-lecture'>
        <Header title={'수업'}/>
        <div className="lecture-elements">
          <SearchBar value={searchKeyword} onSearch={setSearchKeyword} navigate={navigate}/>
            <button className='filter-btn' onClick={() => 
                setFilterState(filterState === 'all' ? 'OPEN' : 'all')
            }>
                <img src={filter_icon} alt="" />
                <p>
                    {filterState === 'all' ? '모집 중인 수업만 보기' : '전체 수업 보기'}
                </p>
            </button>
            <div className="lecture-elements-wrap">
              <LectureList lectures={filteredLectures}/>
            </div>
        </div>
        <Navbar/>
    </div>
  )
}

export default FullLecture