import React, { createContext, useContext, useState } from "react";

// Create the context for AudioDictor
const AudioDictorContext = createContext();

export const useAudioDictor = () => {
  return useContext(AudioDictorContext);
};

export const AudioDictorProvider = ({ children }) => {
  const [isReading, setIsReading] = useState(false); // Manage the reading state

  const speakText = (text) => {
    if (text.trim()) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = 1; // Optional: Customize speech rate
      speech.pitch = 1; // Optional: Customize speech pitch
      window.speechSynthesis.speak(speech);
    }
  };

  const readSelectedText = () => {
    const selectedText = window.getSelection().toString(); // Get selected text
    if (selectedText) {
      speakText(selectedText);
      setIsReading(true); // Update state when reading starts
    } else {
      alert("Please select some text on the page to read.");
    }
  };

  return (
    <AudioDictorContext.Provider
      value={{ readSelectedText, isReading, setIsReading }}
    >
      {children}
    </AudioDictorContext.Provider>
  );
};
