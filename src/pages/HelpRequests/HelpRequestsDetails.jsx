import React, { useEffect, useState } from "react";
import "./HelpRequestsDetails.css";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import howtoscreenshot from '../../assets/howtoscreenshot.png';
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

    // [디버깅 코드 추가] useEffect 시작 시 initialItem 값을 콘솔에 출력합니다.
    console.log("상세 페이지 데이터 확인:", initialItem);

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

        const response = await fetch(url, {
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('로그인이 필요합니다. (401)');
          }
          throw new Error(`서버 에러가 발생했습니다. (HTTP ${response.status})`);
        }

        const res = await response.json();
        if (res.is_success) {
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
    // 의존성 배열에서 state를 제거하여 불필요한 재실행을 방지하고,
    // initialItem.request_id를 직접 사용하여 명확하게 만듭니다.
  }, [state]); // location.state가 변경될 때만 재실행되도록 설정

  const handleRequest = async () => {
    if (!detailData?.request_id) {
      alert("요청 ID가 없어 수락할 수 없습니다.");
      return;
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const url = `${API_BASE_URL}/matches`; 

      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          request_id: detailData.request_id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const res = await response.json();
      if (res.is_success) {
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
                <dd>{detailData.requester?.name || "OOO 어르신"}</dd>
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
                <dd>{detailData.duration || "0시간 30분"}</dd>
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

          {role === 'junior' && (
            <button
              className={`hrd-ct ${accepted ? "accepted" : ""}`}
              onClick={handleRequest}
              disabled={accepted}
            >
              {accepted ? "도움 요청 수락 완료!" : "도움 요청 수락하기"}
            </button>
          )}
        </main>
        <Navbar />
      </div>
    </div>
  );
}
