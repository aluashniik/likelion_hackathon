// // import React, { useState, useRef } from "react";
// // import Header from "../../components/Header/Header";
// // import Navbar from "../../components/Navbar/Navbar";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import "./ChatConfirm.css";
// // import { formatKoreanDateTime } from "../../utils/date";
// // import { updateChatDraft, getPresignedURL, finalizeChatRequest } from "../../api/home";
// // import howtoscreenshot from "../../assets/howtoscreenshot.png";

// // export default function ChatConfirm() {
// //   const { state } = useLocation();
// //   const navigate = useNavigate();
// //   const fileInputRef = useRef(null);

// //   const init = state?.draft ?? {
// //     device: "스마트폰",
// //     title: "",
// //     content: "",
// //     place: "",
// //     when: "",
// //     attachments: howtoscreenshot,
// //   };

// //   const [form, setForm] = useState(init);

// //   // 각 필드의 편집 여부
// //   const [edit, setEdit] = useState({
// //     device: false,
// //     title: false,
// //     content: false,
// //     place: false,
// //     when: false,
// //     attachments: false,
// //   });


// //   // const toggle = (k) => setEdit((e) => ({ ...e, [k]: !e[k] }));
// //   //"완료" 버튼을 누를 때 API를 호출하도록 toggle 함수 수정
// //   const toggle = (fieldName) => {
// //     //만약 현재 '수정 중' 상태였다면 (즉, '완료' 버튼을 누른 것이라면)
// //     if (edit[fieldName]) {
// //       //API 연동 부분
      
// //       const updateField = async () => {
// //         try {
// //           // 서버에 보낼 데이터 (수정된 필드만 포함)
// //           const payload = {
// //             [fieldName]: form[fieldName],
// //           };
// //           const res = await updateChatDraft(payload);
// //           if (res.is_success) {
// //             console.log("초안 업데이트 성공:", res.data);
// //           }
// //         } catch (error) {
// //           console.error(`${fieldName} 업데이트 실패:`, error);
// //         }
// //       };
// //       updateField();
      
// //     }
// //     setEdit((e) => ({ ...e, [fieldName]: !e[fieldName] }));
// //   };
  
// //   const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

// //   const handleAddAttachmentClick = ()=>{
// //     fileInputRef.current.click();
// //   };

// //   const handleFileChange = async(e) =>{
// //     const file = e.target.files[0];
// //     if(!file) return;
// //     // --- API 연동 부분 (주석 처리) ---
    
// //     try {
// //       // 1. Presigned URL 요청
// //       const presignRes = await getPresignedURL({ filename: file.name, content_type: file.type });
// //       if (presignRes.is_success) {
// //         const { upload_url, public_url, headers } = presignRes.data;

// //         // 2. 받은 URL로 실제 파일 업로드
// //         const uploadResult = await fetch(upload_url, { method: 'PUT', headers: headers, body: file });

// //         if (uploadResult.ok) {
// //           // 3. 업로드 성공 후, form state에 public_url 추가
// //           setForm(prev => ({ ...prev, attachments: [...prev.attachments, public_url] }));
// //         } else { throw new Error('클라우드 업로드 실패'); }
// //       } else { throw new Error('Presigned URL 발급 실패'); }
// //     } catch (error) {
// //       console.error("이미지 첨부 실패:", error);
// //       alert("이미지 첨부에 실패했습니다.");
// //     }
    
   
// //     //임시로 선택한 이미지
// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setForm(prev => ({ ...prev, attachments: [...prev.attachments, reader.result] }));
// //     };
// //     reader.readAsDataURL(file);
// //   }

// //   //첨부파일 삭제
// //   const handleRemoveAttachment = (indexToRemove) => {
// //     setForm(prev => ({
// //       ...prev,
// //       attachments: prev.attachments.filter((_, index) => index !== indexToRemove),
// //     }));
// //   };

// //   //"요청글 등록하기" 버튼 클릭 시 API를 호출하도록
// //   const submit = async () => { 
    
// //     try {
// //       const payload = {
// //         title: form.title,
// //         description: form.content,
// //         location: form.place,
// //         request_time: form.when,
// //         category_name: form.device,
// //         images: form.attachments,
// //       };

