import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { GenericModal } from "../../../../../shared/components/modal/Modal";
import { GenericInput } from "../../../../../shared/components/input/Input";
import { useStatusContext } from "../../../../../context/StatusContextProvider/StatusContextProvider";

export const EventModal = ({ openModal, setOpenModal, selectedEvent }) => {
  const { t } = useTranslation();
  const { onSuccessStatus } = useStatusContext();

  const [inputText, setInputText] = useState({
    name: "",
    phone: "",
    reason: "",
  });

  // inputChanger
  const handleInputChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const chatId = "-1002252158044"; // Replace with your actual chat ID
      const token = "7443223152:AAHhNAB534F-i5sGUyKpR1AwBztad1tyduU"; // Replace with your actual bot token
      const url = `https://api.telegram.org/bot${token}/sendMessage`;

      // Sticker mapping based on selectedEvent
      const stickers = {
        "Event 1 Title":
          "CAACAgIAAxkBAAICe2JhRh90U2F30pDlcyIiipfmdBkBAAK8GQACxu9EV2cR1LKAyKpNugQ",
        "Event 2 Title":
          "CAACAgIAAxkBAAIBgeJhR5CrN_c1lpuZT9DOseJlLgABHQACMDQAAqxG0U1wVq04n6BgE",
        // Add more events and their corresponding stickers
      };

      const stickerId = stickers[selectedEvent] || ""; // Default to empty if no match

      const response = await axios.post(url, {
        chat_id: chatId,
        text: `Ism ✍: ${inputText.name}\nTelefon raqam ☎︎: ${inputText.phone}\nQo'shilishdan maqsad ﹆: ${inputText.reason}\nTadbir nomi ❑: ${selectedEvent}`, // Properly formatted
        sticker: stickerId, // Use the correct sticker ID
      });

      // Clear input fields after successful submission
      setInputText({
        name: "",
        phone: "",
        reason: "",
      });

      onSuccessStatus({
        title: "Successfully Sent!",
        message: "Your application has been sent.",
      });
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      // Handle errors appropriately
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <GenericModal
        btn_text={t(`joiningBtn`)}
        title={t(`joiningEvent`)}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      >
        <GenericInput
          onChange={(e) => handleInputChange(e)}
          labelText={t(`joiningName`)}
          name={"name"}
        />
        <GenericInput
          onChange={(e) => handleInputChange(e)}
          labelText={t(`joiningNumber`)}
          type="number"
          name={"phone"}
        />
        <GenericInput
          onChange={(e) => handleInputChange(e)}
          labelText={t(`joiningReason`)}
          name={"reason"}
        />
      </GenericModal>
    </form>
  );
};
