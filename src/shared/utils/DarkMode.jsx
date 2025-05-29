import { Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
const DarkModeStyle = styled.div`
  padding: 0 5px;
  & .enbaled_dark {
    & svg {
      & circle {
        fill: #00aa58 !important;
      }
    }
  }
`;
const DarkMode = () => {
  const { t } = useTranslation();
  const [isDark, setisDark] = useState(false);
  const setTheme = () => {
    if (isDark) {
      const body = document.querySelector("body");
      if (body) {
        body.classList.remove("dark_theme");
      }
      setisDark(false);
    } else {
      const body = document.querySelector("body");
      if (body) {
        body.classList.add("dark_theme");
      }
      setisDark(true);
    }
  };
  return (
    <DarkModeStyle>
      <Tooltip hasArrow label={t("tooltips.dark")}>
        <span
          onClick={() => setTheme()}
          className={isDark ? "enbaled_dark" : ""}
        >
          <svg
            width="55"
            height="30"
            viewBox="0 0 55 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M47.8793 14.6338C47.7095 14.4037 43.6652 9 38.4999 9C33.3346 9 29.2901 14.4037 29.1206 14.6336C28.9598 14.8519 28.9598 15.1479 29.1206 15.3662C29.2901 15.5963 33.3346 21 38.4999 21C43.6652 21 47.7095 15.5963 47.8793 15.3664C48.0402 15.1481 48.0402 14.8519 47.8793 14.6338ZM38.4999 19.7586C34.6951 19.7586 31.3998 16.1721 30.4243 14.9996C31.3985 13.826 34.687 10.2414 38.4999 10.2414C42.3045 10.2414 45.5997 13.8273 46.5756 15.0004C45.6013 16.1739 42.3129 19.7586 38.4999 19.7586Z"
              fill="#556C82"
            />
            <path
              d="M38.4999 11.2759C36.4276 11.2759 34.7417 12.9466 34.7417 15C34.7417 17.0535 36.4276 18.7242 38.4999 18.7242C40.5722 18.7242 42.2582 17.0535 42.2582 15C42.2582 12.9466 40.5722 11.2759 38.4999 11.2759ZM38.4999 17.4828C37.1183 17.4828 35.9944 16.369 35.9944 15C35.9944 13.631 37.1184 12.5173 38.4999 12.5173C39.8815 12.5173 41.0054 13.631 41.0054 15C41.0054 16.369 39.8815 17.4828 38.4999 17.4828Z"
              fill="#556C82"
            />
            <rect opacity="0.2" width="55" height="30" rx="15" fill="#556C82" />
            <circle cx="15" cy="15" r="10" fill="white" />
          </svg>
        </span>
      </Tooltip>
    </DarkModeStyle>
  );
};

export default DarkMode;
