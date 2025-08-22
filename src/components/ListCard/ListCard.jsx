import './ListCard.css';

export default function ListCard({ title, meta=[], badge, onClick }) {
  return (
    <button className="lc-card" onClick={onClick}>
      <div className="lc-top">
        <div className="lc-title">{title}</div>
        {badge && <span className={`lc-badge ${badge.type||''}`}>{badge.text}</span>}
      </div>
      <ul className="lc-meta">
        {meta.map((m,i)=><li key={i}>{m}</li>)}
      </ul>
      <div className="lc-more">자세히 보기</div>
    </button>
  );
}