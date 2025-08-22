import React, { useState } from "react";
import "./HelpRequestsDetails.css";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import howtoscreenshot from '../../assets/howtoscreenshot.png'
import { getHelpRequestById } from "../../api/home";
import { createMatch } from "../../api/matches";
import { formatSimpleDateTime } from "../../utils/date";

//http://localhost:5175/list/details?role=senior


export default function HelpRequestsDetails() {
  const { state, search } = useLocation();
  const navigate = useNavigate();
  //const [role, setRole] = useState(null);
  const params=new URLSearchParams(search);
  const role=params.get("role")||"guest";

  const [accepted, setAccepted] = useState(false);


  //API 연동 준비
  /*const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const initialItem = state || JSON.parse(sessionStorage.getItem('hr:lastItem'));

  useEffect(() => {
    // 목록 페이지에서 넘겨준 request_id를 사용합니다.
    if (initialItem?.request_id) {
      const fetchDetails = async () => {
        try {
          const res = await getHelpRequestById(initialItem.request_id);
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
  }, [initialItem?.request_id]);

  if (loading) {
    return <div>상세 정보를 불러오는 중...</div>;
  }

  //연동 시엔 detailData 사용할것
  if (!detailData){...}
  */


  let item = state || JSON.parse(sessionStorage.getItem('hr:lastItem'));


  if (!item) {
    return <div>상세 데이터를 찾을 수 없습니다.</div>
  }

  const handleRequest = async () =>{ 
    //API 연동 부분 
    /*
    try {
      // API 호출 시 현재 보고 있는 요청글의 ID(request_id)를 넘겨줌
      const res = await createMatch(item.request_id);
      if (res.is_success) {
        alert("요청을 수락했습니다!");
        setAccepted(true);
        // 성공 후 마이페이지의 '도움 수락 내역'으로 보낼까?
        //navigate('/mypage/accepted-requests');
      } else {
        throw new Error(res.message || "요청 수락에 실패했습니다.");
      }
    } catch (error) {
      console.error("요청 수락 실패:", error);
      alert("요청 수락에 실패했습니다. 다시 시도해주세요.");
    }
    */

    setAccepted(true);
  };

  return (
    <div className="hr-page">
      <div className="app-shell">
        <Header title="도움 요청 상세" divider />
        <main className="hrd_content">
          <h2 className="shl-h2">상세 요청 내용</h2>
          <section className="hrd_card">
            <h1 className="hrd_title">{item.title}</h1>
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
                <dd>{formatSimpleDateTime(item.request_time || item.time)}</dd>
              </div>
              <div className="row">
                <dt>소요시간</dt>
                <dd>{item.duration || "0시간 30분"}</dd>
              </div>
              <div className="row">
                <dt>요청사항</dt>
                <dd>
                  {item.description || 
                  "제 핸드폰 화면을 녹화해서 손녀에게 보내주려고 합니다. 핸드폰 소리와 제가 말하는 소리가 모두 녹화되었으면 좋겠습니다."}
                </dd>
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

          {/* 어르신/청년 수락하기 버튼 */}
          {role==='junior' && (
            <button className={`hrd-ct ${accepted ? "accepted" : ""}`}
             onClick={handleRequest}
             disabled={accepted}
             > {accepted ? "도움 요청 수락 완료!" : "도움 요청 수락하기"} </button>
          )}
        </main>
        <Navbar />
      </div>
    </div>
  );
}
