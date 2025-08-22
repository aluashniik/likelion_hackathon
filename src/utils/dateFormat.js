export function formatKoreanDate(dateString) {
    const utc = new Date(dateString);
    const koreaTime = new Date(utc.getTime() + 9 * 60 * 60 * 1000); // UTC+9

    const year = koreaTime.getFullYear();
    const month = String(koreaTime.getMonth() + 1).padStart(2, "0");
    const day = String(koreaTime.getDate()).padStart(2, "0");
    const hours = String(koreaTime.getHours()).padStart(2, "0");
    const minutes = String(koreaTime.getMinutes()).padStart(2, "0");

    // 요일 계산
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[koreaTime.getDay()];

    return `${year}.${month}.${day} (${dayOfWeek}) ${hours}:${minutes}`;
}
