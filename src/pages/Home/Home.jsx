import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { getHome } from '../../api/home';
import logo from '../../assets/logo.png';
import requesticon from '../../assets/Chat.png';
import listicon from '../../assets/Document.png';

export default function Home() {
  const nav = useNavigate();
  const [role, setRole] = useState(null);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const res = await getHome(); 
        if (res._success === true && res.data) {
          const userRole = res.data.role?.toLowerCase() || 'guest';
          setRole(userRole);
          localStorage.setItem('userRole', userRole); // 역할 저장
          if (userRole === 'senior') {
            setActions(res.data.homeActions || []);
          }
        } else {
          setRole('guest');
          localStorage.setItem('userRole', 'guest');
        }
      } catch (e) {
        console.error("홈 정보를 가져오는 데 실패했습니다.", e);
        setRole('guest');
        localStorage.setItem('userRole', 'guest');
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  // junior일 경우, 요청 목록 페이지로 바로 이동
  useEffect(() => {
    if (!loading && role === "junior") {
      nav("/list");
    }
  }, [loading, role, nav]);

  // 로딩 중이거나 청년이라서 리다이렉트 될 경우, 화면을 그리지 않음
  if (loading || role === 'junior') {
    return <div className="home-status">로딩 중…</div>;
  }

  // senior일 경우의 화면
  return (
    <div className="home">
      <div className="home-header">
        <img className="logo" src={logo} alt="logo"/>
      </div>
      <div className="home-body">
        {/* senior일 때 버튼이 보이도록 조건을 명확하게 수정 */}
        {(role === 'senior') && (
          <>
            <Button
              title="청년에게 도움받기"
              desc={`챗봇이 도움요청을\n도와드려요!`}
              type="request"
              highlight
              icon={requesticon}
              onClick={() => nav("/request/chat")}
            />
            <Button
              title="도움 요청 목록"
              desc={`다른 분들이 요청한\n도움이에요!`}
              type="list"
              icon={listicon}
              onClick={() => nav("/list")}
            />
          </>
        )}

        {/* guest이면 어떡할까..? */}
        {role === "guest"  && (
          <div className="home-actions">
            로그인 해주세요
            <Button onClick={nav('/login')}/>
          </div>
        )} 
      </div>
      <Navbar />
    </div>
  );
};


