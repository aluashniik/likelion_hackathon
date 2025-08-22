import React from 'react'
import './MyRequestFullBlock.css'
import MyRequestStatus from './MyRequestStatus'
import { formatKoreanDate } from '../../utils/dateFormat'
import { useNavigate } from 'react-router-dom'

const MyRequestFullBlock = ({requestId, title, location, request_time, status}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        // navigate(`/myrequest/:${requestId}`)
        // navigate('/myrequest/progress')
    }
        return (
            <div className="myrequest-block junior" onClick={()=>{handleClick()}}>
                <MyRequestStatus status={status}/>
                <div className="myrequest-title junior">{title}</div>
                <div className="myrequest-junior">
                    <ul>
                        <li><span>장소&nbsp; </span> {location}</li>
                        <li><span>일정&nbsp; </span> {formatKoreanDate(request_time)}</li>
                        <li><span>첨부사진&nbsp; </span> {img_url}</li>
                    </ul>
                    <p></p>
                </div>
                <div className="senior-profile">
                    {/* <img src={junior_img} alt="" className='junior-img'/> */}
                    <div className="senior-info">
                        <h2>000 어르신</h2>
                        <h3>010-1234-5678</h3>
                    </div>
                </div>
            </div>
        )
    
}

export default MyRequestFullBlock
