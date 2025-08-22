
const dum_request = [
    {
        "is_success": true,
        "code": "S200",
        "message": "요청 상태 조회 성공",
        "data": {
        "role": "senior",
        "state": "accepted",
        "active": [
            {
                "request_id": 9876,
                "title": "핸드폰 화면 녹화 방법 알려주세요!",
                "location": "신수동 1번지",
                "request_time": "2025-08-07T15:00:00+09:00",
                "status": "accepted"
            },
            {
                "request_id": 8685,
                "title": "무언가를 알려주세요!",
                "location": "신수동 4번지",
                "request_time": "2025-08-08T15:00:00+09:00",
                "status": "pending"
            }
        ],
        "actions": {},   // 수락된 요청 → 수정·삭제 버튼 없음
        "mine_preview": {
            "items": [
            { "request_id": 9876, "title": "핸드폰 화면 녹화 방법 알려주세요!", "route": "/help-requests/9876" }
            ],
            "total": 17 // 내가 작성한 요청글들 총 개수
        }
        }
    }
]

export default dum_request;