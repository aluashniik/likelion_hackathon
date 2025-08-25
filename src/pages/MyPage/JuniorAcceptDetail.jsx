// import React, { useState, useEffect } from "react";
// import Header from "../../components/Header/Header";
// import Navbar from "../../components/Navbar/Navbar";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getMyAcceptedRequestById } from "../../api/mypage"; 
// import "./JuniorAcceptDetail.css"; 
// import howtoscreenshot from '../../assets/howtoscreenshot.png';
// import { formatSimpleDateTime } from "../../utils/date";

// function StarRating({ rating }) {
//   return (
//     <div className="star-rating">
//       {[...Array(5)].map((_, index) => {
//         const starClass = index < rating ? 'star-filled' : 'star-empty';
//         return <span key={index} className={`star ${starClass}`}>★</span>;
//       })}
//     </div>
//   );
// }


// export default function JuniorAcceptDetail() { 
//   const { state } = useLocation(); 
//   const navigate = useNavigate();

//   // API 연동 준비 
  
//   const [detailData, setDetailData] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   const initialItem = state || JSON.parse(sessionStorage.getItem('hr:lastItem'));

//   useEffect(() => {
//     if (initialItem?.match_id) {
//       const fetchDetails = async () => {
//         try {
//           const res = await getMyAcceptedRequestById(initialItem.match_id);
//           if (res.is_success) {
//             setDetailData(res.data);
//           }
//         } catch (error) {
//           console.error("상세 정보 조회 실패", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchDetails();
//     } else {
//       setLoading(false);
//     }
//   }, [initialItem?.match_id]);

//   if (loading) {
//     return <div>상세 정보를 불러오는 중...</div>;
//   }
  
//   // API 연동 시에는 아래 item 대신 detailData를 사용
//   // if (!detailData) { ... } 
  

//   let item = state || JSON.parse(sessionStorage.getItem('hr:lastItem'));

//   if (!detailData) {
//     return <div>상세 데이터를 찾을 수 없습니다.</div>;
//   }


//   return (
//     <div className="hr-page">
//       <div className="app-shell">
//         <Header title={'내 정보'}/>  
//         <main className="jad-content">
//           <h2 className="jad-h2">도움 수락 내역</h2>
          
//           <section className="jad-request-card">
//             <h3 className="jad-title">{item.title || item.help_title}</h3>
//             <dl className="jad-dl">
//               <div className="row">
//                 <dt>요청자</dt>
//                 <dd>{item.requester?.name || "OOO 어르신"}</dd> 
//               </div>
//               <div className="row">
//                 <dt>도움드릴 장소</dt>
//                 <dd>{item.location || "-"}</dd>
//               </div>
//               <div className="row">
//                 <dt>도움드릴 일시</dt>
//                 <dd>{formatSimpleDateTime(item.request_time || item.matched_at)}</dd>
//               </div>
//               <div className="row">
//                 <dt>소요시간</dt>
//                 <dd>{item.duration || "0시간 30분"}</dd>
//               </div>
//               <div className="row">
//                 <dt>요청사항</dt>
//                 <dd>{item.description || "상세 내용 없음"}</dd>
//               </div>
//               {(item.images && item.images.length > 0) || howtoscreenshot ? (
//                 <div className="row">
//                   <dt>첨부파일</dt>
//                   <dd>
//                     <img
//                       className="jad-attach"
//                       src={(item.images && item.images[0]) || howtoscreenshot}
//                       alt="첨부 미리보기"
//                     />
//                   </dd>
//                 </div>
//               ) : null}
//             </dl>
//           </section>

//           <section className="jad-review-card">
//             {item.status === 'done' ? (
//               <ul className="jad-meta">
//                 <li><b>별점</b> <StarRating rating={item.rating} /></li>
//                 <li><b>후기</b> {item.reviewText}</li>
//               </ul>
//             ) : (
//               <p className="jad-no-review">아직 작성된 후기가 없습니다.</p>
//             )}
//           </section>
//         </main>
//         <Navbar />
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { getMyAcceptedRequestById } from "../../api/mypage"; 
import "./JuniorAcceptDetail.css"; 
import { formatSimpleDateTime } from "../../utils/date";

function StarRating({ rating }) {
  // rating이 null이거나 숫자가 아니면 0점으로 처리합니다.
  const numericRating = Number(rating) || 0;
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starClass = index < numericRating ? 'star-filled' : 'star-empty';
        return <span key={index} className={`star ${starClass}`}>★</span>;
      })}
    </div>
  );
}

export default function JuniorAcceptDetail() { 
  const { state } = useLocation(); 
  const navigate = useNavigate();

  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const initialItem = state || JSON.parse(sessionStorage.getItem('hr:lastItem'));

  useEffect(() => {
    if (initialItem?.match_id) {
      const fetchDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await getMyAcceptedRequestById(initialItem.match_id);
          // 1. API 응답의 성공 여부를 `_success`로 확인합니다.
          if (res._success && res.data) {
            setDetailData(res.data);
          } else {
            throw new Error(res.message || "상세 정보를 불러오는데 실패했습니다.");
          }
        } catch (err) {
          console.error("상세 정보 조회 실패", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    } else {
      setError("상세 정보를 조회할 ID가 없습니다.");
      setLoading(false);
    }
  }, [initialItem?.match_id]);

  if (loading) {
    return <div>상세 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }
  
  if (!detailData) {
    return <div>상세 데이터를 찾을 수 없습니다.</div>;
  }

  // 2. 화면을 그릴 때, 이전 'item' 변수 대신 API로 불러온 `detailData`를 사용합니다.
  //    또한, API 응답과 동일한 변수 이름(키)을 사용하도록 수정합니다.
  return (
    <div className="hr-page">
      <div className="app-shell">
        <Header title={'내 정보'}/>  
        <main className="jad-content">
          <h2 className="jad-h2">도움 수락 내역</h2>
          
          <section className="jad-request-card">
            <h3 className="jad-title">{detailData.title}</h3>
            <dl className="jad-dl">
              <div className="row">
                <dt>요청자</dt>
                <dd>{detailData.requester_name}</dd> 
              </div>
              <div className="row">
                <dt>도움드릴 장소</dt>
                <dd>{detailData.location}</dd>
              </div>
              <div className="row">
                <dt>도움드릴 일시</dt>
                <dd>{formatSimpleDateTime(detailData.request_time)}</dd>
              </div>
              <div className="row">
                <dt>소요시간</dt>
                <dd>{detailData.duration_text}</dd>
              </div>
              <div className="row">
                <dt>요청사항</dt>
                <dd>{detailData.description}</dd>
              </div>
              {detailData.images?.length > 0 && (
                <div className="row">
                  <dt>첨부파일</dt>
                  <dd>
                    <img
                      className="jad-attach"
                      src={detailData.images[0]}
                      alt="첨부 미리보기"
                    />
                  </dd>
                </div>
              )}
            </dl>
          </section>

          <section className="jad-review-card">
            {/* 후기 데이터가 있는지 (null이 아닌지) 여부로 렌더링을 결정합니다. */}
            {detailData.review_text !== null ? (
              <ul className="jad-meta">
                <li><b>별점</b> <StarRating rating={detailData.rating_stars} /></li>
                <li><b>후기</b> {detailData.review_text}</li>
              </ul>
            ) : (
              <p className="jad-no-review">아직 작성된 후기가 없습니다.</p>
            )}
          </section>
        </main>
        <Navbar />
      </div>
    </div>
  );
}
