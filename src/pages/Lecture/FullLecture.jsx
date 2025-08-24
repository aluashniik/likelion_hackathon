import Header from '../../components/Header/Header'
import SearchBar from '../../components/SearchBar/SearchBar'
import Navbar from '../../components/Navbar/Navbar'
import './FullLecture.css'
import filter_icon from '../../assets/filter_icon.png'
import lectures from '../../utils/lectures'

import React from 'react'
import { useState } from 'react'
import LectureList from '../../components/Lecture/LectureList'
import { useEffect } from 'react'

const FullLecture = () => {
  const [lectures, setLectures] = useState([])
  const [filterState, setFilterState]=useState('all');

  const filterOpen = () => {
    return [...lectures].filter((lecture)=>lecture.status === 'open')
  }

  const openLectures = filterOpen();
  const lectureShown = filterState === 'all' ? lectures : openLectures;
  
  useEffect(() => {
    async function fetchLectures() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/classes/list`
              );
        
              if (!response.ok) {
                  throw new Error("something went wrong");
                }
                const data = await response.json();
                setLectures(data.classes);
                console.log(lectures)
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
            <SearchBar/>
            <button className='filter-btn' onClick={() => 
                setFilterState(filterState === 'all' ? 'open' : 'all')
            }>
                <img src={filter_icon} alt="" />
                <p>
                    {filterState === 'all' ? '모집 중인 수업만 보기' : '전체 수업 보기'}
                </p>
            </button>
            <div className="lecture-elements-wrap">
              <LectureList lectures={lectureShown}/>
            </div>
        </div>
        <Navbar/>
    </div>
  )
}

export default FullLecture