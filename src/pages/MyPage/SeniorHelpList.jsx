import React, { useState, useMemo, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { getMyHelpRequests } from '../../api/mypage';
import "./SeniorHelpList.css";
import { formatKoreanDateTime } from '../../utils/date';

//목업
const mock = [
  {
    match_id: 1,
    help_title: "핸드폰 화면 녹화하는 방법을 알려주세요!",
    location: "신수동 1번지",
    matched_at: "2025-08-07T15:00:00",
    status: 'pending' //수락 전
  },
  {
    match_id: 2,
    help_title: "키오스크 사용방법을 알려주세요",
    location: "신수동 1번지",
    matched_at: "2025-08-07T15:00:00",
    status: 'waiting' //도움 전
  },
  {
    match_id: 3,
    help_title: "지난 방송을 다시 보는 방법을 알려주세요!",
    location: "신수동 1번지",
    matched_at: "2025-08-07T15:00:00",
    status: 'done' //도움 완료
  },
];

const STATUS ={
  pending :{label: "수락 전", className:"badge-pending"},
  waiting: {label: "도움 전", className:"badge-waiting" },
  done:{label:"도움 완료", className:"badge-done"},
};

function Card({item, onClick}){
  const st=STATUS[item.status] || STATUS.pending;
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

export default function SeniorHelpList() {
  const navigate = useNavigate();
  
  // API 연동 준비
  /*
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getMyHelpRequests();
        if (res.is_success) {
          setList(res.help_list || []);
        }
      } catch (error) {
        console.error("도움 신청 내역을 불러오는 데 실패했습니다.", error);
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
    navigate(`/mypage/help-requests/${it.match_id}`, { state: it });
  };

  return (
    <div className="hr-page">
      <div className="app-shell">
        <Header title={'내 정보'}/>  
        <main className="shl-content">
          <h2 className="shl-h2">도움 신청 내역</h2>
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
