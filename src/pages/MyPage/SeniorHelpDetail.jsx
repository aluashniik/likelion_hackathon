import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { getMyHelpRequestById } from "../../api/mypage";
import "./SeniorHelpDetail.css"; 
import howtoscreenshot from '../../assets/howtoscreenshot.png'
import { formatSimpleDateTime } from "../../utils/date";


export default function SeniorHelpDetail() {
  const { state } = useLocation(); 
  const navigate = useNavigate();
  
  // API 연동 준비
  /*
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const initialItem = state || JSON.parse(sessionStorage.getItem('hr:lastItem'));

  useEffect(() => {
    if (initialItem?.match_id) {
      const fetchDetails = async () => {
        try {
          const res = await getMyHelpRequestById(initialItem.match_id);
          if (res.is_success) {
            setDetailData(res.data);
          }
        } catch (error) {
          console.error("상세 정보 조회 실패", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    } else {
      setLoading(false);
    }
  }, [initialItem?.match_id]);

  if (loading) {
    return <div>상세 정보를 불러오는 중...</div>;
  }
  
  // API 연동 시에는 아래 item 대신 detailData
  // if (!detailData) { ... } 
  */
  
  let item = state || JSON.parse(sessionStorage.getItem('hr:lastItem'));

  if (!item) {
    return <div>상세 데이터를 찾을 수 없습니다.</div>
  }

  return (
    <div className="hr-page">
      <div className="app-shell">
        <Header title={'내 정보'}/>  
        <main className="hrd-content">
        <h2 className="shl-h2">도움 신청 내역</h2>
          <section className="hrd_card">
            <h1 className="hrd_title">{item.help_title || item.title}</h1>
            <dl className="hrd_meta">
              <div className="row">
                <dt>요청자</dt>
                <dd>{item.requester?.name || "OOO 어르신"}</dd> 
              </div>
              <div className="row">
                <dt>도움드릴 장소</dt>
                <dd>{item.location || item.place || "-"}</dd>
              </div>
              <div className="row">
                <dt>도움드릴 일시</dt>
                <dd>{formatSimpleDateTime(item.request_time || item.matched_at || item.time)}</dd>
              </div>
              <div className="row">
                <dt>소요시간</dt>
                <dd>{item.duration || "0시간 30분"}</dd>
              </div>
              <div className="row">
                <dt>요청사항</dt>
                <dd>{item.description || "상세 내용 없음"}</dd>
              </div>
              {(item.images && item.images.length > 0) || howtoscreenshot ? (
                <div className="row">
                  <dt>첨부파일</dt>
                  <dd>
                    <img
                      className="hrd-attach"
                      src={(item.images && item.images[0]) || howtoscreenshot}
                      alt="첨부 미리보기"
                    />
                  </dd>
                </div>
              ) : null}
            </dl>
          </section>
        </main>
        <Navbar />
      </div>
    </div>
  );
}
