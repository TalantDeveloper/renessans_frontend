import { Tooltip } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
const AudioDiktorBtnStyle = styled.div`
  padding: 0 5px;
  & .enbaled_diktor {
    & svg {
      & circle {
        fill: #00aa58 !important;
      }
    }
  }
`;
const AudioDiktorBtn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const audio_diktor = useSelector((s) => s?.audio_diktor);
  return (
    <AudioDiktorBtnStyle>
      <Tooltip hasArrow label={t("tooltips.audio")}>
        <span
          onClick={() =>
            dispatch({ type: "SET_AUDIO_DIKTOR", payload: !audio_diktor })
          }
          className={audio_diktor ? "enbaled_diktor" : ""}
        >
          <svg
            width="55"
            height="30"
            viewBox="0 0 55 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect opacity="0.2" width="55" height="30" rx="15" fill="#556C82" />
            <path
              d="M45 15.6709C45 15.3745 44.7529 15.1342 44.448 15.1342C44.1432 15.1342 43.8961 15.3745 43.8961 15.6709C43.8961 18.2966 41.6998 20.4326 38.9999 20.4326C36.3002 20.4326 34.1039 18.2966 34.1039 15.6709C34.1039 15.3745 33.8568 15.1342 33.552 15.1342C33.2471 15.1342 33 15.3745 33 15.6709C33 18.7076 35.3974 21.2093 38.448 21.4812V22.9264H36.3996C36.0948 22.9264 35.8477 23.1667 35.8477 23.4632C35.8477 23.7597 36.0948 24 36.3996 24H41.6004C41.9051 24 42.1522 23.7597 42.1522 23.4632C42.1522 23.1667 41.9051 22.9264 41.6004 22.9264H39.5519V21.4812C42.6026 21.2095 45 18.7076 45 15.6709Z"
              fill="#556C82"
            />
            <path
              d="M38.9999 19.1081C40.9487 19.1081 42.5341 17.5661 42.5341 15.6709V9.43707C42.5341 7.54193 40.9487 6 38.9999 6C37.0513 6 35.4659 7.54193 35.4659 9.43707V15.6709C35.4659 17.5661 37.0513 19.1081 38.9999 19.1081ZM36.5697 9.43707C36.5697 8.13382 37.6599 7.07364 38.9999 7.07364C40.34 7.07364 41.4302 8.13382 41.4302 9.43707V15.6709C41.4302 16.9741 40.34 18.0344 38.9999 18.0344C37.6599 18.0344 36.5697 16.9741 36.5697 15.6709V9.43707Z"
              fill="#556C82"
            />
            <circle cx="16" cy="15" r="10" fill="white" />
          </svg>
        </span>
      </Tooltip>
    </AudioDiktorBtnStyle>
  );
};

export default AudioDiktorBtn;
