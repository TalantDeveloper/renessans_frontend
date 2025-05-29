import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    document.body.classList.toggle("dark-mode", savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <button onClick={toggleDarkMode} className="dark-mode-button">
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default DarkMode;
