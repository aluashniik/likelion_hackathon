import { http } from '../lib/http';

export const getHome = (params) => {
  const qs = new URLSearchParams();
  if (params?.limitFeed) qs.set('limitFeed', String(params.limitFeed));
  if (params?.cursor) qs.set('cursor', params.cursor);
  const query = qs.toString() ? `?${qs.toString()}` : '';
  return http.get(`/home${query}`); // { is_success, code, message, data }
};

//[GET] /request/chat/prepare - 채팅창 초기 데이터 요청
export const prepareChat = () => {
  return http.get('/request/chat/prepare');
};

//[POST] /request/chat/messages - 채팅 메시지 전송 및 봇 응답 요청
export const sendChatMessage = (sessionId, message) => {
  const body = {
    session_Id: sessionId,
    message: message,
  };
  return http.post('/request/chat/message', body);
}

//[POST] /request/chat/uploads/presign - 이미지 업로드를 위한 presigned URL
export const getPresignedURL = (fileInfo) =>{
  return http.post('/request/chat/uploads/presign', fileInfo);
}

//[PATCH] /request/chat/draft - 채팅 기반 초안 수정
export const updateChatDraft = (draftData) => {
  return http.patch('/request/chat/draft', draftData);
};

//[POST] /request/chat/finalize - 최종 요청 게시글 생성
export const finalizeChatRequest = (finalData) => {
  return http.post('/request/chat/finalize', finalData);
};

//[GET] /helpRequests - 도움 요청 목록 조회
export const getHelpRequests = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return http.get(`/helpRequests${qs ? `?${qs}` : ''}`);
};

//[GET] /helpRequests/{request_id} - 단일 도움요청 글 상세 정보 조회
export const getHelpRequestById = (id) => {
  return http.get(`/helpRequests/${id}`);
};
