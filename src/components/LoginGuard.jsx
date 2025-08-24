import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const isUserLoggedIn = () => {
  // document.cookie 문자열에 "JSESSIONID="가 포함되어 있는지 확인
  return document.cookie.includes("JSESSIONID=");
};

const LoginGuard = (_WrappedComponent) => {
  const WrappedComponent = _WrappedComponent;
  return function Guard(props) {
    const navigate = useNavigate();
    // useRef를 사용하여 alert가 이미 호출되었는지 추적
    const hasAlerted = useRef(false);
    const isLoggedIn = isUserLoggedIn();

    useEffect(() => {
      if (!isLoggedIn) {
        if (!hasAlerted.current) {
          alert("로그인이 필요합니다.");
          hasAlerted.current = true;
        }
        navigate("/login", { replace: true });
      }
    }, [isLoggedIn, navigate]); // isLoggedIn 상태가 변할 때만 useEffect 실행

    if (!isLoggedIn) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default LoginGuard;