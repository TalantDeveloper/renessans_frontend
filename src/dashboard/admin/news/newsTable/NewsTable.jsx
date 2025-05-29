import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { CircularProgress, Modal, Box } from "@mui/material";
import classes from "./NewsTable.module.css";
import { format } from "date-fns";

export const NewsTable = ({
  data,
  setData,
  setIsLoading,
  isLoading,
  setEditId,
  setIsEditOpen,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataDelete = async (id) => {
    const confirmed = window.confirm("Bu elementni o'chirishga aminmisiz?");
    if (!confirmed) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://sayt.renessans-edu.uz/api/news/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Yangilikni o'chirishda xatolik yuz berdi.");
      }

      const filtered = data.filter((item) => item.id !== id);
      setData(filtered); // State-ni yangilang
    } catch (error) {
      console.error("Yangilikni o'chirishda xatolik:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    setIsEditOpen(true);
    setEditId(id);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy, HH:mm");
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <CircularProgress className={classes["loader"]} />;
  }

  return (
    <div className={classes["table_wrapper"]}>
      <table className={classes["table_container"]}>
        <thead>
          <tr className={classes["table_header_box"]}>
            {/* <th className={classes["table_header"]}>ID</th> */}
            <th className={classes["table_header"]}>Kategoriya</th>
            <th className={classes["table_header"]}>Sarlavha (UZ)</th>
            <th className={classes["table_header"]}>Sarlavha(RU)</th>
            <th className={classes["table_header"]}>Sarlavha (EN)</th>
            <th className={classes["table_header"]}>Rasm</th>
            <th className={classes["table_header"]}>Asosiymi?</th>
            <th className={classes["table_header"]}>Qo'yilgan vaqti</th>
            <th className={classes["table_header"]}>Harakat</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className={classes["table_sections"]}>
              {/* <td className={classes["table_text"]}>{item.id}</td> */}
              <td className={classes["table_text"]}>{item.category}</td>
              <td className={classes["table_text"]}>{item.title_uz}</td>
              <td className={classes["table_text"]}>{item.title_ru}</td>
              <td className={classes["table_text"]}>{item.title_en}</td>
              <td className={classes["table_text"]}>
                <img
                  src={item.image}
                  alt={item.title_uz}
                  style={{
                    width: "600px",
                    height: "100px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(item.image)}
                />
              </td>
              <td className={classes["table_text"]}>
                {item.is_main ? "Ha" : "Yo'q"}
              </td>
              <td className={classes["table_text"]}>
                {formatDate(item.posted_time)}
              </td>{" "}
              {/* Formatted date */}
              <td
                className={`${classes["table_text"]} ${classes["action_icons_box"]}`}
              >
                <Icon
                  onClick={() => dataDelete(item.id)}
                  className={classes["action_icons"]}
                  icon="ph:trash"
                />
                <Icon
                  onClick={() => handleEdit(item.id)}
                  className={classes["action_icons"]}
                  icon="ic:baseline-edit"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        className={classes.modal}
      >
        <Box className={classes.modalBox}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Ko'rinish"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default NewsTable;
