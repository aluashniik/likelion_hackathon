
export function makeDraftFromMessages(msgs) {
  const userTexts = msgs.filter(m => m.who === "user").map(m => m.t).join("\n");

  // 장소 추정: "신촌역", "마포구" 등 명사 구절을 대충 뽑는 예시 (실전은 GPT로)
  const placeMatch = userTexts.match(/(역\s*\d*번\s*출구|[가-힣A-Za-z0-9]+구|[가-힣A-Za-z0-9]+동|[가-힣A-Za-z0-9]+역)/);
  const place = placeMatch ? placeMatch[0] : "";

  // 시간 추정: HH:MM
  const timeMatch = userTexts.match(/([01]?\d|2[0-3]):([0-5]\d)/);
  const today = new Date();
  let when = "";
  if (timeMatch) {
    const [hh, mi] = [parseInt(timeMatch[1], 10), parseInt(timeMatch[2], 10)];
    const dt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hh, mi, 0);
    when = dt.toISOString();
  }

  // 제목: 마지막 사용자 메시지 1줄 요약
  const lastUser = msgs.filter(m => m.who === "user").slice(-1)[0]?.t ?? "";
  const title = lastUser.replace(/\n/g, " ").slice(0, 30);

  // 내용: 사용자 전체 텍스트
  const content = lastUser || "";

  return {
    device: "스마트폰",
    title,
    content,
    place,
    when,        // 없으면 "" 로 남김
    attachments: []
  };
}
