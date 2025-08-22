import React, { useMemo, useState, useEffect } from "react"; 
import "./HelpRequests.css";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { getHelpRequests } from "../../api/home"; 
import vector from '../../assets/Vector.png'
import { formatKoreanDateTime } from "../../utils/date";

const mock = [
  {
    id: 1,
    title: "핸드폰 화면 녹화하는 방법을 알려주세요!",
    place: "신수동 1번지",
    time: "2025-08-07T15:00:00",
    device: "스마트폰",
  },
  {
    id: 2,
    title: "사진 보정하는 기본 기능 알려주세요",
    place: "마포구청 근처",
    time: "2025-08-07T15:00:00",
    device: "스마트폰",
  },
  {
    id: 3,
    title: "카카오톡 사진 보내기/저장하기가 헷갈려요",
    place: "대흥역 3번 출구",
    time: "2025-08-08T10:30:00",
    device: "스마트폰",
  },
  {
    id: 4,
    title: "동영상 자막 넣는 쉬운 방법 있을까요?",
    place: "신촌역 4번 출구",
    time: "2025-08-09T14:00:00",
    device: "스마트폰",
  },
  {
    id: 5,
    title: "앱 설치 도와주세요",
    place: "서강대역 1번출구",
    time: "2025-08-09T12:30:00",
    device: "스마트폰",
  },
];


function RequestCard({ item, onClick }) {
  return (
    <button className="hr-card" onClick={() => onClick?.(item)}>
      <div className="hr-card-title">{item.title}</div>
      <ul className="hr-meta">
        <li><b>장소</b> {item.place}</li>
        <li><b>일정</b> {formatKoreanDateTime(item.time)}</li>
        <li><b>기기</b> {item.device}</li>
      </ul>
    </button>
  );
}

export default function HelpRequests() {
  const [q, setQ] = useState("");
  const navigate = useNavigate(); 
  const location = useLocation(); 

  /*
  const [apiList, setApiList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getHelpRequests({ q: q });
        if (res.is_success) {
          setApiList(res.data || []);
        }
      } catch (error) {
        console.error("도움 요청 목록을 불러오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [q]);

  if (loading) {
    return <div>목록을 불러오는 중...</div>;
  }
  */

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return mock;
    return mock.filter(it =>
      it.title.toLowerCase().includes(s) || it.place.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <div className="hr-page">
      <div className="app-shell">
      <Header title={'도움 요청 목록'}/>  
        <main className="hr-content">
          <div className="hr-search">
            <img className="hr-search-icon" src={vector} alt="vector"/>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="제목이나 내용으로 검색해보세요!"
            />
            {q && (
              <button className="hr-clear" onClick={() => setQ("")}>✕</button>
            )}
          </div>

          <div className="hr-list">
            {/*API 연동 시에는 list 대신 apiList */}
            {list.map((item) => (
              <RequestCard
                key={item.id}
                item={item}
                onClick={(it) => {
                  sessionStorage.setItem('hr:lastItem', JSON.stringify(it));
                  navigate(`/list/details`, { state: it });
                }}
              />
            ))}
          </div>
        </main>
        <Navbar />
      </div>
    </div>
  );
}
