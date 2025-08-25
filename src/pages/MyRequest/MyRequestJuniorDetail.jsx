import React from 'react'
import './MyRequestJunior.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import MyRequestFullBlock from '../../components/MyRequest/MyRequestFullBlock'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const MyRequestJuniorDetail = () => {
  const { requestId } = useParams();
    const [requestData, setRequestData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // 2. useEffect 훅에서 API를 호출합니다.
    useEffect(() => {
        async function fetchFullRequestData() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/request/${requestId}`,
                    {
                        method: "GET",
                        credentials: "include",
                        headers: { "Accept": "application/json" }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data.");
                }
                const data = await response.json();
                setRequestData(data.data);
            } catch (error) {
                console.error("Error fetching request details:", error);
            } finally {
                setIsLoading(false);
            }
        }
        if (requestId) {
            fetchFullRequestData();
        }
    }, [requestId]);

    if (isLoading) {
        return (
          <div className='myrequest junior'>
            <Header title={'요청'}/>
            <div className="myrequest-content junior">
                <h3>요청 정보를 불러오는 중...</h3>
            </div>
            <Navbar/>
          </div>
        )
    }
    
    if (!requestData) {
      return (
        <div className='myrequest junior'>
          <Header title={'요청'}/>
          <div className="myrequest-content junior">
              <h3>요청 정보를 찾을 수 없습니다.</h3>
          </div>
          <Navbar/>
        </div>
      )
    }

  return(
    <div className='myrequest junior'>
        <Header title={'요청'}/>
        <div className="myrequest-content junior">
            <h2>내가 수락한 도움</h2>
            <MyRequestFullBlock requestData={requestData} />
        </div>
        <Navbar/>
    </div>

  )
}

export default MyRequestJuniorDetail;
