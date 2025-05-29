import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useStatusContext } from "../../context/StatusContextProvider/StatusContextProvider";

import classes from "./AuthSelection.module.css";

const AuthSelection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [inputText, setInputText] = useState({
    name: "",
    surename: "",
    phone: "",
    email: "",
    userMessage: "",
  });
  const { onSuccessStatus } = useStatusContext();

  // Handle input change
  const handlInputChanger = (e) => {
    const { name, value } = e.target;
    setInputText({ ...inputText, [name]: value });
  };

  // Bot token and chat ID
  const token = "7650029553:AAE61XUJarEQ8WuABMgaKreJo56PpTK-1f4";
  const chatId = "556841744";

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear form after submission
    setInputText({
      name: "",
      surename: "",
      phone: "",
      email: "",
      userMessage: "",
    });

    try {
      const url = `https://api.telegram.org/bot${token}/sendMessage`;

      // Format the message
      const message = `
Ism: ${inputText.name}
Familiya: ${inputText.surename}
Telefon: ${inputText.phone}
Email: ${inputText.email}
Savol: ${inputText.userMessage}
      `;

      // Send data to Telegram
      await axios.post(url, {
        chat_id: chatId,
        text: message,
      });

      // Show success message
      onSuccessStatus({
        title: t("Murojaatingiz muvaffaqiyatli yuborildi!!!"),
        message: t(" "),
      });
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
    }
  };

  return (
    <div className={classes["message_form"]}>
      <div data-aos="fade-right" className={classes["left_side"]}>
        <h3 className={classes["form_title"]}>
          {t("Rektor virtual qabulxonasi")}
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            placeholder={t("nameOfPlaceholder")}
            className={classes["form_input"]}
            type="text"
            name="name"
            value={inputText.name}
            onChange={handlInputChanger}
            required
          />
          <input
            placeholder={t("surnameOfPlaceholder")}
            className={classes["form_input"]}
            type="text"
            name="surename"
            value={inputText.surename}
            onChange={handlInputChanger}
            required
          />
          <input
            placeholder={t("numberOfPlaceholder")}
            className={classes["form_input"]}
            type="text"
            name="phone"
            value={inputText.phone}
            onChange={handlInputChanger}
            required
          />
          <input
            placeholder={t("emailOfPlaceholder")}
            className={classes["form_input"]}
            type="text"
            name="email"
            value={inputText.email}
            onChange={handlInputChanger}
            required
          />
          <textarea
            placeholder={t("messageOfPlaceholder")}
            className={classes["form_input"]}
            name="userMessage"
            value={inputText.userMessage}
            cols="30"
            rows="10"
            onChange={handlInputChanger}
            required
          ></textarea>
          <button type="submit" className={classes["form_btn"]}>
            {t("Murojaat yuborish")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthSelection;
