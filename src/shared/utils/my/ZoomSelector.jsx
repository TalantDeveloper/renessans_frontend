import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { FaSearchPlus, FaSearchMinus, FaUndo } from "react-icons/fa";

const ZoomSelector = () => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomChange = (level) => {
    setZoomLevel(level);
    document.body.style.zoom = level; // Apply zoom globally
  };

  return (
    <div className="zoom-selector">
      <Tooltip id="zoom-reset" content="Sozlamalarni avvalgisiga qaytarish" />
      <Tooltip id="zoom-increase" content="Kattalashtirish" />
      <Tooltip id="zoom-decrease" content="Kichiklashtirish" />
      <button
        onClick={() => handleZoomChange(1)}
        className="zoom-button"
        data-tooltip-id="zoom-reset"
      >
        <FaUndo />
      </button>
      <button
        onClick={() => handleZoomChange(Math.min(zoomLevel + 0.2, 2))}
        className="zoom-button"
        data-tooltip-id="zoom-increase"
      >
        <FaSearchPlus />
      </button>
      <button
        onClick={() => handleZoomChange(Math.max(zoomLevel - 0.2, 0.8))}
        className="zoom-button"
        data-tooltip-id="zoom-decrease"
      >
        <FaSearchMinus />
      </button>
    </div>
  );
};

export default ZoomSelector;
