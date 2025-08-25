import React from 'react'
import './MyRequestFullBlock.css'
import MyRequestStatus from './MyRequestStatus'
import { formatKoreanDate } from '../../utils/dateFormat'

const MyRequestFullBlock = ({ requestData }) => {
    if (!requestData) {
        return null;
    }

        return (
            <div className="myrequest-block junior">
                <MyRequestStatus status={requestData?.status}/>
                <div className="myrequest-title junior">{requestData?.title}</div>
                <div className="myrequest-junior">
                    <ul>
                        <li><span>장소&nbsp; </span> {requestData?.location}</li>
                        <li><span>일정&nbsp; </span> {formatKoreanDate(requestData?.requestTime)}</li>
                        <li><span>첨부사진&nbsp; </span> {requestData?.images}</li>
                    </ul>
                    <p>{requestData?.description}</p>
                </div>
                <div className="senior-profile">
                    {/* <img src={junior_img} alt="" className='junior-img'/> */}
                    <div className="senior-info">
                        <h2>{requestData.seniorInfo.name}</h2>
                        <h3>{requestData.seniorInfo.phoneNumber}</h3>
                    </div>
                </div>
            </div>
        )
    
}

export default MyRequestFullBlock