// //       const res = await finalizeChatRequest(payload);
      
// //       if (res.is_success) {
// //         navigate("/request/chatcomplete", { state: { data: res.data } });
// //       } else {
// //         throw new Error(res.message || "요청 등록에 실패했습니다.");
// //       }
// //     } catch (error) {
// //       console.error("요청글 등록 실패:", error);
// //       alert("요청글 등록에 실패했습니다. 다시 시도해주세요.");
// //     }
// //     navigate("/request/chatcomplete", { state: { data: form } });
// //   };

// //   return (
// //     <div className="hr-page">
// //       <div className="app-shell">
// //         <Header title={'채팅 내용 정리'}/>  
        
// //         <main className="cc-content">
// //           <h2 className="cc-title">요청 내용을 확인해주세요!</h2>
// //           <p className="cc-smalltitle">
// //             거의 다 왔어요!<br />
// //             챗봇이 정리한 대화 내용이에요. <br/>
// //             정보가 정확하게 입력되었는지 확인해주세요!
// //           </p>

// //           {/* 도움 요청 기기 */}
// //           <div className="cc-field device">
// //             <label>도움 요청 기기 </label>
// //             {/* 버튼 대신 라디오 스타일로 */}
// //             <div className="cc-radios" role="radiogroup" aria-label="도움 요청 기기">
// //               {["스마트폰", "텔레비전", "키오스크"].map((opt) => (
// //                 <label
// //                   key={opt}
// //                   type="button"
// //                   className={`cc-radio ${form.device === opt ? "on" : ""}`} >
// //                   <input 
// //                   type="radio"
// //                   name="device"
// //                   value={opt}
// //                   checked={form.device===opt}
// //                   onChange={()=>set("device", opt)}
// //                   />
// //                   <span>{opt}</span>
// //               </label>
// //             ))}
// //             </div>
// //           </div>

// //           {/* 제목 */}
// //           <div className="cc-field">
// //             <label>요청 제목</label>
// //             <div className="cc-value">
// //               {edit.title ? (
// //                 <input
// //                   value={form.title}
// //                   onChange={(e) => set("title", e.target.value)}
// //                   placeholder="제목 입력"
// //                 />
// //               ) : (
// //                 <span className={form.title ? "" : "empty"}>{form.title || "제목 없음"}</span>
// //               )}
// //             </div>
// //             <button className="cc-edit" onClick={() => toggle("title")}>
// //               {edit.title ? "완료" : "수정하기"}
// //             </button>
// //           </div>

// //           {/* 내용 */}
// //           <div className="cc-field">
// //             <label>요청 내용</label>
// //             <div className="cc-value">
// //               {edit.content ? (
// //                 <textarea
// //                   rows={4}
// //                   value={form.content}
// //                   onChange={(e) => set("content", e.target.value)}
// //                   placeholder="상세내용 입력"
// //                 />
// //               ) : (
// //                 <span className={form.content ? "" : "empty"}>
// //                   {form.content || "상세내용 없음"}
// //                 </span>
// //               )}
// //             </div>
// //             <button className="cc-edit" onClick={() => toggle("content")}>
// //               {edit.content ? "완료" : "수정하기"}
// //             </button>
// //           </div>

// //           {/* 위치 */}
// //           <div className="cc-field">
// //             <label>요청 위치</label>
// //             <div className="cc-value">
// //               {edit.place ? (
// //                 <input
// //                   value={form.place}
// //                   onChange={(e) => set("place", e.target.value)}
// //                   placeholder="위치 입력"
// //                 />
// //               ) : (
// //                 <span className={form.place ? "" : "empty"}>
// //                   {form.place || "위치 미입력"}
// //                 </span>
// //               )}
// //             </div>
// //             <button className="cc-edit" onClick={() => toggle("place")}>
// //               {edit.place ? "완료" : "수정하기"}
// //             </button>
// //           </div>

