import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import "./JuniorAcceptList.css";
import { formatKoreanDateTime } from '../../utils/date';

function Card({ item, onClick }) {
  return (
    <div className="shl-card">
      {/* API 응답에 status가 없으므로, '수락 완료'를 기본으로 표시 */}
      <span className="shl-badge badge-waiting">수락 완료</span>
      <h3 className="shl-title">{item.help_title}</h3>
      <ul className="shl-meta">
        <li><b>장소</b> {item.location}</li>
        <li><b>일정</b> {formatKoreanDateTime(item.matched_at)}</li>
      </ul>
      <button className="shl-detail" onClick={() => onClick(item)}>자세히 보기</button>
    </div>
  );
}

export default function JuniorAcceptList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      setLoading(true);
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL;
        const url = `${API_BASE_URL}/mypage/offer`;
        const token = localStorage.getItem('accessToken');

        const response = await fetch(url, {
          credentials: 'include',
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });

        const res = await response.json();

        if (res.is_success || res._success) {
          setList(res.data?.help_list || []);
        } else {
          throw new Error(res.message || '데이터 로딩 실패');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedRequests();
  }, []);

  const goDetail = (it) => {
    sessionStorage.setItem("hr:lastItem", JSON.stringify(it));
    navigate(`/mypage/accepted-requests/${it.match_id}`, { state: it });
  };

  return (
    <div className="hr-page">
      <div className="app-shell">
        <Header title={'내 정보'} />
        <main className="shl-content">
          <h2 className="shl-h2">도움 수락 내역</h2>
          <div className="shl-list">
            {list.map((item) => (
              <Card key={item.match_id} item={item} onClick={goDetail} />
            ))}
          </div>
        </main>
        <Navbar />
      </div>
    </div>
  );
}
