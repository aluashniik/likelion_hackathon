import React from 'react'
import './MyRequest.css'
import { useState } from 'react'
import { useEffect } from 'react'
import MyRequestSenior from './MyRequestSenior'
import MyRequestJunior from './MyRequestJunior'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'


const MyRequest = () => {
  const [requestData, setrequestData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/request`,
          {
            method: "GET",
            credentials: 'include',
            headers: {
              "Content-type": "application/json",
              // Authorization: `Bearer ${window.localStorage.getItem(
              //   "accessToken"
              // )}`,
            },
          }
        );

        if (!response.ok) {
          // 401 에러일 경우 로그인 페이지로 리디렉션
          if (response.status === 401) {
            console.log("로그인이 필요합니다.");
            // navigate('/login'); // 필요시 navigate 추가
          }
          throw new Error("something went wrong");
        }
        const data = await response.json();
        setrequestData(data.data);
        setRole(data.data.role);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }finally{
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className='myrequest'>
        <Header title={'요청'}/>
        <div className="myrequest-content none">
          <h3>loading...</h3>
        </div>
        <Navbar/>
      </div>
    )
  }

  if (role === "senior"){
    return(
      <MyRequestSenior myrequests={requestData}/>
    )
  }else if(role === "junior"){
    return(
      <MyRequestJunior myrequests={requestData}/>
    )
  }

}


export default MyRequest