// //           {/* 일시 */}
// //           <div className="cc-field">
// //             <label>요청 일시</label>
// //             <div className="cc-value">
// //               {edit.when ? (
// //                 <input
// //                   type="datetime-local"
// //                   value={form.when ? form.when.slice(0, 16) : ""}
// //                   onChange={(e) =>
// //                     set("when", e.target.value ? new Date(e.target.value).toISOString() : "")
// //                   }
// //                 />
// //               ) : (
// //                 <span className={form.when ? "" : "empty"}>
// //                   {form.when ? formatKoreanDateTime(form.when) : "일시 미입력"}
// //                 </span>
// //               )}
// //             </div>
// //             <button className="cc-edit" onClick={() => toggle("when")}>
// //               {edit.when ? "완료" : "수정하기"}
// //             </button>
// //           </div>

// //           {/* 첨부 — 필요 시 확장 */}
// //           {/* <div className="cc-field">
// //             <label>사진 첨부</label>
// //             <div className="cc-value">
// //               <span className="empty">첨부 기능은 추후 연결</span>
// //             </div>
// //             <button className="cc-edit" disabled>수정하기</button>
// //           </div> */}

// //            <div className="cc-field attachments">
// //             <label>사진 첨부</label>
// //             <div className="cc-attachments-list">
// //               {form.attachments.map((imgUrl, index) => (
// //                 <div key={index} className="cc-attachment-item">
// //                   <img src={imgUrl} alt={`첨부파일 ${index + 1}`} />
// //                   <button onClick={() => handleRemoveAttachment(index)} className="cc-attachment-remove">X</button>
// //                 </div>
// //               ))}
// //               <input 
// //                 type="file"
// //                 ref={fileInputRef}
// //                 onChange={handleFileChange}
// //                 accept="image/*"
// //                 style={{ display: 'none' }}
// //               />
// //               <button onClick={handleAddAttachmentClick} className="cc-attachment-add">+</button>
// //             </div>
// //           </div>

// //           <p className="cc-presubmit">
// //             청년이 요청을 수락하면 수정 및 취소가 어려워요!<br />
// //             마지막으로 한 번 더 내용을 확인해주세요!
// //           </p>

// //           <button className="cc-submit" onClick={submit}>요청글 등록하기!</button>
// //         </main>
// //         <Navbar />
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useRef, useEffect } from "react";
// import Header from "../../components/Header/Header";
// import Navbar from "../../components/Navbar/Navbar";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./ChatConfirm.css";
// import { formatKoreanDateTime } from "../../utils/date";
// import { updateChatDraft, getPresignedURL, finalizeChatRequest } from "../../api/home";

// export default function ChatConfirm() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   // --- 💡 수정된 부분 💡 ---
//   // 1. 챗봇이 전달한 collected 데이터 구조에 맞게 초기 상태를 설정합니다.
//   const [form, setForm] = useState({
//     category_name: state?.draft?.category_name || "스마트폰",
//     title: state?.draft?.title || "",
//     description: state?.draft?.description || "",
//     location: state?.draft?.location || "",
//     request_time: state?.draft?.request_time || "",
//     images: state?.draft?.images || [],
//   });

//   const [edit, setEdit] = useState({
//     category_name: false,
//     title: false,
//     description: false,
//     location: false,
//     request_time: false,
//   });

//   // 2. '완료' 버튼 클릭 시 API 호출 로직 (변경 없음, 정상 작동)
//   const toggle = async (fieldName) => {
//     if (edit[fieldName]) {
//       try {
//         const payload = { [fieldName]: form[fieldName] };
//         const res = await updateChatDraft(payload);
//         if (res._success) {
//           console.log("초안 업데이트 성공:", res.data);
//           // 서버로부터 받은 최신 데이터로 form 상태를 업데이트합니다.
//           setForm(prev => ({ ...prev, ...res.data }));
//         }
//       } catch (error) {
//         console.error(`${fieldName} 업데이트 실패:`, error);
//       }
//     }
//     setEdit((e) => ({ ...e, [fieldName]: !e[fieldName] }));
//   };
  
//   const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

