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
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL;
        

        let url = `${API_BASE_URL}/helpRequests`;

        // 검색어(q)가 있을 때만 쿼리 파라미터를 추가
        if (q) {
          url += `?q=${encodeURIComponent(q)}`;
        }

        const response = await fetch(url, {
          credentials: 'include'
        });

        if (!response.ok) {
          if (response.status === 401) {
             throw new Error('로그인이 필요합니다. (401)');
          }
          // 500 에러를 포함한 다른 서버 에러 처리
          throw new Error(`서버 에러가 발생했습니다. (HTTP ${response.status})`);
        }

        const res = await response.json();

        if (res.is_success) {
          const listData = Array.isArray(res.data) ? res.data : res.data.items;
          setApiList(listData || []);
        } else {
          throw new Error(res.message || '데이터를 가져오는데 실패했습니다.');
        }

      } catch (error) {
        console.error("도움 요청 목록을 불러오는 데 실패했습니다.", error);
        setError(error.message);
        setApiList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [q]);

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
            ) : apiList.length > 0 ? (
              apiList.map((item) => (
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
