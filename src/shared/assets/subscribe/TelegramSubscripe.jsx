import React from "react";
import { IoSendOutline } from "react-icons/io5";
import styles from "./TelegramSubscribe.module.css"; // Assuming you're using CSS modules

const TelegramSubscribe = ({ onClose }) => (
  <div>
    <div className={styles.modalOverlay} onClick={onClose}></div>

    <div className={styles.telegramSubscribeContainer}>
      <div className={styles.telegramSubscribe}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <div className={styles.allCollected}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
            alt="Telegram"
            className={styles.telegramLogo}
          />
          <div className={styles.collected}>
            <p>
              Yangiliklardan doimiy boxabar bo‘lib turish uchun universitetning
              rasmiy telegram kanaliga obuna bo‘ling!
            </p>
            <a
              href="https://t.me/renessansedu_uz"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.telegramLink}
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

export default TelegramSubscribe;
