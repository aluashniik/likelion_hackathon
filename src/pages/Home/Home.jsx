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
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const [role, setRole] = useState(null);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  //API 연동을 위한 useEffect 
  /*
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const res = await getHome(); 

        if (res.is_success && res.data) {
          const userRole = res.data.role || 'guest';
          setRole(userRole);
          if (userRole === 'senior') {
            setActions(res.data.homeActions || []);
          }
        }
      } catch (e) {
        // 토큰이 없어서 401 에러가 나는 등 API 호출에 실패하면 'guest'로 처리
        console.error("홈 정보를 가져오는 데 실패했습니다.", e);
        setRole('guest');
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);
  */


  useEffect(() => {
    //?role=senior 또는 ?role=junior
    const mockRole = params.get('role') || 'senior'; //기본값을 'senior'로 설정
    setRole(mockRole);
    setLoading(false);
  }, [search]); 


  //청년(junior)일 경우, 요청 목록 페이지로 바로 이동
  useEffect(() => {
    if (!loading && role === "junior") {
      nav("/list");
    }
  }, [loading, role, nav]);

  //로딩 중이거나 청년이라서 리다이렉트 될 경우, 화면을 그리지 않음
  if (loading || role === 'junior') {
    return <div className="home-status">로딩 중…</div>;
  }

  //어르신(senior) 또는 게스트(guest)일 경우의 화면
  return (
    <div className="home">
      <div className="home-header">
        <img className="logo" src={logo} alt="logo"/>
      </div>
      <div className="home-body">

        {role === 'senior' && (
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

        {/* 게스트일 경우 */}
        {role === 'guest' && (
          <>
            {/* 지금은 어르신과 동일한 버튼을 보여주도록 설정 */}
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
            {/* ******************** */}
          </>
        )}

        {/* 서버가 내려준 추가 액션 버튼 (어르신 전용) */}
        {role === "senior" && actions.length > 0 && (
          <div className="home-actions">
            {actions.map((a) => (
              <Button
                key={a.title}
                title={a.title}
                desc={a.subtitle}
                type="dynamic"
                onClick={() => nav(a.route)}
              />
            ))}
          </div>
        )}
      </div>
      <Navbar />
    </div>
  );
};

