import { http } from '../lib/http';

export const getHome = (params) => {
  const qs = new URLSearchParams();
  if (params?.limitFeed) qs.set('limitFeed', String(params.limitFeed));
  if (params?.cursor) qs.set('cursor', params.cursor);
  const query = qs.toString() ? `?${qs.toString()}` : '';
  return http.get(`/home${query}`); // { is_success, code, message, data }
};

// //[GET] /chat/prepare - 채팅창 초기 데이터 요청
// export const prepareChat = () => {
//   return http.get('/chat/prepare');
// };

// //[POST] /chat/messages - 채팅 메시지 전송 및 봇 응답 요청
// export const sendChatMessage = (sessionId, message) => {
//   const body = {
//     session_Id: sessionId,
//     message: message,
//   };
//   return http.post('/chat/messages', body);
// }

// //[POST] /chat/uploads/presign - 이미지 업로드를 위한 presigned URL
// export const getPresignedURL = (fileInfo) =>{
//   return http.post('/chat/uploads/presign', fileInfo);
// }


const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const token = () => localStorage.getItem('accessToken') || '';

/** 채팅 세션 준비 */
export async function prepareChat() {
  const res = await fetch(`${API_BASE}/chat/prepare`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
  });
  return res.json();
}

/** 메시지 전송 - Body(JSON)로 session_id + message */
export async function sendChatMessage(sessionId, message) {
  const res = await fetch(`${API_BASE}/chat/messages`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify({ session_id: sessionId, message }),
  });
  return res.json();
}

/** 파일 업로드용 presigned URL 발급 */
export async function getPresignedURL({ filename, content_type }) {
  const res = await fetch(`${API_BASE}/uploads/presign`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify({ filename, content_type }),
  });
  return res.json();
}

//[PATCH] /chat/draft - 채팅 기반 초안 수정
export const updateChatDraft = (draftData) => {
  return http.patch('/chat/draft', draftData);
};

//[POST] /chat/finalize - 최종 요청 게시글 생성
export const finalizeChatRequest = (finalData) => {
  return http.post('/chat/finalize', finalData);
};

// [GET] /helpRequests - 도움 요청 목록 조회 (검색 파라미터 제거)
export const getHelpRequests = () => {
  return http.get(`/helpRequests`);
};

// [GET] /helpRequests/search - 도움 요청 목록 검색
export const searchHelpRequests = (query) => {
  return http.get(`/helpRequests/search?q=${encodeURIComponent(query)}`);
};

// [GET] /helpRequests/{request_id} - 단일 도움요청 글 상세 정보 조회
export const getHelpRequestById = (id) => {
  return http.get(`/helpRequests/${id}`);
};