import React, { useEffect, useState } from "react";
import "./HelpRequestsDetails.css";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { formatSimpleDateTime } from "../../utils/date";

export default function HelpRequestsDetails() {
  const { state, search } = useLocation();
  const navigate = useNavigate();
  
  const params = new URLSearchParams(search);
  const role = params.get("role") || "guest";

  const [accepted, setAccepted] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialItem = state || JSON.parse(sessionStorage.getItem('hr:lastItem'));

    if (!initialItem?.request_id) {
      setError("요청 정보를 찾을 수 없습니다. 목록 페이지에서 다시 접근해주세요.");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL;
        const url = `${API_BASE_URL}/helpRequests/${initialItem.request_id}`;

        const token = localStorage.getItem('accessToken');

        const response = await fetch(url, {
          credentials: 'include',
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('로그인이 필요합니다. (401)');
          }
          throw new Error(`서버 에러가 발생했습니다. (HTTP ${response.status})`);
        }

        const res = await response.json();
        // [수정] res.is_success 와 res._success를 모두 확인
        if (res.is_success || res._success) {
          setDetailData(res.data);
        } else {
          throw new Error(res.message || "상세 정보를 가져오는데 실패했습니다.");
        }
      } catch (err) {
        console.error("상세 정보 조회 실패", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [state]);

  const handleRequest = async () => {
    if (!detailData?.request_id) {
      alert("요청 ID가 없어 수락할 수 없습니다.");
      return;
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const url = `${API_BASE_URL}/matches`; 
      const token = localStorage.getItem('accessToken');

      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({
          request_id: detailData.request_id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const res = await response.json();
      if (res.is_success || res._success) {
        alert("요청을 수락했습니다!");
        setAccepted(true);
      } else {
        throw new Error(res.message || "요청 수락에 실패했습니다.");
      }
    } catch (err) {
      console.error("요청 수락 실패:", err);
      alert(`요청 수락에 실패했습니다: ${err.message}`);
    }
  };

  if (loading) {
    return <div>상세 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  if (!detailData) {
    return <div>상세 데이터를 찾을 수 없습니다.</div>;
  }

  // 소요 시간을 분 단위에서 "X시간 Y분" 형태로 변환하는 함수
  const formatDuration = (minutes) => {
    if (!minutes || minutes <= 0) return "정보 없음";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    let result = '';
    if (h > 0) result += `${h}시간 `;
    if (m > 0) result += `${m}분`;
    return result.trim();
  };

  return (
    <div className="hr-page">
      <div className="app-shell">
        <Header title={'도움 요청 상세'} />
        <main className="hrd_content">
          <h2 className="shl-h2">상세 요청 내용</h2>
          <section className="hrd_card">
            <h1 className="hrd_title">{detailData.title}</h1>
            <dl className="hrd_meta">
              <div className="row">
                <dt>요청자</dt>
                <dd>{detailData.writer?.name || "정보 없음"}</dd>
              </div>
              <div className="row">
                <dt>도움드릴 장소</dt>
                <dd>{detailData.location}</dd>
              </div>
              <div className="row">
                <dt>도움드릴 일시</dt>
                <dd>{formatSimpleDateTime(detailData.request_time)}</dd>
              </div>
              <div className="row">
                <dt>소요시간</dt>
                <dd>{formatDuration(detailData.estimated_time_in_minutes)}</dd>
              </div>
              <div className="row">
                <dt>요청사항</dt>
                <dd>{detailData.description}</dd>
              </div>
              {detailData.images?.[0] && (
                <div className="row">
                  <dt>첨부파일</dt>
                  <dd>
                    <img
                      className="hrd-attach"
                      src={detailData.images[0]}
                      alt="첨부 미리보기"
                    />
                  </dd>
                </div>
              )}
            </dl>
          </section>

        {/* 청년(Junior)을 위한 '수락' 버튼 */}
        {detailData.ui_flags?.can_accept && (
          <button
            className={`hrd-ct ${accepted ? "accepted" : ""}`}
            onClick={handleRequest}
            disabled={accepted}
          >
            {accepted ? "도움 요청 수락 완료!" : "도움 요청 수락하기"}
          </button>
        )}

        {/* 어르신(Senior, 작성자)을 위한 '수정'*/}
        {(detailData.ui_flags?.can_edit || detailData.ui_flags?.can_cancel) && (
          <div className="hrd-author-actions">
            {/* {detailData.ui_flags.can_edit && (
              <button
                className="hrd-edit-btn"
                onClick={() => navigate(detailData.routes.edit)}
              >
                수정하기
              </button>
            )} */}
            {/* {detailData.ui_flags.can_cancel && (
              <button
                className="hrd-cancel-btn"
                onClick={() => {
                  if (window.confirm("정말로 이 요청을 취소하시겠습니까?")) {
                    // handleCancelRequest(detailData.routes.cancel);
                    alert("취소 API 호출 로직 연결이 필요합니다.");
                  }
                }}
              >
                요청 취소
              </button>
            )} */}
          </div>
        )}
      </main>
      <Navbar />
      </div>
    </div>
  );
}
