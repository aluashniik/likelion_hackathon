//import React, { useLayoutEffect } from 'react'
import './MyPage.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import {getMyProfile} from '../../api/mypage';
import { useEffect, useState } from 'react';
import profilephoto from '../../assets/profilephoto.png';

export default function MyPage(){
  const nav = useNavigate();
  const {search} = useLocation();
  const params=new URLSearchParams(search);

  const role = params.get("role")
  ||localStorage.getItem("ROLE") 
  ||localStorage.getItem("MOCK_HOME")
  ||"guest";
  
  const me={
    name: "OOO 청년",
    intro: "한 줄 소개 한 줄 소개",
    phone: "010-1234-5678",
  };

  //API 데이터를 저장할 state
  /*const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        if (res.is_success) {
          setUserData(res); // 성공 시, 응답 데이터 전체를 state에 저장
        }
      } catch (error) {
        console.error("프로필 정보를 가져오는 데 실패했습니다.", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchProfile();
  }, []);*/

  const menusByRole={
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
      // 게스트는 최소 메뉴 or 로그인 유도
      { key: 'contact-admin', label: '운영진 문의', to: '/mypage/contact' },
    ],
  };

  const menus=menusByRole[role]||menusByRole.guest;

  // if (loading) {
  //   return <div>로딩 중...</div>;
  // }
  // //데이터가 없을 때
  // if (!userData) {
  //   return <div>프로필 정보를 불러올 수 없습니다.</div>
  // }

  return (
    <div className='hr-page'>
      <div className='app-shell'>
      <Header title={'내 정보'}/>  
      <main className='mp-content'>

        <div className='mp-head'>
          <div className='mp-uptext'>내 프로필</div>
          {/* <button className='mp-cta'>수정하기</button> */}
          <button className='mp-cta' onClick={()=>nav('/mypage/edit' + (params.get('role') ? `?role=${params.get('role')}`:''))}>수정하기</button>
        </div>

        <section className='mp-card'>
          <img className='mp-avatar' src={profilephoto} alt="내 프로필 사진" /> 
          <div className='mp-info'>
            {/* <div className="mp-name">{userData.user_name}</div>
            <div className="mp-intro">{userData.user_introduce}</div>
            <div className="mp-phone">{userData.user_phonenumber}</div> */}
            <div className="mp-name">{me.name}</div>
            <div className="mp-intro">{me.intro}</div>
            <div className="mp-phone">{me.phone}</div>
          </div>
        </section>

        <nav className="mp-list">
           {menus.map(m => (
              <button key={m.key} className="mp-item" onClick={()=>nav(m.to + (params.get('role') ? `?role=${params.get('role')}`:''))}>
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