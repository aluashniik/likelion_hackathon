import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import "./ChatComplete.css";
import { formatKoreanDateTime } from "../../utils/date";
import howtoscreenshot from "../../assets/howtoscreenshot.png";
import ai_time from "../../assets/ai_time.png";

export default function ChatComplete() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const data = state?.data;

  useEffect(() => {
    sessionStorage.removeItem('hr:lastItem');
  }, []);

  //목업 데이터와 API 응답 데이터를 모두 처리할 수 있도록
  const title = data?.title || "제목 없음";
  const requesterName = data?.requester?.name || "OOO 어르신";
  const location = data?.location || data?.place || "-";
  const requestTime = data?.request_time || data?.when;
  const device = data?.category_name || data?.device || "스마트폰";
  const duration = data?.duration || "0시간 30분";
  const description = data?.description || data?.content || "상세 내용 없음";
  const attachments = data?.images || data?.attachments;
  const hasAttachment = attachments && attachments.length > 0;

  return (
    <div className="hr-page">
      <div className="app-shell">
        <Header title={'나의 요청글 확인'}/>  
        <main className="cm-content">
          <h2 className="cm-title">요청글이 등록되었어요!</h2>

          <section className="cm-card">
            <h3 className="cm-ttl">{title}</h3>
            <ul className="cm-meta">
              <li><b>요청자</b> {requesterName}</li>
              <li><b>장소</b> {location}</li>
              <li><b>일정</b> {formatKoreanDateTime(requestTime)}</li>
              <li><b>기기</b> {device}</li>
              {/* <li><b>예상 소요시간</b> {duration}</li> */}
              <li className="ai-duration">
                <b>예상 소요시간</b>
                <span>{duration}</span>
                <div className="cm-ai-notice">
                  <img className="cm-ai-icon" src={ai_time}/>
                  <span>온마을 AI가<br />예상소요시간을 계산했어요!</span>
                  </div>
              </li>
            </ul>
            <p className="cm-desc">{description}</p>
            
            {hasAttachment && (
              <img 
                src={attachments[0] || howtoscreenshot} 
                alt="첨부파일 미리보기" 
                className="cm-attach"
              />
            )}
          </section>

          <button className="cm-btn" onClick={() => navigate("/myrequest")}>
            내 도움 진행상황 보러가기
          </button>
          <button className="cm-btn2" onClick={() => navigate("/")}>
            홈 화면으로 돌아가기
          </button>
        </main>
        <Navbar />
      </div>
    </div>
  );
}

