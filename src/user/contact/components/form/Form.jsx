import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { useStatusContext } from "../../../../context/StatusContextProvider/StatusContextProvider";

import classes from "./Form.module.css";

export const Form = () => {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState({
    name: "",
    surename: "",
    phone: "",
    email: "",
    userMessage: "",
  });
  const { onSuccessStatus } = useStatusContext();

  // input
  const handlInputChanger = (e) => {
    const { name, value } = e.target;

    setInputText({ ...inputText, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const chatId = "-1002299355643"; // New chat ID
      const token = "7443223152:AAHhNAB534F-i5sGUyKpR1AwBztad1tyduU"; // New bot token

      const url = `https://api.telegram.org/bot${token}/sendMessage`;

      const message = `
        Ism: ${inputText?.name}
        Familiya: ${inputText?.surename}
        Telefon: ${inputText?.phone}
        Elektron pochta: ${inputText?.email}
        Savol: ${inputText?.userMessage}
      `;

      await axios.post(url, {
        chat_id: chatId,
        text: message,
      });

      onSuccessStatus({
        message: "Murojaatingiz muvaffaqiyatli yuborildi!!!",
      });

      // Clear the input fields after successful data submission
      setInputText({
        name: "",
        surename: "",
        phone: "",
        email: "",
        userMessage: "",
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className={classes["message_form"]}>
      <div data-aos="fade-right" className={classes["left_side"]}>
        <h3 className={classes["form_title"]}>{t("Xabar yuborish")}</h3>
        <form onSubmit={handleSubmit}>
          <input
            placeholder={t("nameOfPlaceholder")}
            className={classes["form_input"]}
            type="text"
            name="name"
            onChange={(e) => handlInputChanger(e)}
            required
          />
          <input
            placeholder={t("surnameOfPlaceholder")}
            className={classes["form_input"]}
            type="text"
            name="surename"
            onChange={(e) => handlInputChanger(e)}
            required
          />
          <input
            placeholder={t("numberOfPlaceholder")}
            className={classes["form_input"]}
            type="text"
            name="phone"
            onChange={(e) => handlInputChanger(e)}
            required
          />
          <input
            placeholder={t("emailOfPlaceholder")}
            className={classes["form_input"]}
            type="text"
            name="email"
            onChange={(e) => handlInputChanger(e)}
            required
          />
          <textarea
            placeholder={t("messageOfPlaceholder")}
            className={classes["form_input"]}
            name="userMessage"
            cols="30"
            rows="10"
            userMessage="userMessage"
            onChange={(e) => handlInputChanger(e)}
            required
          ></textarea>
          <button type="submit" className={classes["form_btn"]}>
            {t("Xabarni yuborish")}
          </button>
        </form>
      </div>
      <div data-aos="fade-left" className={classes["right_side"]}>
        <h3 className={classes["advice_title"]}>{t("adviceOfContact")}</h3>
        <p className={classes["advice_descr"]}>{t("adviceDescr")}</p>

        <a href="tel:+998555067007">
          <p
            style={{
              border: "1px solid #fff",
              padding: "15px",
              borderRadius: "7px",
            }}
            className={classes["advice_descr"]}
          >
            +998 55 506 70 07
          </p>
        </a>
      </div>
    </div>
  );
};
