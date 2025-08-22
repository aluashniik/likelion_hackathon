import { http } from '../lib/http';

// [GET] /mypage - 내 정보 메인화면 조회
export const getMyProfile = () => {
  return http.get('/mypage');
};

// --- 프로필 수정 ---

//[PATCH] /mypage/profile - 내 정보 수정 (일반)
export const updateMyProfile = (profileData) => {
  return http.patch('/mypage/profile', profileData);
};


//PATCH] /mypage/profile/password - 비밀번호 수정
export const updateMyPassword = (passwordData) => {
  return http.patch('/mypage/profile/password', passwordData);
};


// [PUT] /mypage/edit/profile - 프로필 사진 수정
export const updateMyProfileImage = (formData) => {
  // 사진은 보통 FormData로 보냅니다.
  return http.put('/mypage/edit/profile', formData);
};


// --- 어르신 (도움 받은 내역) ---
// [GET] /mypage/request - 도움 받은 내역 목록
export const getMyHelpRequests = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return http.get(`/mypage/request${qs ? `?${qs}` : ''}`);
};

// [GET] /mypage/request/{match_id} - 도움 받은 내역 상세
export const getMyHelpRequestById = (id) => {
  return http.get(`/mypage/request/${id}`);
};


// --- 청년 (도움 준 내역) ---
// [GET] /mypage/offer - 도움 준 내역 목록
export const getMyAcceptedRequests = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return http.get(`/mypage/offer${qs ? `?${qs}` : ''}`);
};

// [GET] /mypage/offer/{match_id} - 도움 준 내역 상세
export const getMyAcceptedRequestById = (id) => {
  return http.get(`/mypage/offer/${id}`);
};


// --- 수업 ---
// [GET] /mypage/classCourse - 내가 개설한 수업 목록
export const getMyClassesOpened = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return http.get(`/mypage/classCourse${qs ? `?${qs}` : ''}`);
};

// [GET] /mypage/class - 내가 신청(수강)한 수업 목록
export const getMyClassesApplied = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return http.get(`/mypage/class${qs ? `?${qs}` : ''}`);
};


// --- 리뷰 ---
// [GET] /mypage/review - 내가 받은 리뷰 목록
export const getMyReviews = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return http.get(`/mypage/review${qs ? `?${qs}` : ''}`);
};

// [GET] /mypage/review/{review_id} - 내가 받은 리뷰 상세
export const getMyReviewById = (id) => {
  return http.get(`/mypage/review/${id}`);
};
