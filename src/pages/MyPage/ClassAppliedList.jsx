// import React, { useState, useMemo, useEffect } from 'react';
// import Header from '../../components/Header/Header';
// import Navbar from '../../components/Navbar/Navbar';
// import SearchBar from '../../components/SearchBar/SearchBar';
// import filter_icon from '../../assets/filter_icon.png';
// import { useNavigate } from 'react-router-dom';
// import { formatKoreanDate } from '../../utils/dateFormat';

// export default function ClassAppliedList() {
//   const [filterState, setFilterState] = useState('all');
//   const [apiLectures, setApiLectures] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const nav = useNavigate();

//   useEffect(() => {
//     const fetchAppliedLectures = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const API_BASE_URL = import.meta.env.VITE_API_URL;
//         const url = `${API_BASE_URL}/mypage/class`;

//         const response = await fetch(url, {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`서버 에러 (HTTP ${response.status})`);
//         }

//         const res = await response.json();
//         const isSuccess = res.success || res._success || res.is_success;

//         if (isSuccess) {
//           const lectures = res.class_list || res.data?.class_list || [];
//           setApiLectures(lectures);
//         } else {
//           throw new Error(res.message || '데이터 로딩에 실패했습니다.');
//         }
//       } catch (err) {
//         console.error('신청한 수업 목록을 불러오는 데 실패했습니다:', err);
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAppliedLectures();
//   }, []);

//   const lectureShown = useMemo(() => {
//     if (filterState === 'open') {
//       return apiLectures.filter(
//         (lecture) => String(lecture.status || '').toLowerCase() === 'open'
//       );
//     }
//     return apiLectures;
//   }, [filterState, apiLectures]);

//   const goFull = (lec) => {
//     const payload = {
//       lectureId: lec.id ?? lec.lecture_id,
//       title: lec.title,
//       schedule: lec.schedule,
//       host_name: lec.host_name || (lec.host_id ? `호스트 #${lec.host_id}` : ''),
//       status: String(lec.status || '').toLowerCase(),
//       description: lec.description,
//       _raw: lec,
//     };
//     sessionStorage.setItem('lecture:last', JSON.stringify(payload));
//     nav('/lecture/full', { state: payload });
//   };

//   return (
//     <div className='full-lecture'>
//       <Header title={'수업'} />
//       <div className="lecture-elements">
//         <SearchBar />
//         <button
//           className='filter-btn'
//           onClick={() =>
//             setFilterState(filterState === 'all' ? 'open' : 'all')
//           }
//         >
//           <img src={filter_icon} alt="필터" />
//           <p>
//             {filterState === 'all' ? '모집 중인 수업만 보기' : '전체 수업 보기'}
//           </p>
//         </button>

//         {isLoading ? (
//           <div>로딩 중...</div>
//         ) : error ? (
//           <div>오류: {error}</div>
//         ) : lectureShown.length > 0 ? (
//           <div className="lecture-list">
//             {lectureShown.map((lec) => {
//               const key = lec.id ?? lec.lecture_id;
//               const isOpen = String(lec.status || '').toLowerCase() === 'open';
//               return (
//                 <div
//                   key={key}
//                   className="lecture-wrapper"
//                   onClick={() => goFull(lec)}
//                   role="button"
//                 >
//                   <div className="lecture-main">
//                     <div className="lecture-title">{lec.title}</div>
//                     <div className={isOpen ? 'lecture-status' : 'lecture-status close'}>
//                       {isOpen ? '모집 중' : '마감'}
//                     </div>
//                   </div>
//                   <div className="lecture-info">
//                     <div className="lecture-host">
//                       {lec.host_name || (lec.host_id ? `호스트 #${lec.host_id}` : '')}
//                     </div>
//                     <span> | </span>
//                     <div className="lecture-schedule">
//                       {lec.schedule ? formatKoreanDate(lec.schedule) : ''}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <div>신청한 수업이 없습니다.</div>
//         )}
//       </div>
//       <Navbar />
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { formatKoreanDate } from '../../utils/dateFormat.js';
import { useNavigate } from 'react-router-dom';

/** 개별 카드 */
const LectureItem = ({ lectureId, title, schedule, host_name, status }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lecture/${lectureId}`);
  };

  const isOpen = String(status || '').toUpperCase() === 'OPEN';

  return (
    <div className='lecture-wrapper' onClick={handleClick}>
      <div className="lecture-main">
        <div className="lecture-title">{title}</div>
        <div className={isOpen ? 'lecture-status' : 'lecture-status close'}>
          {isOpen ? '모집 중' : '마감'}
        </div>
      </div>
      <div className="lecture-info">
        <div className="lecture-host">{host_name}</div>
        <span> | </span>
        <div className="lecture-schedule">{formatKoreanDate(schedule)}</div>
      </div>
    </div>
  );
};

export default LectureItem;

/** 목록 컨테이너: /mypage/class 호출하여 LectureItem 리스트 렌더 */
export function ClassAppliedList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      setErr(null);
      try {
        const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
        if (!API_BASE) throw new Error('VITE_API_URL이 설정되지 않았습니다.');

        const res = await fetch(`${API_BASE}/mypage/class`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`,
          },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const body = await res.json();
        const ok =
          body.success === true ||
          body._success === true ||
          body.is_success === true ||
          (typeof body.code === 'string' && body.code.startsWith('S'));
        if (!ok) throw new Error(body.message || 'API 실패');

        const list = body.class_list ?? body.data?.class_list ?? [];
        const normalized = (Array.isArray(list) ? list : []).map((it) => ({
          lectureId: it.id ?? it.lecture_id,
          title: it.title,
          schedule: it.schedule,
          host_name: it.host_name || (it.host_id ? `호스트 #${it.host_id}` : ''),
          status: String(it.status || 'open').toUpperCase(), // LectureItem의 OPEN 비교에 맞춤
        }));

        setItems(normalized);
      } catch (e) {
        console.error('수강 중인 수업 목록 로딩 실패:', e);
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (err) return <div>오류: {err}</div>;
  if (!items.length) return <div>신청한 수업이 없습니다.</div>;

  return (
    <div>
      {items.map((it) => (
        <LectureItem
          key={it.lectureId}
          lectureId={it.lectureId}
          title={it.title}
          schedule={it.schedule}
          host_name={it.host_name}
          status={it.status}
        />
      ))}
    </div>
  );
}
