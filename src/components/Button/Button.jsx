//import styled from "styled-components"
import "./Button.css";

/*
props
title: 큰 제목
desc: 작은 설명
type: request/list/default
icon
highlight?
 */


export default function Button({ title, desc, type = "default", highlight = false, icon, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`Button Button_${type} ${highlight ? "Button_highlight" : ""}`}
    >
      <div className="Button_inner">
        {icon && <img src={icon} alt="" className="Button_icon" />}
        <div className="Button_texts">
          <div className="Button_title">{title}</div>
          {desc && <div className="Button_desc">{desc}</div>}
        </div>
      </div>
    </button>
  );
}
