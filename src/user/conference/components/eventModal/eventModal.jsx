import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import classes from "./eventModal.module.css";
import { GenericModal } from "../../../../shared/components/modal/Modal";
import { GenericInput } from "../../../../shared/components/input/Input";
import { useStatusContext } from "../../../../context/StatusContextProvider/StatusContextProvider";
import { botUrl, botToken, chatId } from "../../../../home/BaseData";

export const EventModal = ({ openModal, setOpenModal, selectedConference }) => {
  const { t, i18n } = useTranslation();
  const { onSuccessStatus } = useStatusContext();

  const [inputText, setInputText] = useState({
    name: "",
    phone: "",
    reason: "",
    email: "",
    file: null,
    filePreview: null,
    conferenceId: "",
    conferenceEventId: "",
  });

  const [errors, setErrors] = useState({});
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Set selected conference and filter events when modal opens
  useEffect(() => {
    if (selectedConference) {
      setInputText((prev) => ({
        ...prev,
        conferenceId: selectedConference.id.toString(),
        conferenceEventId: "",
      }));
      setFilteredEvents(selectedConference.conference_events || []);
    }
  }, [selectedConference]);

  const handleInputChange = (e) => {
    setInputText({ ...inputText, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!inputText.name) newErrors.name = t("errorName");
    if (!inputText.phone) newErrors.phone = t("errorPhone");
    if (!inputText.email) newErrors.email = t("errorEmail");
    if (!inputText.conferenceEventId)
      newErrors.conferenceEventId = t("errorEvent");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFields()) return;

    const { name, phone, email, reason, conferenceEventId, file } = inputText;
    const selectedEvent = filteredEvents.find(
      (event) => event.id === parseInt(conferenceEventId, 10)
    );

    const message = ` Ism: ${name} 
      Telefon: ${phone} 
      Email: ${email} 
      Sho'ba: ${selectedEvent?.name || "Noma'lum"} 
      Sabab: ${reason}`;

    const formDataObj = new FormData();
    formDataObj.append("chat_id", chatId);
    formDataObj.append("caption", message);

    if (file) {
      formDataObj.append("document", file);
    }

    try {
      const response = await fetch(
        `${botUrl}${botToken}/sendDocument`,
        {
          method: "POST",
          body: formDataObj,
        }
      );
      const data = await response.json();
      if (data.ok) {
        onSuccessStatus({ title: t("successMessage") });
        setInputText({
          name: "",
          phone: "",
          reason: "",
          email: "",
          file: null,
          filePreview: null,
          conferenceId: "",
          conferenceEventId: "",
        });
        setOpenModal(false);
      } else {
        alert(t("errorSubmission"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert(t("errorSubmission"));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const filePreview = file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null;
        setInputText({ ...inputText, file, filePreview });
      }
    },
    accept: ".pdf, .doc, .docx, .jpg, .jpeg, .png",
  });

  return (
    <form onSubmit={handleSubmit}>
      <GenericModal
        btn_text={t(`joiningBtn`)}
        title={t(`joiningEvent`)}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      >
        {/* Name */}
        <GenericInput
          onChange={handleInputChange}
          labelText={
            <>
              {t("Ism, familya, sharifingiz")}{" "}
              <span style={{ color: "red" }}>*</span>
            </>
          }
          name="name"
          value={inputText.name}
          error={errors.name}
        />

        {/* Phone */}
        <GenericInput
          onChange={handleInputChange}
          labelText={
            <>
              {t(`joiningNumber`)} <span style={{ color: "red" }}>*</span>
            </>
          }
          type="number"
          name="phone"
          value={inputText.phone}
          error={errors.phone}
        />

        {/* Email */}
        <GenericInput
          onChange={handleInputChange}
          labelText={
            <>
              {t("emailOfPlaceholder")} <span style={{ color: "red" }}>*</span>
            </>
          }
          name="email"
          type="email"
          value={inputText.email}
          error={errors.email}
        />

        {/* Reason */}
        <GenericInput
          onChange={handleInputChange}
          labelText={t("Nima uchun bu konferensiyada ishtiroq etmoqchisiz?")}
          name="reason"
          value={inputText.reason}
        />

        <div className={classes["select-container"]}>
          <label>
            {t("Sho'bani tanlang")} <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="conferenceEventId"
            value={inputText.conferenceEventId}
            onChange={handleInputChange}
            className={classes["select-input"]}
            disabled={!filteredEvents.length}
          >
            <option value="">{t("Tanlang")}</option>
            {filteredEvents.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
          {errors.conferenceEventId && (
            <p style={{ color: "red" }}>{errors.conferenceEventId}</p>
          )}
        </div>

        <div
          {...getRootProps()}
          className="drag-and-drop-area"
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            textAlign: "center",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          <p>{t("Faylni shu yerga tashlang yoki qurilmangizdan tanlang")}</p>
          {errors.file && <p style={{ color: "red" }}>{errors.file}</p>}
          {inputText.file && !inputText.filePreview && (
            <p>{inputText.file.name}</p>
          )}
          {inputText.filePreview && (
            <img
              src={inputText.filePreview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          )}
        </div>
      </GenericModal>
    </form>
  );
};
