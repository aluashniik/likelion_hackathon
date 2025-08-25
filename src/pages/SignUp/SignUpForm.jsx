import React from 'react'
import './SignUpForm.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import SignupModal from '../../components/SignupModal/SignupModal'

const SignUpForm = () => {
    
  const [name, setName] = useState("");
  const [birth, setBirth] = useState(null);
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const [explain, setExplain] = useState("");
  const locationNow = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const role = locationNow.state?.role || "senior";

  console.log({role});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !password || !birth || !tel){
        alert("입력되지 않은 정보가 있습니다.")
        return;
    }

    const userRoleUpperCase = role.toUpperCase();

    try{
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/signup`,
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: name,
                  phone_number: tel,
                  profile_url: null,
                  password: password,
                  user_role: userRoleUpperCase,
                  introduce: explain,
                  birth: birth,
                }),
            }
          );
          if (response.ok) {
            // 서버 응답 200이면 로그인창으로 이동
            setOpenModal(true);
            console.log(profile);
        } else {
            // 응답실패 -> 오류 메시지를 띄우기
            alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
            console.error("회원가입 실패:", response.status);
        }
    } catch (error) {
        console.error("ERROR", error);
    }
  }


  return (
    <div className='signup-form'>
        <Header title={'회원가입하기'}/>
            <div className="signup-container">
             {openModal?<SignupModal openModal={openModal} setOpenModal={setOpenModal}/>:null}
                <h1>아래의 정보를 입력해주세요!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="signup-name">
                        <h3>성명</h3>
                        <input type="text" value={name} placeholder='성명 입력' onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="signup-birth">
                        <h3>생년월일</h3>
                        <input type="date" value={birth} placeholder='생년월일 입력' onChange={(e) => setBirth(e.target.value)}/>
                    </div>
                    <div className="signup-tel">
                        <h3>전화번호</h3>
                        <input type="text" value={tel} placeholder='전화번호 입력' onChange={(e) => setTel(e.target.value)}/>
                    </div>
                    <p>** 전화번호가 귀하의 아이디로 사용됩니다!</p>
                    <div className="signup-password">
                        <h3>비밀번호</h3>
                        <input type="password" value={password} placeholder='비밀번호 입력' onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <p>** 숫자 여섯 자리를 입력해주세요!</p>
                    <div className="signup-profile">
                        <h3>프로필<br/>사진</h3>
                        <input type="file" accept='image/*' value={profile} placeholder='사진 첨부하기' onChange={(e) => setProfile(e.target.value)}/>
                    </div>
                    {role === "junior"?
                    <div className="signup-explain">
                    <h3>한줄소개</h3>
                    <input type="text" value={explain} placeholder='한줄소개 입력' onChange={(e) => setExplain(e.target.value)}/>
                    </div>
                    :<></>}
                    <div className="signup-submit">
                        <button type='submit'>회원가입하기!</button>
                    </div>
                </form>
            </div>
    </div>
  )
}

export default SignUpForm;