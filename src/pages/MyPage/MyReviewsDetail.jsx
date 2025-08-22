import React, { useState, useEffect } from "react"; 
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { getMyReviewById } from "../../api/mypage"; 
import "./MyReviewsDetail.css"; 
import howtoscreenshot from '../../assets/howtoscreenshot.png';
import { formatSimpleDateTime } from "../../utils/date";

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starClass = index < rating ? 'star-filled' : 'star-empty';
        return <span key={index} className={`star ${starClass}`}>★</span>;
      })}
    </div>
  );
}

export default function MyReviewsDetail() {
  const { state } = useLocation(); 
  const navigate = useNavigate();

  //API 연동 준비 
  /*
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const initialItem = state || JSON.parse(sessionStorage.getItem('hr:lastItem'));

  useEffect(() => {
    if (initialItem?.id) {
      const fetchReviewDetails = async () => {
        try {
          const res = await getMyReviewById(initialItem.id);
          if (res.is_success) {
            setDetailData(res.data);
          }
        } catch (error) {
          console.error("리뷰 상세 정보 조회 실패", error);
        } finally {
          setLoading(false);
        }
      };
      fetchReviewDetails();
    } else {
      setLoading(false);
    }
  }, [initialItem?.id]);

  if (loading) {
    return <div>상세 정보를 불러오는 중...</div>;
  }
  
  // API 연동 시에는 아래 item 대신 detailData를 사용
  // if (!detailData) { ... } 
  */

  let item = state || JSON.parse(sessionStorage.getItem('hr:lastItem'));

  if (!item) {
    return <div>상세 데이터를 찾을 수 없습니다.</div>;
  }

  const reviewInfo = item;
  const helpRequestInfo = item.helpRequest || item; 

  return (
    <div className="hr-page">
      <div className="app-shell">
        <Header title="내 정보" divider />
        <main className="mrd-content">
        <div className="mrd-header"></div>
        <h2 className="mrd-h2">후기 상세</h2>
          <section className="mrd-review-card">
            <ul className="mrd-meta">
              <li><b>별점</b> <StarRating rating={reviewInfo.rating} /></li>
              <li><b>후기</b> {reviewInfo.content || reviewInfo.reviewText}</li>
            </ul>
          </section>

          <h2 className="mrd-h2">도움 요청글</h2>
          <section className="mrd-request-card">
            <h3 className="mrd-title">{helpRequestInfo.help_title || helpRequestInfo.title}</h3>
            <dl className="mrd-dl">
              <div className="row">
                <dt>요청자</dt>
                <dd>OOO 어르신</dd> 
              </div>
              <div className="row">
                <dt>도움드릴 장소</dt>
                <dd>{helpRequestInfo.location || helpRequestInfo.place || "-"}</dd>
              </div>
              <div className="row">
                <dt>도움드릴 일시</dt>
                <dd>{formatSimpleDateTime(helpRequestInfo.matched_at || helpRequestInfo.time)}</dd>
              </div>
              <div className="row">
                <dt>소요시간</dt>
                <dd>0시간 30분</dd>
              </div>
              <div className="row">
                <dt>요청사항</dt>
                <dd>제 핸드폰 화면을 녹화해서 손녀에게 보내주려고 합니다. 핸드폰 소리와 제가 말하는 소리가 모두 녹화되었으면 좋겠습니다.</dd>
              </div>
              <div className="row">
                <dt>첨부파일</dt>
                <dd>
                  <img
                    className="mrd-attach"
                    src={howtoscreenshot}
                    alt="첨부 미리보기"
                  />
                </dd>
              </div>
            </dl>
          </section>
        </main>
        <Navbar />
      </div>
    </div>
  );
}
