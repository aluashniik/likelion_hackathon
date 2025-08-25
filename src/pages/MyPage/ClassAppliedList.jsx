import React, { useState, useMemo, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import SearchBar from '../../components/SearchBar/SearchBar';
import filter_icon from '../../assets/filter_icon.png';
import LectureList from '../../components/Lecture/LectureList';

export default function ClassAppliedList() {
  const [filterState, setFilterState] = useState('all');
  const [apiLectures, setApiLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedLectures = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL;
        
        const url = `${API_BASE_URL}/mypage/class`;

        const response = await fetch(
          url,
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
          throw new Error(`서버 에러 (HTTP ${response.status})`);
        }
        
        const res = await response.json();

        const isSuccess = res.success || res._success || res.is_success;

        if (isSuccess) {
          const lectures = res.class_list || res.data?.class_list || [];
          setApiLectures(lectures);
        } else {
          throw new Error(res.message || "데이터 로딩에 실패했습니다.");
        }

      } catch (err) {
        console.error("신청한 수업 목록을 불러오는 데 실패했습니다:", err);
        setError(err.message);
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

  return (
    <div className='full-lecture'>
      <Header title={'수업'} />
      <div className="lecture-elements">
        <SearchBar />
        <button
          className='filter-btn'
          onClick={() =>
            setFilterState(filterState === 'all' ? 'open' : 'all')
          }
        >
          <img src={filter_icon} alt="필터" />
          <p>
            {filterState === 'all' ? '모집 중인 수업만 보기' : '전체 수업 보기'}
          </p>
        </button>
        
        {isLoading ? (
          <div>로딩 중...</div>
        ) : error ? (
          <div>오류: {error}</div>
        ) : lectureShown.length > 0 ? (
          <LectureList lectures={lectureShown} />
        ) : (
          <div>신청한 수업이 없습니다.</div>
        )}

      </div>
      <Navbar />
    </div>
  );
};
