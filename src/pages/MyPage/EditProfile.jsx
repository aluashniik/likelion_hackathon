import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import profilephoto from '../../assets/profilephoto.png';
import { getMyProfile, updateMyProfile, updateMyPassword, updateMyProfileImage } from "../../api/mypage"; 

export default function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); 

  //화면에 표시될 이미지와, API로 보낼 실제 파일 객체
  const [profileImage, setProfileImage] = useState(profilephoto); // 미리보기용 이미지 URL
  const [imageFile, setImageFile] = useState(null); // API 전송용 파일 객체

  const [form, setForm] = useState({
    name: "",
    birthdate: "",
    phone: "",
    introduce: "",
    /* 비밀번호 관련해서 다시 논의가 필요할듯 */
    currentPassword: "", 
    newPassword: "", 
  });
  const [loading, setLoading] = useState(true);
  
  //목업 데이터
  useEffect(() => {
    const currentUser = {
      name: "김민지",
      birthdate: "1955-01-01",
      phone: "010-1234-5678",
      introduce: "한줄소개한줄소개",
    };
    setForm(prev => ({
      ...prev,
      name: currentUser.name,
      birthdate: currentUser.birthdate,
      phone: currentUser.phone,
      introduce: currentUser.introduce,
    }));
    setLoading(false); 
  }, []);

  const [edit, setEdit] = useState({
    name: false,
    birthdate: false,
    phone: false,
    password: false,
    introduce: false,
  });

  const toggleEdit = (fieldName) => {
    setEdit((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //사진 '수정하기' 버튼 클릭 이벤트 핸들러
  const handlePhotoEditClick = () => {
    fileInputRef.current.click();
  };

  //파일이 선택되었을 때의 이벤트 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
    
    //API로 보낼 파일 객체를 state에 저장
    setImageFile(file);
  };

  //저장 버튼 클릭 시 이미지 업로드 로직 추가
  /*
  const handleSubmit = async () => {
    try {
      // 텍스트 정보 업데이트
      const profileData = { name: form.name, introduce: form.introduce };
      await updateMyProfile(profileData);

      //비밀번호 업데이트
      if (form.currentPassword && form.newPassword) {
        await updateMyPassword({
          current_password: form.currentPassword,
          new_password: form.newPassword,
        });
      }

      //이미지 파일이 새로 선택되었을 경우에만 이미지 업로드
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        await updateMyProfileImage(formData);
      }

      alert("변경사항이 성공적으로 저장되었습니다.");
      navigate("/mypage");

    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("정보 저장에 실패했습니다.");
    }
  };
  */

  const handleSubmit = () => {
    console.log("저장할 데이터 (목업):", form);
    if (imageFile) {
      console.log("저장할 이미지 파일 (목업):", imageFile.name);
    }
    navigate("/mypage");
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="hr-page">
      <div className="app-shell">
      <Header title={'내 정보'}/>    
        <main className="ep-content">
          <h2 className="ep-title">프로필 수정하기</h2>
          
          <div className="ep-card">
            <div className="ep-field photo">
              <label>사진</label>
              <div className="ep-photo-area">
                <img src={profileImage} alt="프로필 사진" />
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }} 
                />
                <button className="ep-photo-edit" onClick={handlePhotoEditClick}>
                  수정하기
                </button>
              </div>
            </div>

            <div className="ep-field">
              <label>성명</label>
              <div className="ep-value">
                {edit.name ? (
                  <input name="name" value={form.name} onChange={handleChange} />
                ) : (
                  <span>{form.name}</span>
                )}
              </div>
              <button className="ep-edit-btn" onClick={() => toggleEdit("name")}>
                {edit.name ? "완료" : "수정하기"}
              </button>
            </div>
            
            <div className="ep-field">
              <label>생년월일</label>
              <div className="ep-value">
                {edit.birthdate ? (
                  <input type="date" name="birthdate" value={form.birthdate} onChange={handleChange} />
                ) : (
                  <span>{form.birthdate}</span>
                )}
              </div>
              <button className="ep-edit-btn" onClick={() => toggleEdit("birthdate")}>
                {edit.birthdate ? "완료" : "수정하기"}
              </button>
            </div>

            <div className="ep-field">
              <label>전화번호</label>
              <div className="ep-value">
                <span>{form.phone}</span>
              </div>
            </div>
            <p className="ep-notice">** 전화번호가 귀하의 아이디로 사용됩니다!</p>

            <div className="ep-field password">
              <label>비밀번호</label>
              <div className="ep-value">
                {edit.password ? (
                  <div className="password-inputs">
                    <input 
                      type="password" 
                      name="currentPassword" 
                      value={form.currentPassword} 
                      onChange={handleChange} 
                      placeholder="현재 비밀번호"
                    />
                    <input 
                      type="password" 
                      name="newPassword" 
                      value={form.newPassword} 
                      onChange={handleChange} 
                      placeholder="새 비밀번호"
                    />
                  </div>
                ) : (
                  <span>******</span>
                )}
              </div>
              <button className="ep-edit-btn" onClick={() => toggleEdit("password")}>
                {edit.password ? "완료" : "수정하기"}
              </button>
            </div>
            <p className="ep-notice">** 숫자 여섯 자리를 입력해주세요!</p>
            
            <div className="ep-field">
              <label>한줄소개</label>
              <div className="ep-value">
                {edit.introduce ? (
                  <input name="introduce" value={form.introduce} onChange={handleChange} />
                ) : (
                  <span>{form.introduce}</span>
                )}
              </div>
              <button className="ep-edit-btn" onClick={() => toggleEdit("introduce")}>
                {edit.introduce ? "완료" : "수정하기"}
              </button>
            </div>
          </div>

          <button className="ep-submit-btn" onClick={handleSubmit}>
            변경사항 저장하기!
          </button>
        </main>
        <Navbar />
      </div>
    </div>
  );
}