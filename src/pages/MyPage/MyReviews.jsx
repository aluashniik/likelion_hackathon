import React, {useState, useMemo, useEffect} from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import './MyReviews.css';

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starClass = index < Math.round(rating) ? 'star-filled' : 'star-empty';
        return <span key={index} className={`star ${starClass}`}>★</span>;
      })}
    </div>
  );
}

function ReviewCard({ item }) {
  return (
    <div className="rev-card">
      <div className="rev-meta">
        <div className="rev-rating-line">
          <b>별점</b> <StarRating rating={item.rating} />
        </div>
        <p className="rev-text">"{item.content}"</p>
      </div>
    </div>
  );
}

export default function MyReviews() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const averageRating = useMemo(() => {
    if (list.length === 0) return 0;
    const total = list.reduce((sum, item) => sum + item.rating, 0);
    return (total / list.length).toFixed(1);
  }, [list]);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL;
        const url = `${API_BASE_URL}/mypage/review`;
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

        const isSuccess = res.success || res._success || res.is_success;

        if (isSuccess) {
          const reviews = res.review_list || res.data?.review_list || [];
          setList(reviews);
        } else {
          throw new Error(res.message || '데이터 로딩 실패');
        }
      } catch (err) {
        console.error("받은 리뷰 목록을 불러오는 데 실패했습니다.", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="hr-page">
      <div className="app-shell">
        <Header title={'내 정보'} />
        <main className="rev-content">
          <div className="rev-header">
            <h2 className="rev-h2">내가 받은 후기</h2>
            <div className="rev-avg-rating">
              <span>{averageRating}</span>
              <StarRating rating={averageRating} />
            </div>
          </div>
          <div className="rev-list">
            {loading ? (
              <div className="status-message">리뷰를 불러오는 중...</div>
            ) : error ? (
              <div className="status-message error">{error}</div>
            ) : list.length > 0 ? (
              list.map((item) => (
                <ReviewCard key={item.id} item={item} />
              ))
            ) : (
              <div className="status-message">받은 후기가 없습니다.</div>
            )}
          </div>
        </main>
        <Navbar />
      </div>
    </div>
  );
}