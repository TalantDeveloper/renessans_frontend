import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import NewsTable from "./newsTable/NewsTable";
import NewsAddModal from "./newsAddModal/NewsAddModal";
import NewsEditModal from "./newsEditModal/NewEditModal";
import NewsCategoriesTable from "./newsTable/NewsCategoriesTable";
import axios from "axios";
import classes from "./NewsAdmin.module.css";

const API_URL = "https://sayt.renessans-edu.uz/api/news/";

export const NewsAdmin = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);

      const sortedData = response.data.sort(
        (a, b) => new Date(b.posted_time) - new Date(a.posted_time)
      );
      setData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const save = async (newData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(API_URL, newData);
      setData([response.data, ...data]);
    } catch (error) {
      console.error("Error adding news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const edit = async (newEditData) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`${API_URL}${editId}/`, newEditData);
      const updatedData = data.map((item) =>
        item.id === editId ? response.data : item
      );
      setData(updatedData);
    } catch (error) {
      console.error("Error editing news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={classes["container"]}>
      <h1 className={classes["bizningh1"]}>Yangiliklar</h1>
      <div className={classes["flex"]}>
        <Icon
          onClick={() => setIsOpen(true)}
          className={classes["add_icon"]}
          icon="icon-park-solid:add"
        />
        <div className={classes["search_box"]}>
          <input
            placeholder="Search Something"
            className={classes["search_input"]}
            type="text"
          />
          <Icon
            className={classes["search_icon"]}
            icon="material-symbols:search"
          />
        </div>
      </div>
      <NewsTable
        data={paginatedData}
        setData={setData}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setIsEditOpen={setIsEditOpen}
        setEditId={setEditId}
      />
      <div className={classes.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? classes.active : ""}
          >
            {page}
          </button>
        ))}
      </div>
      <NewsCategoriesTable />
      <NewsAddModal save={save} isOpen={isOpen} setIsOpen={setIsOpen} />
      <NewsEditModal
        data={data}
        edit={edit}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        editId={editId}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};
