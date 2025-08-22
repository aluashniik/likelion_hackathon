import React from 'react'
import './MyRequestStatus.css'

const MyRequestStatus = ({ status }) => {

  const statusClass = {
    pending: "status pending",
    accepted: "status accepted",
    in_progress: "status in-progress"
  }[status];

  const statusText = {
    pending: "수락 전",
    accepted: "수락 완료",
    in_progress: "도움 중"
  }[status];

  return (
    <span className={statusClass}>{statusText}</span>
  )
}

export default MyRequestStatus