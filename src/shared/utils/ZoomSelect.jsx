import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Button,
  Tooltip,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const ZoomSelectStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;

  & .enabled_zoom {
    & svg {
      & circle {
        fill: #00aa58 !important;
      }
    }
  }
`;

const ZoomSelect = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectZoom, setSelectZoom] = useState(1);

  const zoomIn = (zoomFactor = 1) => {
    setSelectZoom(zoomFactor);
    const targetElement = document.body;
    const currentZoom = 1;
    const newZoom = currentZoom * zoomFactor;
    if (window.navigator.userAgent.toLowerCase().includes("firefox")) {
      targetElement.style.transform = `scale(${newZoom})`;
      targetElement.style.transformOrigin =
        newZoom > 1 ? `top left` : `top center`;
    } else {
      targetElement.style.zoom = newZoom;
    }
    onClose(); // Close the popover after selection
  };

  return (
    <ZoomSelectStyle>
      <Tooltip hasArrow label={t("tooltips.zoom")}>
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <PopoverTrigger>
            <Button
              className={selectZoom !== 1 ? "enabled_zoom" : ""}
              variant="ghost"
            >
              <svg
                width="55"
                height="30"
                viewBox="0 0 55 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.276 19.946V20H37.062L36.054 17.786H30.312L29.322 20H27.09V19.964L32.868 7.688H33.516L39.276 19.946ZM33.192 11.108C32.928 11.828 32.652 12.524 32.364 13.196L31.032 16.112H35.352L34.02 13.196C33.684 12.452 33.408 11.756 33.192 11.108ZM43.6958 11.828C44.7398 11.828 45.5498 12.086 46.1258 12.602C46.7138 13.118 47.0078 13.856 47.0078 14.816V20H45.6938L45.3338 18.794C45.0338 19.226 44.6378 19.562 44.1458 19.802C43.6658 20.042 43.1078 20.162 42.4718 20.162C41.7158 20.162 41.1038 19.964 40.6358 19.568C40.1798 19.16 39.9518 18.608 39.9518 17.912C39.9518 17.012 40.3178 16.316 41.0498 15.824C41.7818 15.32 42.7718 15.068 44.0198 15.068C44.3078 15.068 44.6438 15.08 45.0278 15.104V14.744C45.0278 14.336 44.8838 14.03 44.5958 13.826C44.3078 13.61 43.9058 13.502 43.3898 13.502C42.6218 13.502 41.7878 13.718 40.8878 14.15L40.3298 12.656C41.5418 12.104 42.6638 11.828 43.6958 11.828ZM43.0478 18.686C43.6358 18.686 44.1158 18.482 44.4878 18.074C44.8718 17.666 45.0698 17.102 45.0818 16.382C44.7578 16.346 44.4458 16.328 44.1458 16.328C43.4378 16.328 42.8858 16.448 42.4898 16.688C42.0938 16.928 41.8958 17.27 41.8958 17.714C41.8958 18.026 41.9978 18.266 42.2018 18.434C42.4058 18.602 42.6878 18.686 43.0478 18.686Z"
                  fill="#556C82"
                />
                <rect
                  opacity="0.2"
                  width="55"
                  height="30"
                  rx="15"
                  fill="#556C82"
                />
                <circle cx="15" cy="15" r="10" fill="white" />
              </svg>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              {[
                { factor: 0.5, label: "1 x 0.5" },
                { factor: 0.75, label: "1 x 0.75" },
                { factor: 1, label: "1 x 1" },
                { factor: 1.25, label: "1 x 1.25" },
                { factor: 1.5, label: "1 x 1.5" },
              ].map(({ factor, label }) => (
                <Box
                  key={factor}
                  onClick={() => zoomIn(factor)}
                  bg={selectZoom === factor ? "green.400" : "transparent"}
                  color={selectZoom === factor ? "white" : "black"}
                  p={2}
                  cursor="pointer"
                  borderRadius="md"
                  _hover={{ bg: "green.500", color: "white" }}
                >
                  {label}
                </Box>
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Tooltip>
    </ZoomSelectStyle>
  );
};

export default ZoomSelect;
