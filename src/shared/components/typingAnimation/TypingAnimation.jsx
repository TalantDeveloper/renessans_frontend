import React, { useEffect } from "react";
import Typed from "typed.js";

const TypingAnimation = ({ text, className }) => {
  useEffect(() => {
    const options = {
      strings: text,
      typeSpeed: 15,
      backSpeed: 20,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
      showCursor: false,
    };

    const typed = new Typed("p", options);

    return () => {
      typed.destroy(); // Clean up the Typed instance to prevent memory leaks
    };
  }, []);

  return <p className={className}></p>;
};

export default TypingAnimation;
