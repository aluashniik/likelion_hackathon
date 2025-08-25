import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import "./Chat.css";
import { formatTodayTitle } from "../../utils/date";
import { useNavigate } from "react-router-dom";
import { prepareChat, sendChatMessage, getPresignedURL } from "../../api/home";
import sendicon from "../../assets/send.png";

export default function Chat() {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  
  const [collectedData, setCollectedData] = useState(null);
  const [canFinish, setCanFinish] = useState(false);

  const listRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initChat = async () => {
      try {
        setLoading(true);
        const res = await prepareChat();

        if ((res.is_success || res._success) && res.data?.session_id) {
          const currentSessionId = res.data.session_id;
          setSessionId(currentSessionId);
          sessionStorage.setItem("chat:sessionId", currentSessionId);

          const greetingText = res.data.greeting || "안녕하세요! 무엇을 도와드릴까요?";
          const tipsText = Array.isArray(res.data.tips) ? res.data.tips.join("\n") : "";
          const fullGreeting = [greetingText, tipsText].filter(Boolean).join("\n");

          setMsgs([
            {
              id: Date.now(),
              who: "bot",
              t: fullGreeting,
              quickReplies: res.data.suggested_chats || [],
            },
          ]);
        } else {
          throw new Error(res.message || "채팅 초기화에 실패했습니다.");
        }
      } catch (e) {
        console.error("채팅 초기화 실패:", e);
        setMsgs([
          { id: Date.now(), who: "bot", t: "오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
        ]);
      } finally {
        setLoading(false);
      }
    };
    initChat();
  }, []); 

  const send = async (messageToSend) => {
    const userMessageText = (messageToSend || "").trim();
    if (!userMessageText || !sessionId) return;

    setMsgs((prev) => [...prev, { id: Date.now(), who: "user", t: userMessageText }]);
    setText("");

    try {
      const res = await sendChatMessage(sessionId, userMessageText);

      if ((res.is_success || res._success) && res.data) {
        const botMessage = {
          id: Date.now() + 1,
          who: "bot",
          t: res.data.bot_reply,
          quickReplies: res.data.suggested_chats || [],
        };
        setMsgs((prev) => [...prev, botMessage]);

        setCollectedData(res.data.collected);
        setCanFinish(res.data.can_finish);
      } else {
        throw new Error(res.message || "메시지 전송에 실패했습니다.");
      }
    } catch (e) {
      console.error("메시지 전송 실패:", e);
      setMsgs((prev) => [
        ...prev,
        { id: Date.now() + 1, who: "bot", t: "메시지 전송 중 오류가 발생했습니다." },
      ]);
    }
  };

  const handleQuickReply = (qrText) => send(qrText);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [msgs]);

  const handleSummarize = () => {
    sessionStorage.removeItem("chat:sessionId");
    navigate("/request/chatconfirm", { state: { draft: collectedData } });
  };

  const handleAttachClick = () => fileInputRef.current?.click();
  const handleFileChange = async (e) => { /* ... */ };

  return (
    <div className="hr-page">
      <div className="app-shell chat-shell">
        <Header title={"채팅"} />
        <main ref={listRef} className="chat-content">
          <div className="chat-date">{formatTodayTitle()}</div>
          {loading ? (
            <div className="chat-loading">대화 준비 중...</div>
          ) : (
            msgs.map((m) => (
              <div key={m.id} className={`chat-row ${m.who === "user" ? "me" : "bot"}`}>
                <div className="chat-bubble">{m.t}</div>
                {m.who === "bot" && m.quickReplies?.length > 0 && (
                  <div className="chat-qr">
                    {m.quickReplies.map((qr, i) => (
                      <button key={i} type="button" className="chat-qr-btn" onClick={() => handleQuickReply(qr)}>
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </main>
        <div className="chat-composer">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: "none" }} />
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
            }}
          />
          <button className="chat-send" onClick={() => send(text)} aria-label="전송">
            <img className="send-icon" src={sendicon} alt="전송" />
          </button>
          {canFinish && (
            <button className="chat-summarize" onClick={handleSummarize}>정리하기</button>
          )}
        </div>
      </div>
    </div>
  );
}

