import React, { useState, useMemo, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import SearchBar from '../../components/SearchBar/SearchBar';
import filter_icon from '../../assets/filter_icon.png';
import LectureList from '../../components/Lecture/LectureList';
// import lectures from '../../utils/lectures';

export default function ClassAppliedList() {
  const [filterState, setFilterState] = useState('all');
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
            credentials: 'include', 
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
       
        if (!response.ok) {
          throw new Error("Something went wrong with the request");
        }
        const data = await response.json();
        setApiLectures(data.class_list || []);
      } catch (error) {
        console.error("Error fetching applied lectures:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppliedLectures();
  }, []);

  const lectureShown = useMemo(() => {
    if (filterState === "open") {
      return apiLectures.filter((lecture) => lecture.status === "open");
    }
    return apiLectures;
  }, [filterState, apiLectures]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

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
        <LectureList lectures={lectureShown}/>
      </div>
      <Navbar/>
    </div>
  );
};
