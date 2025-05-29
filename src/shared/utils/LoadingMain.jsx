import React from "react";
import { useSelector } from "react-redux";
import styled, { createGlobalStyle, keyframes } from "styled-components";
const contentRotate = keyframes`
	100% {
		transform: rotate(360deg);
	}
`;
const dotRotate = keyframes`
	80%,
	100% {
		transform: rotate(360deg);
	}
`;
const StyledElement = styled.section`
  align-items: center;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 9999999;
  & .loader {
    height: 46px;
    width: 46px;
    & .content {
      animation: ${contentRotate} 2.5s infinite linear both;
      height: 34px;
      margin: 6px;
      position: relative;
      width: 34px;
      & div {
        animation: ${dotRotate} 2s infinite ease-in-out both;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        &:nth-child(1) {
          animation-delay: -1.1s;
        }
        &:nth-child(2) {
          animation-delay: -1s;
        }
        &:nth-child(3) {
          animation-delay: -0.9s;
        }
        &:nth-child(4) {
          animation-delay: -0.8s;
        }
        &:nth-child(5) {
          animation-delay: -0.7s;
        }
        &:nth-child(6) {
          animation-delay: -0.6s;
        }
        &:before {
          background-color: #00237e;
          /* background-color: rgb(0, 170, 88); */
          border-radius: 3px;
          content: "";
          display: block;
          height: 6px;
          width: 6px;
        }
      }
    }
  }
  & .error_text {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    padding: 30px;
    color: #00237e;
  }
`;
const ScrollStop = createGlobalStyle`
	html,
	body {
		overflow: hidden !important;
	}
`;
const LoadingMain = () => {
  const { loading_text = "" } = useSelector((s) => s);
  return (
    <StyledElement>
      <div className="loader">
        <div className="content">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <h1 className="error_text">{loading_text}</h1>
      <ScrollStop />
    </StyledElement>
  );
};
export default LoadingMain;
