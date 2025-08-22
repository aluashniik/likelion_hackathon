import React, { useState, useMemo, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { getMyAcceptedRequests } from '../../api/mypage';
import "./JuniorAcceptList.css";
import { formatKoreanDateTime } from '../../utils/date';

const mock = [
  {
    match_id: 1,
    help_title: "키오스크 사용방법을 알려주세요",
    location: "신수동 1번지",
    matched_at: "2025-08-07T15:00:00",
    status: 'waiting', //수락완료
    rating: 5, 
    reviewText: "설명을 잘 합니다 잘 배웠습니다"
  },
  {
    match_id: 2,
    help_title: "핸드폰 화면 녹화하는 방법을 알려주세요! ",
    location: "신수동 1번지",
    matched_at: "2025-08-07T15:00:00",
    status: 'done', //도움 완료
    rating: 5,
    reviewText: "청년이 시작부터 끝까지 핸드폰 사용방식을 잘 알려줘요 친절해요 설명을 잘 합니다"

  },
  {
    match_id: 3,
    help_title: "지난 방송을 다시 보는 방법을 알려주세요!",
    location: "신수동 1번지",
    matched_at: "2025-08-07T15:00:00",
    status: 'done', 
    rating: 5,
    reviewText: "설명을 잘 합니다 잘 배웠습니다"
  },
];


const STATUS ={
  waiting: {label: "수락 완료", className:"badge-waiting" },
  done:{label:"도움 완료", className:"badge-done"},
};

function Card({item, onClick}){
  const st = STATUS[item.status];
  if (!st) return null; 

  return(
    <div className="shl-card">
      <span className={`shl-badge ${st.className}`}>{st.label}</span>
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
  
  // API 연동 준비 
  /*
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getMyAcceptedRequests();
        if (res.is_success) {
          setList(res.offer_list || []);
        }
      } catch (error) {
        console.error("도움 수락 내역을 불러오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) {
    return <div>목록을 불러오는 중...</div>;
  }
  */

  const list = useMemo(() => mock, []);
  
  const goDetail = (it) => {
    sessionStorage.setItem("hr:lastItem", JSON.stringify(it));
    navigate(`/mypage/accepted-requests/${it.match_id}`, { state: it });
  };

  return (
    <div className="hr-page">
      <div className="app-shell">
        <Header title={'내 정보'}/>  
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
