import React, { useState, useMemo, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { getMyReviews } from '../../api/mypage';
import './MyReviews.css'; 
import { formatKoreanDateTime } from '../../utils/date';

// 목업 
const mockReviews = [
  {
    id: 1,
    title: "핸드폰 화면 녹화하는 방법을 알려주세요!",
    rating: 5,
    place: "신수동 1번지",
    time: "2025-08-07T15:00:00",
    reviewText: "청년이 시작부터 끝까지 핸드폰 사용방식을 잘 알려줘요 친절해요 설명을 잘 합니다",
  },
  {
    id: 2,
    title: "키오스크 사용방법을 알려주세요",
    rating: 5,
    place: "대흥역 3번 출구",
    time: "2025-08-08T10:30:00",
    reviewText: "설명을 잘 합니다 잘 배웠습니다",
  },
  {
    id: 3,
    title: "지난 방송을 다시 보는 방법을 알려주세요!",
    rating: 5,
    place: "마포구청 근처",
    time: "2025-08-09T14:00:00",
    reviewText: "설명을 잘 합니다 잘 배웠습니다",
  },
];

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
function ReviewCard({ item, onClick }) {

  return (
    <div className="rev-card">
      <h3 className="rev-title">{item.title}</h3>
      <ul className="rev-meta">
        <li><b>별점</b> <StarRating rating={item.rating} /></li>
        <li><b>장소</b> {item.place}</li>
        <li><b>일정</b> {formatKoreanDateTime(item.time)}</li>
        <li className="rev-text"><b>후기</b> {item.reviewText}</li>
      </ul>
      <button className="rev-detail-btn" onClick={() => onClick(item)}>자세히 보기</button>
    </div>
  );
}


export default function MyReviews() {
  const navigate = useNavigate();

  //////////////
  /*
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getMyReviews();
        if (res.is_success) {
          setList(res.review_list || []);
        }
      } catch (error) {
        console.error("받은 리뷰 목록을 불러오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);
  
  if (loading) {
    return <div>리뷰를 불러오는 중...</div>;
  }
  */

  const list = useMemo(() => mockReviews, []);

  const averageRating = useMemo(() => {
    if (list.length === 0) return 0;
    const total = list.reduce((sum, item) => sum + item.rating, 0);
    return (total / list.length).toFixed(1);
  }, [list]);

  const goDetail = (item) => {
    sessionStorage.setItem("hr:lastItem", JSON.stringify(item));
    navigate(`/mypage/reviews/${item.id}`, { state: item });
  };

  return (
    <div className="hr-page">
      <div className="app-shell">
        <Header title="내 정보" divider />
        <main className="rev-content">
          <div className="rev-header">
            <h2 className="rev-h2">내가 받은 후기</h2>
            <div className="rev-avg-rating">
              <span>{averageRating}</span>
              <StarRating rating={Math.round(averageRating)} />
            </div>
          </div>
          <div className="rev-list">
            {list.map((item) => (
              <ReviewCard key={item.id} item={item} onClick={goDetail} />
            ))}
          </div>
        </main>
        <Navbar />
      </div>
    </div>
  );
}
