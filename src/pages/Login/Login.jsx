import React from 'react'
import './Login.css'
import Navbar from '../../components/Navbar/Navbar'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  const navigate = useNavigate();
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tel || !password) {
      alert("전화번호와 비밀번호를 모두 입력하세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("phone_number", tel);
      formData.append("password", password);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          method: "POST",
          credentials: 'include',
          body: formData,
        }
      );
      if (response.ok){
        navigate("/");
        console.log("로그인 성공! JSESSIONID 쿠키가 저장되었습니다.");
      }else{
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      }
      // 로그인 성공 시, accessToken을 localStorage에 저장하고 메인 페이지로 이동
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

    return (
      <div className='login' onSubmit={handleSubmit}>
        <img src={logo} alt="" className='logo-icon'/>
        <form className='login-box'>
          <input type="tel" value={tel} placeholder='전화번호' onChange={(e) => setTel(e.target.value)}/>
          <input type="password" value={password} placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)}/>
          <button type='submit' className='login-btn'>로그인하기</button>
        </form>
          <h3>온마을이 처음이라면?</h3>
          <button className='to-signup' onClick={()=>navigate('/signup')}>회원가입하기</button>
      </div>
    )
  }
export default Login