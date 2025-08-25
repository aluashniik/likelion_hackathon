import React, { useState, useEffect } from "react";
import "./HelpRequests.css";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import vector from '../../assets/Vector.png';
import { formatKoreanDateTime } from "../../utils/date";

function RequestCard({ item, onClick }) {
  return (
    <button className="hr-card" onClick={() => onClick?.(item)}>
      <div className="hr-card-title">{item.title}</div>
      <ul className="hr-meta">
        <li><b>장소</b> {item.location}</li>
        <li><b>일정</b> {formatKoreanDateTime(item.request_time)}</li>
        <li><b>기기</b> {item.category}</li>
      </ul>
    </button>
  );
}

export default function HelpRequests() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const [apiList, setApiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL;

        const url = `${API_BASE_URL}/helpRequests`;
        const token = localStorage.getItem('accessToken');

        const response = await fetch(url, {
          credentials: 'include',
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });

        if (!response.ok) {
          throw new Error(`서버 에러 (HTTP ${response.status})`);
        }

        const res = await response.json();

        if (res.is_success || res._success) {
          setApiList(res.data?.items || []);
        } else {
          throw new Error(res.message || '데이터 로딩 실패');
        }

      } catch (error) {
        console.error("전체 목록을 불러오는 데 실패했습니다.", error);
        setError(error.message);
        setApiList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRequests();
  }, []);

  const filteredList = apiList.filter(item =>
    item.title?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="hr-page">
      <div className="app-shell">
        <Header title={'도움 요청 목록'} />
        <main className="hr-content">
          <div className="hr-search">
            <img className="hr-search-icon" src={vector} alt="검색" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="제목으로 검색해보세요!"
            />
            {q && (
              <button className="hr-clear" onClick={() => setQ("")}>✕</button>
            )}
          </div>

          <div className="hr-list">
            {loading ? (
              <div className="status-message">목록을 불러오는 중...</div>
            ) : error ? (
              <div className="status-message error">{error}</div>
            // 화면에는 apiList 대신 필터링된 filteredList를 사용
            ) : filteredList.length > 0 ? (
              filteredList.map((item) => (
                <RequestCard
                  key={item.request_id}
                  item={item}
                  onClick={(it) => {
                    sessionStorage.setItem('hr:lastItem', JSON.stringify(it));
                    navigate(`/list/details`, { state: it });
                  }}
                />
              ))
            ) : (
              <div className="status-message">
                {q ? `"${q}"에 대한 검색 결과가 없습니다.` : "표시할 도움 요청이 없습니다."}
              </div>
            )}
          </div>
        </main>
        <Navbar />
      </div>
    </div>
  );
}


