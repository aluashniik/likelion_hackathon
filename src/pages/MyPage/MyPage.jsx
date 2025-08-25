import React, { useEffect, useState } from 'react';
import './MyPage.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import profilephoto from '../../assets/profilephoto.png';

export default function MyPage(){
  const nav = useNavigate();
  
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/mypage`,
          {
            method: "GET",
            credentials: 'include',
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            nav('/login');
          }
          throw new Error("something went wrong");
        }

        const data = await response.json();
        
        if (data._success && data.data) {
          setUserData(data.data);
          setRole(data.data.user_role || localStorage.getItem('userRole') || 'guest');
          //console.log(data.user_role);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, [nav]); // nav를 의존성 배열에 추가

  const menusByRole = {
    senior: [
      { key: 'help-requests', label: '도움 신청 내역', to: '/mypage/help-requests' },
      { key: 'class-applied', label: '수업 신청 내역', to: '/mypage/class-applied' },
      { key: 'class-opened', label: '수업 개설 내역', to: '/mypage/class-opened' },
      { key: 'contact-admin', label: '운영진 문의', to: '/mypage/contact' },
    ],
    junior: [
      { key: 'accepted-requests', label: '도움 수락 내역', to: '/mypage/accepted-requests' },
      { key: 'class-opened', label: '수업 개설 내역', to: '/mypage/class-opened' },
      { key: 'class-applied', label: '수업 신청 내역', to: '/mypage/class-applied' },
      { key: 'my-reviews', label: '내가 받은 후기', to: '/mypage/reviews' },
      { key: 'contact-admin', label: '운영진 문의', to: '/mypage/contact' },
    ],
    guest: [
      { key: 'contact-admin', label: '운영진 문의', to: '/mypage/contact' },
    ],
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!userData) {
    return <div>프로필 정보를 불러올 수 없습니다.</div>;
  }
  
  // 💡 4. state에 저장된 role을 사용해서 메뉴를 결정합니다.
  const menus = menusByRole[role] || menusByRole.guest;

  return (
    <div className='hr-page'>
      <div className='app-shell'>
        <Header title={'내 정보'}/> 
        <main className='mp-content'>
          <div className='mp-head'>
            <div className='mp-uptext'>내 프로필</div>
            <button className='mp-cta' onClick={() => nav('/mypage/edit')}>수정하기</button>
          </div>

          <section className='mp-card'>
            <img className='mp-avatar' src={userData.profile_url || profilephoto} alt="내 프로필 사진" /> 
            <div className='mp-info'>
              <div className="mp-name">
                {userData.user_name}
                {role === 'junior' && ' 청년'}
                {role === 'senior' && ' 어르신'}
              </div> 
              <div className="mp-intro">{userData.user_introduce}</div>
              <div className="mp-phone">{userData.user_phonenumber}</div>
            </div>
          </section>

          <nav className="mp-list">
            {menus.map(m => (
              <button key={m.key} className="mp-item" onClick={() => nav(m.to)}>
                <span>{m.label}</span><span className="chev">›</span>
              </button>
            ))} 
          </nav>
        </main>
      </div>
      <Navbar />
    </div>
  );
};

