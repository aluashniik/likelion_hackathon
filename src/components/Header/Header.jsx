import "./Header.css";

export default function Header({ title, divider = false }) {
  return (
    <header className="header">
      <div className="header-inner">
        {title ? (
          <span className="header-title">{title}</span>
        ) : (
          <span className="header-logo">LOGO</span>
        )}
      </div>
      {divider && <div className="header-divider" />}
    </header>
  );
}
