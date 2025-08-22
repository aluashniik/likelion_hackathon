// src/lib/http.js
const API_BASE = import.meta.env.VITE_API_BASE_URL; // .env 필요

// 공통 요청 함수
export async function request(path, init = {}) {
  if (!API_BASE) {
    console.warn('VITE_API_BASE_URL가 비어있습니다. .env 확인하세요.');
  }

  const headers = new Headers(init.headers || {});
  // FormData가 아닐 때만 JSON 컨텐트타입 자동 설정
  if (!(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // 토큰이 있으면 Authorization 헤더 자동 첨부
  const token = localStorage.getItem('accessToken');
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch((API_BASE || '') + path, {
    method: 'GET',
    ...init,
    headers,
    // credentials: 'include',
  });

  // 204 (No Content) 즉시 성공 반환
  if (res.status === 204) return null;

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  let data;
  try {
    data = isJson ? await res.json() : await res.text();
  } catch {
    data = null; // 본문이 비어있거나 파싱 실패
  }

  if (!res.ok) {
    const message =
      (isJson && data && (data.message || data.error)) ||
      `HTTP ${res.status} ${res.statusText}`;
    const err = new Error(message);
    err.status = res.status;
    err.body = data;
    throw err;
  }

  return data;
}

// 편의 메서드
export const http = {
  get: (p, opts) => request(p, { ...opts, method: 'GET' }),
  post: (p, body, opts) =>
    request(p, {
      ...opts,
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  put: (p, body, opts) =>
    request(p, {
      ...opts,
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  patch: (p, body, opts) =>
    request(p, {
      ...opts,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  del: (p, opts) => request(p, { ...opts, method: 'DELETE' }),
};
