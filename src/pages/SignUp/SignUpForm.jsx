import React from 'react'
import './SignUpForm.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SignUpForm = () => {
    
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const [explain, setExplain] = useState("");
  const navigate = useNavigate();
  const locationNow = useLocation();
  const role = locationNow.state?.role || "senior";

  console.log({role});

  return (
    <div className='signup-form'>
        <Header title={'회원가입하기'}/>
            <div className="signup-container">
                <h1>아래의 정보를 입력해주세요!</h1>
                <form>
                    <div className="signup-name">
                        <h3>성명</h3>
                        <input type="text" value={name} placeholder='성명 입력' onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="signup-birth">
                        <h3>생년월일</h3>
                        <input type="date" value={birth} placeholder='상세내용 입력' onChange={(e) => setBirth(e.target.value)}/>
                    </div>
                    <div className="signup-tel">
                        <h3>전화번호</h3>
                        <input type="text" value={tel} placeholder='위치 입력' onChange={(e) => setTel(e.target.value)}/>
                    </div>
                    <p>** 전화번호가 귀하의 아이디로 사용됩니다!</p>
                    <div className="signup-password">
                        <h3>비밀번호</h3>
                        <input type="password" value={password} placeholder='일시 입력' onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <p>** 숫자 여섯 자리를 입력해주세요!</p>
                    <div className="signup-profile">
                        <h3>프로필<br/>사진</h3>
                        <input type="file" accept='image/*' placeholder='사진 첨부하기' />
                    </div>
                    {role === "junior"?
                    <div className="signup-explain">
                    <h3>한줄소개</h3>
                    <input type="text" value={explain} placeholder='한줄소개 입력' onChange={(e) => setExplain(e.target.value)}/>
                    </div>
                    :<></>}
                    <div className="signup-submit">
                        <button onClick={()=>navigate('/signup/form/login')}>회원가입하기!</button>
                    </div>
                </form>
            </div>
    </div>
  )
}

export default SignUpForm;