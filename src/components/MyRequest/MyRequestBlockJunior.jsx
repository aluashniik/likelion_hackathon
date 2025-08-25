import React from 'react'
import './MyRequestBlock.css'
import MyRequestStatus from './MyRequestStatus'
import { formatKoreanDate } from '../../utils/dateFormat'
import { useNavigate } from 'react-router-dom'

const MyRequestBlockJunior = ({requestId, title, location, requestTime, status, seniorInfo}) => {
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
                    <p>{formatKoreanDate(requestTime)}</p>
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
                    <p>{formatKoreanDate(requestTime)}</p>
                </div>
                <div className="junior-profile">
                    {/* <img src={junior_img} alt="" className='junior-img'/> */}
                    {seniorInfo===null?<></>:
                    <div className="junior-info">
                        <img src={seniorInfo.profileImageUrl} alt="" />
                        <h2>{seniorInfo.name}</h2>
                        <h3>{seniorInfo.phoneNumber}</h3>
                    </div>
                    }
                </div>
            </div>
        )
    }
    
}

export default MyRequestBlockJunior