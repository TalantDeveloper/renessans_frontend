import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLink, FaTrash, FaEdit, FaImage } from "react-icons/fa";
import styles from "./Partners.module.css";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPartner, setCurrentPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    link_name: "",
    link_url: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const apiUrl = "https://sayt.renessans-edu.uz/api/partner/";

  // Fetch partners data (GET)
  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.get(apiUrl);
      setPartners(response.data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  // Delete partner (DELETE)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}${id}/`);
      setPartners((prev) => prev.filter((partner) => partner.id !== id));
    } catch (error) {
      console.error("Error deleting partner:", error);
    }
  };

  // Save partner (add or edit)
  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("link_name", formData.link_name);
      formDataToSend.append("link_url", formData.link_url);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      if (currentPartner) {
        // Update existing partner
        const response = await axios.put(
          `${apiUrl}${currentPartner.id}/`,
          formDataToSend
        );
        setPartners((prev) =>
          prev.map((partner) =>
            partner.id === currentPartner.id ? response.data : partner
          )
        );
      } else {
        // Add new partner
        const response = await axios.post(apiUrl, formDataToSend);
        setPartners((prev) => [...prev, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving partner:", error);
    }
  };

  const openModal = (partner = null) => {
    setCurrentPartner(partner);
    setFormData(
      partner
        ? {
            name: partner.name,
            link_name: partner.link_name,
            link_url: partner.link_url,
            image: null,
          }
        : { name: "", link_name: "", link_url: "", image: null }
    );
    setImagePreview(partner ? partner.image : null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentPartner(null);
    setFormData({ name: "", link_name: "", link_url: "", image: null });
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hamkorlar</h1>
      <button className={styles.addButton} onClick={() => openModal()}>
        Yangi hamkor qo'shish
      </button>
      <div className={styles.partnerList}>
        {partners.map((partner) => (
          <div key={partner.id} className={styles.partnerCard}>
            <img
              src={partner.image}
              alt={partner.name}
              className={styles.partnerImage}
            />
            <h3 className={styles.partnerName}>{partner.name}</h3>
            <p className={styles.partnerLink}>
              <a
                href={partner.link_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {partner.link_name}
              </a>
            </p>
            <div className={styles.actions}>
              <button
                onClick={() => openModal(partner)}
                className={`${styles.editButton} ${styles.actionButton}`}
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(partner.id)}
                className={`${styles.deleteButton} ${styles.actionButton}`}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              {currentPartner ? "Tahrirlash" : "Yangi qo'shish"}
            </h2>
            <label className={styles.modalLabel}>
              Sarlavha:
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={styles.modalInput}
              />
            </label>
            <label className={styles.modalLabel}>
              Havola nomi:
              <input
                type="text"
                value={formData.link_name}
                onChange={(e) =>
                  setFormData({ ...formData, link_name: e.target.value })
                }
                className={styles.modalInput}
              />
            </label>
            <label className={styles.modalLabel}>
              Havola (URL):
              <input
                type="text"
                value={formData.link_url}
                onChange={(e) =>
                  setFormData({ ...formData, link_url: e.target.value })
                }
                className={styles.modalInput}
              />
            </label>
            <label className={styles.modalLabel}>
              Rasm:
              <div className={styles.imageUploadWrapper}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.imageInput}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className={styles.imagePreview}
                  />
                )}
              </div>
            </label>
            <div className={styles.modalActions}>
              <button onClick={handleSave} className={styles.saveButton}>
                Saqlash
              </button>
              <button onClick={closeModal} className={styles.cancelButton}>
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners;
