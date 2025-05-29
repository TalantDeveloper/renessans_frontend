import React, { useEffect, useState } from "react";
import { GenericModal } from "../../../../shared/components/modal/Modal";
import { GenericInput } from "../../../../shared/components/input/Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./NewsEditModal.module.css";

export const NewsEditModal = ({
  isEditOpen,
  setIsEditOpen,
  edit,
  editId,
  data,
}) => {
  const [editInputText, setEditInputText] = useState({
    title_uz: "",
    title_ru: "",
    title_en: "",
    full_news_uz: "",
    full_news_ru: "",
    full_news_en: "",
    img: null, // Image file
    category: "", // Default to empty
    reading_time: 1,
    is_main: false,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://sayt.renessans-edu.uz/api/news/categories/"
        );
        const result = await response.json();
        setCategories(result);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (editId && data.length > 0) {
      const currentData = data.find((item) => item.id === editId);
      if (currentData) {
        setEditInputText({
          title_uz: currentData.title_uz,
          title_ru: currentData.title_ru,
          title_en: currentData.title_en,
          full_news_uz: currentData.full_news_uz,
          full_news_ru: currentData.full_news_ru,
          full_news_en: currentData.full_news_en,
          img: currentData.image || null,
          category: currentData.category.id,
          reading_time: currentData.reading_time,
          is_main: currentData.is_main,
        });
      }
    }
  }, [editId, data]);

  const handleInputChange = (name, value) => {
    setEditInputText((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setEditInputText({
      ...editInputText,
      [name]: files && files.length > 0 ? files[0] : editInputText[name],
    });
  };

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append("title_uz", editInputText.title_uz);
    formData.append("title_ru", editInputText.title_ru);
    formData.append("title_en", editInputText.title_en);
    formData.append("full_news_uz", editInputText.full_news_uz);
    formData.append("full_news_ru", editInputText.full_news_ru);
    formData.append("full_news_en", editInputText.full_news_en);

    const selectedCategory = categories.find(
      (category) => category.id === parseInt(editInputText.category, 10)
    );
    if (selectedCategory) {
      formData.append("category", JSON.stringify(selectedCategory));
    }

    formData.append("reading_time", editInputText.reading_time);
    if (editInputText.img instanceof File) {
      formData.append("image", editInputText.img);
    }
    formData.append("is_main", editInputText.is_main);
    formData.append("posted_time", new Date().toISOString());

    try {
      await edit(formData);
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error editing news:", error);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <GenericModal
      title="Edit News"
      btn_text="Save"
      onClick={handleEdit}
      isOpen={isEditOpen}
      setIsOpen={setIsEditOpen}
    >
      <GenericInput
        labelText="Sarlavha (Uzbek)"
        name="title_uz"
        value={editInputText.title_uz}
        onChange={(e) => handleInputChange("title_uz", e.target.value)}
        type="text"
      />
      <GenericInput
        labelText="Sarlavha (Russian)"
        name="title_ru"
        value={editInputText.title_ru}
        onChange={(e) => handleInputChange("title_ru", e.target.value)}
        type="text"
      />
      <GenericInput
        labelText="Sarlavha (English)"
        name="title_en"
        value={editInputText.title_en}
        onChange={(e) => handleInputChange("title_en", e.target.value)}
        type="text"
      />

      <div>
        <label>To'liq yangilik (Uzb)</label>
        <ReactQuill
          value={editInputText.full_news_uz || ""}
          onChange={(value) => handleInputChange("full_news_uz", value)}
          modules={modules}
          formats={formats}
        />
      </div>
      <div>
        <label>To'liq yangilik (Rus)</label>
        <ReactQuill
          value={editInputText.full_news_ru || ""}
          onChange={(value) => handleInputChange("full_news_ru", value)}
          modules={modules}
          formats={formats}
        />
      </div>
      <div>
        <label>To'liq yangilik (Eng)</label>
        <ReactQuill
          value={editInputText.full_news_en || ""}
          onChange={(value) => handleInputChange("full_news_en", value)}
          modules={modules}
          formats={formats}
        />
      </div>

      <select
        name="category"
        value={editInputText.category}
        onChange={(e) => handleInputChange("category", e.target.value)}
      >
        <option value="" disabled>
          Kategoriyani tanlash
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <GenericInput
        labelText="Reading Time"
        name="reading_time"
        value={editInputText.reading_time}
        onChange={(e) => handleInputChange("reading_time", e.target.value)}
        type="number"
      />

      <div>
        <label>Rasm</label>
        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={handleFileChange}
        />
        {editInputText.img && !(editInputText.img instanceof File) && (
          <img
            src={editInputText.img}
            alt="Preview"
            style={{ width: "100px", height: "auto", marginTop: "10px" }}
          />
        )}
      </div>

      <div className={styles.is_main}>
        <label>Asosiymi</label>
        <input
          type="checkbox"
          name="is_main"
          checked={editInputText.is_main}
          onChange={(e) => handleInputChange("is_main", e.target.checked)}
        />
      </div>
    </GenericModal>
  );
};

export default NewsEditModal;
