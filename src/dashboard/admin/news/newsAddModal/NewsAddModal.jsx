import React, { useState, useEffect } from "react";
import { GenericInput } from "../../../../shared/components/input/Input";
import { GenericModal } from "../../../../shared/components/modal/Modal";
import styles from "./NewsAddModal.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const NewsAddModal = ({ save, isOpen, setIsOpen, setNewsList }) => {
  const initialInputState = {
    titleUz: "",
    titleRu: "",
    titleEn: "",
    fullNewsUz: "",
    fullNewsRu: "",
    fullNewsEn: "",
    image: null,
    category: "",
    readingTime: "",
    isMain: false,
  };

  const [addInputText, setAddInputText] = useState(initialInputState);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch("https://sayt.renessans-edu.uz/api/news/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleInputChange = (name, value) => {
    setAddInputText({
      ...addInputText,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setAddInputText({
      ...addInputText,
      image: e.target.files[0],
    });
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!addInputText.titleUz.trim())
      validationErrors.titleUz = "Title Uz is required.";
    if (!addInputText.category)
      validationErrors.category = "Category is required.";
    if (!addInputText.readingTime || addInputText.readingTime <= 0)
      validationErrors.readingTime = "Valid reading time is required.";
    if (!addInputText.image) validationErrors.image = "Image is required.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleAdd = () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title_uz", addInputText.titleUz);
    formData.append("title_ru", addInputText.titleRu);
    formData.append("title_en", addInputText.titleEn);
    formData.append("full_news_uz", addInputText.fullNewsUz);
    formData.append("full_news_ru", addInputText.fullNewsRu);
    formData.append("full_news_en", addInputText.fullNewsEn);
    formData.append("image", addInputText.image);
    formData.append("category", addInputText.category);
    formData.append("reading_time", addInputText.readingTime);
    formData.append("is_main", addInputText.isMain);

    save(formData)
      .then(() => {
        setAddInputText(initialInputState);
        setErrors({});
        setIsOpen(false);
      })
      .catch((error) => {
        console.error("Error adding news:", error);
      });
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "indent",
    "direction",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
    "formula",
  ];

  return (
    <GenericModal
      title={"Add News"}
      btn_text={"Save"}
      onClick={handleAdd}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="space-y-4">
        <GenericInput
          labelText="Title Uz"
          name="titleUz"
          value={addInputText.titleUz}
          onChange={(e) => handleInputChange("titleUz", e.target.value)}
          type="text"
          error={errors.titleUz}
        />
        {errors.titleUz && <p className={styles.error}>{errors.titleUz}</p>}

        <GenericInput
          labelText="Title Ru"
          name="titleRu"
          value={addInputText.titleRu}
          onChange={(e) => handleInputChange("titleRu", e.target.value)}
          type="text"
        />

        <GenericInput
          labelText="Title En"
          name="titleEn"
          value={addInputText.titleEn}
          onChange={(e) => handleInputChange("titleEn", e.target.value)}
          type="text"
        />

        <div className={styles.formContainer}>
          <label htmlFor="fullNewsUz">To'liq yangilik (Uz)</label>
          <ReactQuill
            value={addInputText.fullNewsUz}
            onChange={(value) => handleInputChange("fullNewsUz", value)}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>

        <div className={styles.formContainer}>
          <label htmlFor="fullNewsRu">To'liq yangilik (Ru)</label>
          <ReactQuill
            value={addInputText.fullNewsRu}
            onChange={(value) => handleInputChange("fullNewsRu", value)}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>

        <div className={styles.formContainer}>
          <label htmlFor="fullNewsEn">To'liq yangilik (En)</label>
          <ReactQuill
            value={addInputText.fullNewsEn}
            onChange={(value) => handleInputChange("fullNewsEn", value)}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>

        <div className={styles.formContainer}>
          <label htmlFor="category">Kategoriya</label>
          <select
            id="category"
            name="category"
            className={styles.categorySelect}
            value={addInputText.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          >
            <option value="">Kategoriyani tanlang</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && <p className={styles.error}>{errors.category}</p>}
        </div>

        <div className={styles.imageUploadContainer}>
          <label htmlFor="image">Rasm yuklash</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {addInputText.image && (
            <img
              className={styles.imagePreview}
              src={URL.createObjectURL(addInputText.image)}
              alt="Image preview"
            />
          )}
          {errors.image && <p className={styles.imageError}>{errors.image}</p>}
        </div>

        <div className={styles.formContainer}>
          <label htmlFor="readingTime">O'qish vaqti (minut)</label>
          <input
            id="readingTime"
            name="readingTime"
            type="number"
            value={addInputText.readingTime}
            min="1"
            className={styles.readingTimeInput}
            onChange={(e) => handleInputChange("readingTime", e.target.value)}
          />
          {errors.readingTime && (
            <p className={styles.readingTimeError}>{errors.readingTime}</p>
          )}
        </div>

        <div className={styles.checkboxContainer}>
          <label htmlFor="isMain">Yangilik asosiymi?</label>
          <input
            id="isMain"
            name="isMain"
            type="checkbox"
            checked={addInputText.isMain}
            onChange={(e) => handleInputChange("isMain", e.target.checked)}
            className={styles.checkboxInput}
          />
        </div>
      </div>
    </GenericModal>
  );
};

export default NewsAddModal;
