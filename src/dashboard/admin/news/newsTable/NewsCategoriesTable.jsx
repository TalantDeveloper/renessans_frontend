import React, { useState, useEffect } from "react";
import styles from "./NewsCategoriesTable.module.css";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSave,
  FaArrowDown,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const NewsCategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    fetch("https://sayt.renessans-edu.uz/api/news/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        const response = await fetch(
          "https://sayt.renessans-edu.uz/api/news/categories/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newCategory }),
          }
        );
        const newCategoryObj = await response.json();
        setCategories([...categories, newCategoryObj]);
        setShowAddModal(false);
        setNewCategory("");
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const handleEditCategory = async (id) => {
    if (editedCategory.trim()) {
      try {
        const response = await fetch(
          `https://sayt.renessans-edu.uz/api/news/categories/${id}/`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: editedCategory }),
          }
        );
        const updatedCategory = await response.json();
        setCategories(
          categories.map((cat) => (cat.id === id ? updatedCategory : cat))
        );
        setEditingCategoryId(null);
        setEditedCategory("");
      } catch (error) {
        console.error("Error editing category:", error);
      }
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await fetch(
        `https://sayt.renessans-edu.uz/api/news/categories/${deleteCategoryId}/`,
        {
          method: "DELETE",
        }
      );
      setCategories(categories.filter((cat) => cat.id !== deleteCategoryId));
      setShowDeleteModal(false);
      setDeleteCategoryId(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const toggleDetails = (id) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <button
          onClick={() => setShowAddModal(true)}
          className={styles.addButton}
        >
          <FaPlus /> Yangi kategoriya qo'shish
        </button>
      </div>

      <div className={styles.integrated}>
        <button onClick={toggleVisibility} className={styles.toggleButton}>
          {isVisible ? <FaEyeSlash /> : <FaEye />} Kategoriyalarni ochish/yopish
        </button>
      </div>

      {isVisible && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Kategoriya nomi</th>
              <th>Harakat</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <React.Fragment key={category.id}>
                <tr>
                  <td>{category.id}</td>
                  <td>
                    {editingCategoryId === category.id ? (
                      <input
                        type="text"
                        value={editedCategory}
                        onChange={(e) => setEditedCategory(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className={styles.integrated}>
                    {editingCategoryId === category.id ? (
                      <button
                        onClick={() => handleEditCategory(category.id)}
                        className={styles.saveButton}
                      >
                        <FaSave /> Saqlash
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingCategoryId(category.id)}
                        className={styles.editButton}
                      >
                        <FaEdit /> Tahrirlash
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setDeleteCategoryId(category.id);
                      }}
                      className={styles.deleteButton}
                    >
                      <FaTrash /> O'chirish
                    </button>
                  </td>
                </tr>
                {showDetails[category.id] && (
                  <tr>
                    <td colSpan="4">
                      <p>Additional information/details about this category.</p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Category Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Yangi kategoriya qo'shish</h3>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category Name"
            />
            <div className={styles.modalActions}>
              <button
                onClick={handleAddCategory}
                className={styles.modalButton}
              >
                <FaPlus /> Qo'shish
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className={styles.modalButtonCancel}
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Are you sure you want to delete this category?</h3>
            <div className={styles.modalActions}>
              <button
                onClick={handleDeleteCategory}
                className={styles.modalButtonDanger}
              >
                <FaTrash /> Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className={styles.modalButtonCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsCategoriesTable;
