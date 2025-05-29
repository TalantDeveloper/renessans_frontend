import React, { useState, useEffect } from "react";
import { FaVolumeUp } from "react-icons/fa"; // Import the volume icon from react-icons
import { useAudioDictor } from "./AudioDictor";

const AudioDictorButton = () => {
  const { readSelectedText, isReading, setIsReading } = useAudioDictor();
  const [buttonPosition, setButtonPosition] = useState({
    top: 0,
    left: 0,
    visible: false,
  });
  const [utterance, setUtterance] = useState(null); // Speech utterance state

  // Function to calculate the position of the selected text
  const calculatePosition = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.top > 0 && rect.left > 0) {
        setButtonPosition({
          top: rect.top - 50, // Position the button 50px above the selected text
          left: rect.left + rect.width / 2 - 20, // Center the button horizontally above the selected text
          visible: true, // Show the button
        });
      }
    }
  };

  // Function to start reading selected text
  const startReading = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1; // Optional: Customize speech rate
    speech.pitch = 1; // Optional: Customize speech pitch
    speech.onend = () => {
      setIsReading(false); // Set reading state to false when reading is finished
    };
    setUtterance(speech);
    window.speechSynthesis.speak(speech);
    setIsReading(true);
  };

  // Function to stop reading
  const stopReading = () => {
    if (utterance) {
      window.speechSynthesis.cancel(); // Stop speaking
      setIsReading(false);
    }
  };

  // Hook to listen for text selection changes and adjust button position
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const selectedText = selection.toString().trim();

      // Only start reading if the user has selected text
      if (selectedText && !isReading) {
        startReading(selectedText); // Automatically start reading when text is selected
        calculatePosition(); // Update button position
      } else if (!selectedText && isReading) {
        stopReading(); // Stop reading when text is deselected
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    // Cleanup event listener
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [isReading, utterance]);

  // Hide the button if no text is selected
  const hideButton = () => {
    setButtonPosition((prevPosition) => ({
      ...prevPosition,
      visible: false,
    }));
  };

  // Handle clicking the icon to stop reading
  const handleClick = () => {
    stopReading(); // Manually stop reading when the icon is clicked
    hideButton();
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: "absolute",
        top: buttonPosition.top + "px", // Dynamic top position based on selected text
        left: buttonPosition.left + "px", // Dynamic left position based on selected text
        zIndex: 1000, // Ensure the button is above other content
        visibility: buttonPosition.visible ? "visible" : "hidden", // Only show the button when text is selected
      }}
    >
      <FaVolumeUp
        size={20} // Icon size
        color="#007BFF"
        style={{
          cursor: "pointer",
          transform: "translate(-80%, -100%)", // Ensure the icon is centered above the text
        }}
      />
    </div>
  );
};

export default AudioDictorButton;
