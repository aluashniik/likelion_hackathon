import React, { useState, useRef } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import "./ChatConfirm.css";
import { formatKoreanDateTime } from "../../utils/date";
import { updateChatDraft, getPresignedURL, finalizeChatRequest } from "../../api/home";

const categoryMap = {
  "스마트폰": 1,
  "텔레비전": 2,
  "키오스크": 3,
};

export default function ChatConfirm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    category_name: state?.draft?.category_name || "스마트폰",
    title: state?.draft?.title || "",
    description: state?.draft?.description || "",
    location: state?.draft?.location || "",
    request_time: state?.draft?.request_time || "",
    images: state?.draft?.images || [],
  });

  const [edit, setEdit] = useState({
    title: false,
    description: false,
    location: false,
    request_time: false,
  });

  const toggle = async (fieldName) => {
    if (edit[fieldName]) {
      try {
        const payload = { [fieldName]: form[fieldName] };
        const res = await updateChatDraft(payload);
        if (res._success) {
          console.log("초안 업데이트 성공:", res.data);
          setForm(prev => ({ ...prev, ...res.data }));
        }
      } catch (error) {
        console.error(`${fieldName} 업데이트 실패:`, error);
      }
    }
    setEdit((e) => ({ ...e, [fieldName]: !e[fieldName] }));
  };
  
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const presignRes = await getPresignedURL({ filename: file.name, content_type: file.type });
      if (presignRes._success) {
        const { upload_url, public_url, headers } = presignRes.data;
        const uploadResult = await fetch(upload_url, { method: 'PUT', headers, body: file });
        if (uploadResult.ok) {
          setForm(prev => ({ ...prev, images: [...prev.images, public_url] }));
        } else { throw new Error('클라우드 업로드 실패'); }
      } else { throw new Error('Presigned URL 발급 실패'); }
    } catch (error) {
      alert("이미지 첨부에 실패했습니다.");
    }
  };

  const handleRemoveAttachment = (urlToRemove) => {
    setForm(prev => ({ ...prev, images: prev.images.filter(url => url !== urlToRemove) }));
  };

  const submit = async () => { 
    try {
      const sessionId = sessionStorage.getItem("chat:sessionId");
      if (!sessionId) {
        alert("채팅 세션 정보가 없습니다. 다시 시도해주세요.");
        navigate("/request/chat");
        return;
      }

      const payload = {
        session_id: sessionId,
      };

      const res = await finalizeChatRequest(payload);
      
      if (res._success) {
        sessionStorage.removeItem("chat:sessionId");
        navigate("/request/chatcomplete", { state: { data: res.data, draft: form } });
      } else {
        throw new Error(res.message || "요청 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("요청글 등록 실패:", error);
      alert("요청글 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="hr-page">
      <div className="app-shell">
        <Header title={'채팅 내용 정리'}/>  
        <main className="cc-content">
          <h2 className="cc-title">요청 내용을 확인해주세요!</h2>
          <p className="cc-smalltitle">
            거의 다 왔어요!<br />
            챗봇이 정리한 대화 내용이에요. <br/>
            정보가 정확하게 입력되었는지 확인해주세요!
          </p>

          <div className="cc-field device">
            <label>도움 요청 기기</label>
            <div className="cc-radios">
              {["스마트폰", "텔레비전", "키오스크"].map((opt) => (
                <label key={opt} className={`cc-radio ${form.category_name === opt ? "on" : ""}`}>
                  <input 
                    type="radio"
                    name="category_name"
                    value={opt}
                    checked={form.category_name === opt}
                    onChange={() => set("category_name", opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="cc-field">
            <label>요청 제목</label>
            <div className="cc-value">
              {edit.title ? (
                <input value={form.title} onChange={(e) => set("title", e.target.value)} />
              ) : (
                <span className={form.title ? "" : "empty"}>{form.title || "제목 없음"}</span>
              )}
            </div>
            <button className="cc-edit" onClick={() => toggle("title")}>{edit.title ? "완료" : "수정하기"}</button>
          </div>

          <div className="cc-field">
            <label>요청 내용</label>
            <div className="cc-value">
              {edit.description ? (
                <textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} />
              ) : (
                <span className={form.description ? "" : "empty"}>{form.description || "상세내용 없음"}</span>
              )}
            </div>
            <button className="cc-edit" onClick={() => toggle("description")}>{edit.description ? "완료" : "수정하기"}</button>
          </div>

          <div className="cc-field">
            <label>요청 위치</label>
            <div className="cc-value">
              {edit.location ? (
                <input value={form.location} onChange={(e) => set("location", e.target.value)} />
              ) : (
                <span className={form.location ? "" : "empty"}>{form.location || "위치 미입력"}</span>
              )}
            </div>
            <button className="cc-edit" onClick={() => toggle("location")}>{edit.location ? "완료" : "수정하기"}</button>
          </div>

          <div className="cc-field">
            <label>요청 일시</label>
            <div className="cc-value">
              {edit.request_time ? (
                <input
                  type="datetime-local"
                  value={form.request_time ? form.request_time.slice(0, 16) : ""}
                  onChange={(e) => set("request_time", e.target.value ? new Date(e.target.value).toISOString() : "")}
                />
              ) : (
                <span className={form.request_time ? "" : "empty"}>{form.request_time ? formatKoreanDateTime(form.request_time) : "일시 미입력"}</span>
              )}
            </div>
            <button className="cc-edit" onClick={() => toggle("request_time")}>{edit.request_time ? "완료" : "수정하기"}</button>
          </div>

          <div className="cc-field attachments">
            <label>사진 첨부</label>
            <div className="cc-attachments-list">
              {form.images.map((imgUrl, index) => (
                <div key={index} className="cc-attachment-item">
                  <img src={imgUrl} alt={`첨부파일 ${index + 1}`} />
                  <button onClick={() => handleRemoveAttachment(imgUrl)} className="cc-attachment-remove">X</button>
                </div>
              ))}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
              <button onClick={() => fileInputRef.current.click()} className="cc-attachment-add">+</button>
            </div>
          </div>

          <p className="cc-presubmit">
            청년이 요청을 수락하면 수정 및 취소가 어려워요!<br />
            마지막으로 한 번 더 내용을 확인해주세요!
          </p>
          <button className="cc-submit" onClick={submit}>요청글 등록하기!</button>
        </main>
        <Navbar />
      </div>
    </div>
  );
}
