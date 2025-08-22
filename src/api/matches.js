import { http } from '../lib/http';

//[POST] /matches - 도움 요청 수락 (매칭 생성)
export const createMatch = (request_id) => {
  const body = {
    request_id: request_id,
  };
  return http.post('/matches', body);
};