//   // 3. 파일 첨부 및 삭제 로직 (API 연동 부분 개선)
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     try {
//       const presignRes = await getPresignedURL({ filename: file.name, content_type: file.type });
//       if (presignRes._success) {
//         const { upload_url, public_url, headers } = presignRes.data;
//         const uploadResult = await fetch(upload_url, { method: 'PUT', headers, body: file });
//         if (uploadResult.ok) {
//           // 업로드 성공 후, public_url을 images 배열에 추가
//           setForm(prev => ({ ...prev, images: [...prev.images, public_url] }));
//         } else { throw new Error('클라우드 업로드 실패'); }
//       } else { throw new Error('Presigned URL 발급 실패'); }
//     } catch (error) {
//       console.error("이미지 첨부 실패:", error);
//       alert("이미지 첨부에 실패했습니다.");
//     }
//   };

//   const handleRemoveAttachment = (urlToRemove) => {
//     setForm(prev => ({
//       ...prev,
//       images: prev.images.filter(url => url !== urlToRemove),
//     }));
//   };

//   // 4. "요청글 등록하기" 버튼 클릭 시, API 명세에 맞는 데이터 전송
//   const submit = async () => { 
//     try {
//       // API 명세서와 동일한 키 이름으로 payload를 구성합니다.
//       const payload = {
//         title: form.title,
//         description: form.description,
//         location: form.location,
//         request_time: form.request_time,
//         category_name: form.category_name,
//         images: form.images,
//       };

//       const res = await finalizeChatRequest(payload);
      
//       if (res._success) {
//         navigate("/request/chatcomplete", { state: { data: res.data } });
//       } else {
//         throw new Error(res.message || "요청 등록에 실패했습니다.");
//       }
//     } catch (error) {
//       console.error("요청글 등록 실패:", error);
//       alert("요청글 등록에 실패했습니다. 다시 시도해주세요.");
//     }
//   };

//   return (
//     <div className="hr-page">
//       <div className="app-shell">
//         <Header title={'채팅 내용 정리'}/>  
//         <main className="cc-content">
//           <h2 className="cc-title">요청 내용을 확인해주세요!</h2>
//           <p className="cc-smalltitle">
//             거의 다 왔어요!<br />
//             챗봇이 정리한 대화 내용이에요. <br/>
//             정보가 정확하게 입력되었는지 확인해주세요!
//           </p>

//           {/* 도움 요청 기기 */}
//           <div className="cc-field device">
//             <label>도움 요청 기기</label>
//             <div className="cc-radios">
//               {["스마트폰", "텔레비전", "키오스크"].map((opt) => (
//                 <label key={opt} className={`cc-radio ${form.category_name === opt ? "on" : ""}`}>
//                   <input 
//                     type="radio"
//                     name="category_name"
//                     value={opt}
//                     checked={form.category_name === opt}
//                     onChange={() => set("category_name", opt)}
//                   />
//                   <span>{opt}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* 제목 */}
//           <div className="cc-field">
//             <label>요청 제목</label>
//             <div className="cc-value">
//               {edit.title ? (
//                 <input value={form.title} onChange={(e) => set("title", e.target.value)} />
//               ) : (
//                 <span className={form.title ? "" : "empty"}>{form.title || "제목 없음"}</span>
//               )}
//             </div>
//             <button className="cc-edit" onClick={() => toggle("title")}>{edit.title ? "완료" : "수정하기"}</button>
//           </div>

//           {/* 내용 */}
//           <div className="cc-field">
//             <label>요청 내용</label>
//             <div className="cc-value">
//               {edit.description ? (
//                 <textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} />
//               ) : (
//                 <span className={form.description ? "" : "empty"}>{form.description || "상세내용 없음"}</span>
//               )}
//             </div>
//             <button className="cc-edit" onClick={() => toggle("description")}>{edit.description ? "완료" : "수정하기"}</button>
//           </div>

//           {/* 위치 */}
//           <div className="cc-field">
//             <label>요청 위치</label>
//             <div className="cc-value">
//               {edit.location ? (
//                 <input value={form.location} onChange={(e) => set("location", e.target.value)} />
//               ) : (
//                 <span className={form.location ? "" : "empty"}>{form.location || "위치 미입력"}</span>
//               )}
//             </div>
//             <button className="cc-edit" onClick={() => toggle("location")}>{edit.location ? "완료" : "수정하기"}</button>
//           </div>

//           {/* 일시 */}
//           <div className="cc-field">
//             <label>요청 일시</label>
//             <div className="cc-value">
//               {edit.request_time ? (
//                 <input
//                   type="datetime-local"
//                   value={form.request_time ? form.request_time.slice(0, 16) : ""}
//                   onChange={(e) => set("request_time", e.target.value ? new Date(e.target.value).toISOString() : "")}
//                 />
//               ) : (
//                 <span className={form.request_time ? "" : "empty"}>{form.request_time ? formatKoreanDateTime(form.request_time) : "일시 미입력"}</span>
//               )}
//             </div>
//             <button className="cc-edit" onClick={() => toggle("request_time")}>{edit.request_time ? "완료" : "수정하기"}</button>
//           </div>

//           {/* 첨부파일 */}
//           <div className="cc-field attachments">
//             <label>사진 첨부</label>
//             <div className="cc-attachments-list">
//               {form.images.map((imgUrl, index) => (
//                 <div key={index} className="cc-attachment-item">
//                   <img src={imgUrl} alt={`첨부파일 ${index + 1}`} />
//                   <button onClick={() => handleRemoveAttachment(imgUrl)} className="cc-attachment-remove">X</button>
//                 </div>
//               ))}
//               <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
//               <button onClick={() => fileInputRef.current.click()} className="cc-attachment-add">+</button>
//             </div>
//           </div>

//           <p className="cc-presubmit">
//             청년이 요청을 수락하면 수정 및 취소가 어려워요!<br />
//             마지막으로 한 번 더 내용을 확인해주세요!
//           </p>
//           <button className="cc-submit" onClick={submit}>요청글 등록하기!</button>
//         </main>
//         <Navbar />
//       </div>
//     </div>
//   );
// }


import React, { useState, useRef } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import "./ChatConfirm.css";
import { formatKoreanDateTime } from "../../utils/date";
import { updateChatDraft, getPresignedURL, finalizeChatRequest } from "../../api/home";

// --- 💡 수정된 부분 💡 ---
// 1. 카테고리 이름(string)을 ID(number)로 변환하기 위한 맵을 만듭니다.
const categoryMap = {
  "스마트폰": 1,
  "텔레비전": 2,
  "키오스크": 3,
};

export default function ChatConfirm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 이전 페이지(채팅)에서 전달받은 챗봇의 수집 데이터로 초기 상태를 설정합니다.
  const [form, setForm] = useState({
    category_name: state?.draft?.category_name || "스마트폰",
    title: state?.draft?.title || "",
    description: state?.draft?.description || "",
    location: state?.draft?.location || "",
    request_time: state?.draft?.request_time || "",
    images: state?.draft?.images || [],
  });

  const [edit, setEdit] = useState({
    category_name: false,
    title: false,
    description: false,
    location: false,
    request_time: false,
  });

  // '완료' 버튼 클릭 시, 수정된 내용을 서버 초안에 업데이트하는 함수 (정상 작동)
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

  // 파일 첨부 및 삭제 로직 (정상 작동)
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

  // 2. "요청글 등록하기" 버튼 클릭 시, API 명세에 맞는 최종 데이터를 전송합니다.
  const submit = async () => { 
    try {
      // 채팅 페이지에서 저장한 session_id를 가져옵니다.
      const sessionId = sessionStorage.getItem("chat:sessionId");
      if (!sessionId) {
        alert("채팅 세션 정보가 없습니다. 다시 시도해주세요.");
        navigate("/request/chat"); // 채팅 페이지로 돌려보내기
        return;
      }

      // API 명세서와 동일한 키 이름으로 payload를 구성합니다.
      const payload = {
        session_id: sessionId,
        title: form.title,
        description: form.description,
        location: form.location,
        request_time: form.request_time,
        // category_name을 category_id로 변환하여 전송합니다.
        category_id: categoryMap[form.category_name] || 1,
        images: form.images,
      };

      const res = await finalizeChatRequest(payload);
      
      if (res._success) {
        // 요청이 성공적으로 생성되면, 세션 정보를 삭제하고 완료 페이지로 이동합니다.
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

          {/* 도움 요청 기기 */}
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

          {/* 제목 */}
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

          {/* 내용 */}
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

          {/* 위치 */}
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

          {/* 일시 */}
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

          {/* 첨부파일 */}
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
