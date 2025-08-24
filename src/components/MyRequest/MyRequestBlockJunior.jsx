import React from 'react'
import './MyRequestBlock.css'
import MyRequestStatus from './MyRequestStatus'
import { formatKoreanDate } from '../../utils/dateFormat'
import { useNavigate } from 'react-router-dom'

const MyRequestBlockJunior = ({requestId, title, location, request_time, status, senior_info}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/myrequest/${requestId}`)
        // navigate('/myrequest/progress')
    }
    if (status==='pending'){
        return (
            <div className="myrequest-block" onClick={()=>{handleClick()}}>
                <MyRequestStatus status={status}/>
                <div className="myrequest-title">{title}</div>
                <div className="myrequest-detail">
                    <p>{location}</p>
                    <p> | </p>
                    <p>{formatKoreanDate(request_time)}</p>
                </div>
            </div>
        )
    }else{
        return (
            <div className="myrequest-block" onClick={()=>{handleClick()}}>
                <MyRequestStatus status={status}/>
                <div className="myrequest-title">{title}</div>
                <div className="myrequest-detail">
                    <p>{location}</p>
                    <p> | </p>
                    <p>{formatKoreanDate(request_time)}</p>
                </div>
                <div className="junior-profile">
                    {/* <img src={junior_img} alt="" className='junior-img'/> */}
                    {senior_info===null?<></>:
                    <div className="junior-info">
                        <h2>{senior_info.name}</h2>
                        <h3>{senior_info.phone_number}</h3>
                        <h3>{senior_info.profile_image_url}</h3>
                    </div>
                    }
                </div>
            </div>
        )
    }
    
}

export default MyRequestBlockJunior