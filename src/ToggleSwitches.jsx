import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

const zoomOptions = [
  { label: "1 x 0.5", value: 0.5 },
  { label: "1 x 0.75", value: 0.75 },
  { label: "1 x 1", value: 1 },
  { label: "1 x 1.25", value: 1.25 },
  { label: "1 x 1.5", value: 1.5 },
];

export default function ToggleSwitches() {
  const [isVisible, setIsVisible] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [zoom, setZoom] = useState(1);

  // Handle zoom change
  const handleZoomChange = (value) => {
    setZoom(value);
    setShowZoom(false);
    const zoomRoot = document.getElementById("zoom-root");
    if (zoomRoot) {
      zoomRoot.style.transform = `scale(${value})`;
      zoomRoot.style.transformOrigin = "top left";
      zoomRoot.style.width = `${100 / value}%`;
      zoomRoot.style.height = `${100 / value}%`;
    }
  };

  // Toggle for "Aa" (text mode)
  const handleTextModeToggle = () => {
    setShowZoom((prev) => !prev);
  };

  // Toggle for "eye" (visibility)
  const handleVisibilityToggle = () => {
    setIsVisible((prev) => {
      const newState = !prev;
      if (newState) {
        document.body.classList.add("grayscale-mode");
      } else {
        document.body.classList.remove("grayscale-mode");
      }
      return newState;
    });
  };

  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      {/* Aa Button */}
      <div style={{ position: "relative" }}>
        <button
          onClick={handleTextModeToggle}
          style={{
            background: "#f3f4f6",
            borderRadius: "50%",
            border: "none",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#6b7280",
            cursor: "pointer",
            position: "relative",
            boxShadow: showZoom ? "0 0 0 2px #f59e42" : "none",
            outline: "none",
            transition: "box-shadow 0.2s, background 0.2s",
          }}
        >
          Aa
          {showZoom && (
            <span
              style={{
                position: "absolute",
                top: "7px",
                right: "7px",
                width: "8px",
                height: "8px",
                background: "#f59e42", // orange
                borderRadius: "50%",
                boxShadow: "0 0 2px #fff",
              }}
            />
          )}
        </button>
        {showZoom && (
          <div
            style={{
              position: "absolute",
              top: "48px",
              left: 0,
              background: "#fff",
              border: "1px solid #e5e9f2",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              zIndex: 100,
              minWidth: "120px",
            }}
          >
            {zoomOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleZoomChange(option.value)}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  background: zoom === option.value ? "#22c55e" : "transparent",
                  color: zoom === option.value ? "#fff" : "#222",
                  fontWeight: zoom === option.value ? "bold" : "normal",
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Eye Button */}
      <div style={{ position: "relative" }}>
        <button
          onClick={handleVisibilityToggle}
          style={{
            background: "#f3f4f6",
            borderRadius: "50%",
            border: "none",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            color: "#6b7280",
            cursor: "pointer",
            position: "relative",
            boxShadow: isVisible ? "0 0 0 2px #3b82f6" : "none",
            outline: "none",
            transition: "box-shadow 0.2s, background 0.2s",
          }}
        >
          <FaEye />
          {isVisible && (
            <span
              style={{
                position: "absolute",
                top: "7px",
                right: "7px",
                width: "8px",
                height: "8px",
                background: "#3b82f6", // blue
                borderRadius: "50%",
                boxShadow: "0 0 2px #fff",
              }}
            />
          )}
        </button>
      </div>
    </div>
  );
} 