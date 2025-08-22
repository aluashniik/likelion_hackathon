import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import "./Chat.css";
import { formatTodayTitle } from "../../utils/date";
import { makeDraftFromMessages } from "../../utils/draft";
import { useNavigate } from "react-router-dom";
import { prepareChat, sendChatMessage, getPresignedURL } from "../../api/home";
import sendicon from "../../assets/send.png";

export default function Chat() {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true); 

  const [sessionId, setSessionId] = useState(null);
  const [chatData, setChatData] = useState(null);
  const listRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // 채팅창 초기화
  useEffect(() => {
    const initChat = async () => {
      try {
        setLoading(true);
        //API 연동 부분
        /*
        const res = await prepareChat();
        if (res.is_success && res.data) {
          setSessionId(res.data.session_id);
          const initialBotMessage = {
            id: Date.now(),
            who: "bot",
            t: res.data.greeting, 
            quickReplies: res.data.suggested_chats || [],
          };
          setMsgs([initialBotMessage]);
        }
        */

        // 목업 초기 메시지
        const mockInitialMessage = {
          id: 1, 
          who: "bot", 
          t: (
            <>
              <strong>안녕하세요!</strong>
              {"\n무엇을 도와드릴까요?\n도움 요청 기기, 일시, 장소를 알려주세요!\n+ 를 누르면 사진을 첨부할 수 있어요!"}
            </>
          ),
          quickReplies: [
            "핸드폰 화면 녹화하는 방법을 알려주세요!",
            "어플을 다운로드 받고싶어요!",
          ],
        };
        setMsgs([mockInitialMessage]);
        setSessionId("mock_session_123");

      } catch (error) {
        console.error("채팅 초기화에 실패했습니다.", error);
        const errorMessage = { id: Date.now(), who: "bot", t: "오류가 발생했습니다. 잠시 후 다시 시도해주세요." };
        setMsgs([errorMessage]);
      } finally {
        setLoading(false);
      }
    };
    initChat();
  }, []);

  //send 함수가 메시지를 인자로 받도록 수정
  const send = async (messageToSend) => {
    const userMessageText = messageToSend.trim();
    if (!userMessageText) return;

    const userMessage = { 
      id: Date.now(), 
      who: "user", 
      t: userMessageText 
    };
    
    setMsgs(prev => [...prev, userMessage]);
    setText("");

    //API 연동 부분
    /*
    try {
      const res = await sendChatMessage(sessionId, userMessageText);
      if (res.is_success && res.data) {
        setChatData(res.data); 
        const botMessage = {
          id: Date.now() + 1,
          who: 'bot',
          t: res.data.bot_reply,
        };
        setMsgs(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("메시지 전송에 실패했습니다.", error);
      const errorMessage = { id: Date.now() + 1, who: 'bot', t: '오류가 발생했습니다.' };
      setMsgs(prev => [...prev, errorMessage]);
    }
    */
  };

  const handleQuickReply = (qrText) => {
    send(qrText);
  };

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs.length]);

  const handleSummarize = () => {
    const draft = makeDraftFromMessages(msgs);
    navigate("/request/chatconfirm", { state: { draft } });
  };

  //파일 첨부 클릭시
  const handleAttachClick = () =>{
    fileInputRef.current.click();
  };

  // 파일 선택 시 업로드 프로세스 실행
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // API 연동 부분
    /*
    try {
      // 1단계: Presigned URL 요청
      const presignRes = await getPresignedUrl({
        filename: file.name,
        content_type: file.type,
      });

      if (presignRes.is_success && presignRes.data) {
        const { upload_url, public_url, headers } = presignRes.data;

        //2단계: 받은 URL로 실제 파일 업로드 (PUT 요청)
        const uploadResult = await fetch(upload_url, {
          method: 'PUT',
          headers: headers, // 서버가 지정해준 헤더 사용
          body: file,
        });

        if (uploadResult.ok) {
          //3단계: 업로드 성공 후, 채팅창에 이미지 메시지 추가
          const imageMessage = {
            id: Date.now(),
            who: 'user',
            t: <img src={public_url} alt="첨부 이미지" className="chat-image" />,
          };
          setMsgs(prev => [...prev, imageMessage]);
        } else {
          throw new Error('클라우드 업로드 실패');
        }
      } else {
        throw new Error('Presigned URL 발급 실패');
      }
    } catch (error) {
      console.error("이미지 첨부 실패:", error);
      alert("이미지 첨부에 실패했습니다.");
    }
    */
    
    //임시로 선택한 이미지를 미리보기로 보여주는 로직 
    const reader = new FileReader();
    reader.onloadend = () => {
       const imageMessage = {
        id: Date.now(),
        who: 'user',
        t: <img src={reader.result} alt="첨부 이미지" className="chat-image" />,
      };
      setMsgs(prev => [...prev, imageMessage]);
    };
    reader.readAsDataURL(file);
  };
  

  return (
    <div className="hr-page">
      <div className="app-shell chat-shell">
        <Header title="채팅" divider />
        <main ref={listRef} className="chat-content">
          <div className="chat-date">{formatTodayTitle()}</div>
          {loading ? (
            <div className="chat-loading">대화 준비 중...</div>
          ) : (
            msgs.map(m => (
              <div key={m.id} className={`chat-row ${m.who === "user" ? "me" : "bot"}`}>
                <div className="chat-bubble">{m.t}</div>
                {m.who === "bot" && m.quickReplies?.length > 0 && (
                  <div className="chat-qr">
                    {m.quickReplies.map((qr, i) => (
                      <button
                        key={i}
                        type="button"
                        className="chat-qr-btn"
                        onClick={() => handleQuickReply(qr)}
                      >{qr}</button>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </main>
        {/* ***************** */}
        <div className="chat-composer">
          {/* <button className="chat-attach" aria-label="첨부">+</button> */}
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button className="chat-attach" aria-label="첨부" onClick={handleAttachClick}>+</button>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="메시지를 입력하세요"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(text);
              } 
            }} />
          <button className="chat-send" onClick={() => send(text)} aria-label="전송">
            <img className="send-icon" src={sendicon} />
          </button>
          <button className="chat-summarize" onClick={handleSummarize}>정리하기</button>
        </div>
      </div>
    </div>
  );
}
