import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Aos from "aos";
import { IoSendOutline } from "react-icons/io5";

import AdminLayout from "./dashboard/shared/layout/AdminLayout";
import Layout from "./shared/layout/Layout";
import AuthLayout from "./auth/AuthLayout";

import { adminRoutes } from "./shared/routes/configs/adminRoutes";
import { studentRoutes } from "./shared/routes/configs/studentRoutes";

import "./shared/assets/global.css";
import "./shared/assets/subscribe/TelegramSubscribe.module.css";
import LoaderImage from "./shared/assets/images/loader.svg.png";

const Loader = () => (
  <div className="loader-container">
    <img className="loaderImage" src={LoaderImage} alt="" />
    <section className="loader">
      <div className="slider" style={{ "--i": 0 }}></div>
      <div className="slider" style={{ "--i": 1 }}></div>
      <div className="slider" style={{ "--i": 2 }}></div>
      <div className="slider" style={{ "--i": 3 }}></div>
      <div className="slider" style={{ "--i": 4 }}></div>
    </section>
  </div>
);

const TelegramSubscribe = ({ onClose }) => (
  <div>
    <div className="modal-overlay" onClick={onClose}></div>

    <div className="telegram-subscribe-container">
      <div className="telegram-subscribe">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="allCollected">
          <div className="imageCollected">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" // Replace with your own Telegram logo if needed
              alt="Telegram"
              className="telegram-logo"
            />
            <p>
              Renessans ta'lim universiteti yangiliklarini rasmiy telegram
              sahifalarimizda kuzatishni unitmang!!
            </p>
          </div>
          <div className="collected">
            <a
              href="https://t.me/renessansedu_uz"
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-link"
            >
              A'zo bo‘lish  
              <IoSendOutline />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const location = useLocation();
  const { pathname } = location;
  const [loading, setLoading] = useState(true);
  const [showTelegramPrompt, setShowTelegramPrompt] = useState(false);

  const handleDisplayLayouts = () => {
    if (pathname.includes("admin")) {
      return <AdminLayout routes={adminRoutes} />;
    }

    if (pathname.includes("student")) {
      return <AdminLayout routes={studentRoutes} />;
    }

    if (pathname.includes("auth")) {
      return <AuthLayout />;
    }

    return <Layout />;
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
      mirror: true,
      once: false,
    });
    const timer = setTimeout(() => setLoading(false), 3000);

    const telegramTimer = setTimeout(() => setShowTelegramPrompt(true), 2200);

    return () => {
      clearTimeout(timer);
      clearTimeout(telegramTimer);
    };
  }, []);

  const handleCloseTelegramPrompt = () => {
    setShowTelegramPrompt(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      {handleDisplayLayouts()}
      {/* {!pathname.includes("admin") && showTelegramPrompt && (
        <TelegramSubscribe onClose={handleCloseTelegramPrompt} />
      )} */}
    </div>
  );
};

export default App;
