import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import "./ContactAdmin.css";
import logo from '../../assets/logo.png'

export default function ContactPage(){
  return (
    <div className="cp-page">
      <div className="app-shell">
        <Header title="내 정보" divider />
        <main className="cp-content">
          <h2 className="cp-title">운영진 문의</h2>
          <p className='cp-desc'>
            아래의 연락처로 연락주시면<br/> 
            운영진들이 친절히 도와드리겠습니다!<br/><br/>  
            기타 첨부파일이 있다면 <br/> 
            메시지나 이메일로 보내주세요!
          </p>
          
          <h2 className="cp-subtitle">운영진 연락처</h2>
          <section className="cp-card">
            <dl className="cp-meta">
              <div className="row">
                <dt>전화번호</dt>
                <dd>010-1234-5678</dd>
              </div>
              <div className="row">
                <dt>이메일</dt>
                <dd>qwerty1234@naver.com</dd>
              </div>
            </dl>
          </section>

          <p className="cp-logo">
            <img src={logo}alt='로고'/>
          </p>
        </main>
        <Navbar/>
      </div>
    </div>
  );
}
