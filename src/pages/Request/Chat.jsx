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
  const listRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // 채팅창 초기화
  useEffect(() => {
    const initChat = async () => {
      try {
        setLoading(true);
        const res = await prepareChat();

        if ((res.is_success || res._success) && res.data) {
          setSessionId(res.data.session_id);

          const greetingText = res.data.greeting || "안녕하세요! 무엇을 도와드릴까요?";
          const tipsText = res.data.tips ? res.data.tips.join("\n") : "";
          const fullGreeting = `${greetingText}\n${tipsText}`;

          const initialBotMessage = {
            id: Date.now(),
            who: "bot",
            t: fullGreeting,
            quickReplies: res.data.suggested_chats || [],
          };
          setMsgs([initialBotMessage]);
        } else {
          throw new Error(res.message || "채팅 데이터를 불러오는 데 실패했습니다.");
        }
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

  // 메시지 전송 함수
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

    try {
      const res = await sendChatMessage(sessionId, userMessageText);
      if ((res.is_success || res._success) && res.data) {
        const botMessage = {
          id: Date.now() + 1,
          who: 'bot',
          t: res.data.bot_reply,
        };
        setMsgs(prev => [...prev, botMessage]);
      } else {
        throw new Error(res.message || "메시지 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("메시지 전송에 실패했습니다.", error);
      const errorMessage = { id: Date.now() + 1, who: 'bot', t: '메시지 전송 중 오류가 발생했습니다.' };
      setMsgs(prev => [...prev, errorMessage]);
    }
  };

  const handleQuickReply = (qrText) => {
    send(qrText);
  };

  // 새 메시지 추가 시 스크롤을 맨 아래로 이동
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs.length]);

  // '정리하기' 버튼 클릭 핸들러-> api연결 후 주석으로 처리할것
  const handleSummarize = () => {
    const draft = makeDraftFromMessages(msgs);
    navigate("/request/chatconfirm", { state: { draft } });
  };

  // '+' 버튼 클릭 핸들러
  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택 시 업로드 핸들러
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const presignRes = await getPresignedURL({
        filename: file.name,
        content_type: file.type,
      });

      if ((presignRes.is_success || presignRes._success) && presignRes.data) {
        const { upload_url, public_url, headers } = presignRes.data;

        const uploadResult = await fetch(upload_url, {
          method: 'PUT',
          headers: headers,
          body: file,
        });

        if (uploadResult.ok) {
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
        throw new Error(presignRes.message || 'Presigned URL 발급 실패');
      }
    } catch (error) {
      console.error("이미지 첨부 실패:", error);
      alert("이미지 첨부에 실패했습니다.");
    }
  };

  return (
    <div className="hr-page">
      <div className="app-shell chat-shell">
        <Header title={'채팅'} />
        
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
        
        <div className="chat-composer">
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
            <img className="send-icon" src={sendicon} alt="전송"/>
          </button>
          <button className="chat-summarize" onClick={handleSummarize}>정리하기</button>
        </div>
      </div>
    </div>
  );
}
