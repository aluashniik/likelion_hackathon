import React, { useState, useMemo, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import SearchBar from '../../components/SearchBar/SearchBar';
import filter_icon from '../../assets/filter_icon.png';
import lectures from '../../utils/lectures';
import LectureList from '../../components/Lecture/LectureList';

export default function ClassAppliedList() {
  const [filterState, setFilterState] = useState('all');

  // API 연동 준비
  /*
  const [apiLectures, setApiLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedLectures = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/mypage/class`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
       
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();
        setApiLectures(data.data || []);
      } catch (error) {
        console.error("Error fetching applied lectures:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppliedLectures();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  */

  ////

  const filterOpen = () => {
    return [...lectures].filter((lecture) => lecture.status === 'open');
  };

  const openLectures = filterOpen();
  const lectureShown = filterState === 'all' ? lectures : openLectures;

  return (
    <div className='full-lecture'>
      <Header title={'수업'}/>
      <div className="lecture-elements">
        <SearchBar/>
        <button
          className='filter-btn'
          onClick={() =>
            setFilterState(filterState === 'all' ? 'open' : 'all')
          }
        >
          <img src={filter_icon} alt="" />
          <p>
            {filterState === 'all' ? '모집 중인 수업만 보기' : '전체 수업 보기'}
          </p>
        </button>
        {/*API 연동 시에는 lectures={lectureShown} 대신 lectures={apiLectures} 와 같이 수정 */}
        <LectureList lectures={lectureShown}/>
      </div>
      <Navbar/>
    </div>
  );
};
