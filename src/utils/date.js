export function formatTodayTitle() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const wk = ["일","월","화","수","목","금","토"][d.getDay()];
  return `${y}년 ${m}월 ${dd}일 ${wk}요일`;
}

// MM.DD HH:MM 형식
export function formatKoreanDateTime(iso) {
  const d = new Date(iso);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const wk = ["일","월","화","수","목","금","토"][d.getDay()];
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${m}.${dd} (${wk}) ${hh}:${mi}`;
}


// YYYY.MM.DD HH:MM 형식
export function formatSimpleDateTime(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
}


