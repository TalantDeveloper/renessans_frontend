import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import classes from "./LibRary.module.css";
import { CARD_OBJ } from "./card";
import { LiberyModal } from "../LibraryAddCard/LiberyModal";
import { LiberyEditModal } from "../LibraryEdit/LiberyEditModal";
import { CircularProgress } from "@mui/material";

const LibRaryClass = () => {
  const { libraryId } = useParams();
  const [data, setData] = useState(CARD_OBJ);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  // save
  const save = (newData) => {
    setData([newData, ...data]);
    setIsLoading(true);
  };

  //   edit
  const edit = (newEditData) => {
    const newEdition = data.map((value) =>
      value.id == editId ? newEditData : value
    );
    setData(newEdition);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [data]);

  useEffect(() => {
    const filteredBooks = data.filter(
      (value) =>
        value.grade == libraryId.replace(":", "") ||
        value.subject
          .toLowerCase()
          .includes(libraryId.replace(":", "").toLowerCase())
    );
    setData(filteredBooks);
  }, [libraryId]);

  const dataDelete = (id) => {
    const filtered = data.filter((value) => value.id !== id);
    setData(filtered);
    setIsLoading(true);
  };

  // edit
  const handleEdit = (id) => {
    setIsEditOpen(true);
    setEditId(id);
  };

  return (
    <div className={classes["container"]}>
      <h1>OnlineLibrary</h1>
      <div className={classes["flex"]}>
        <Icon
          onClick={() => setIsOpen(true)}
          className={classes["add_icon"]}
          icon="icon-park-solid:add"
        />
        <div className={classes["search_box"]}>
          <input
            placeholder="Search Smth"
            className={classes["search_input"]}
            type="text"
          />
          <Icon
            className={classes["search_icon"]}
            icon="material-symbols:search"
          />
        </div>
      </div>
      <div className={classes["cards"]}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          data.map((e, index) => {
            return (
              <div className={classes["card"]} id={e.id} key={index}>
                <div className={classes["classTitle"]}>
                  <h3>{`${e.grade} sinf ${e.subject}`}</h3>
                  <div className={classes["new"]}>
                    <p>YANGI</p>
                  </div>
                </div>
                <div className={classes["cardSection"]}>
                  <div className={classes["date"]}>
                    <div className={classes["dateQuestion"]}>
                      <div className={classes["radius"]}></div>
                      <p>Qo’shilgan sanasi:</p>
                    </div>
                    <div className={classes["dateBtn"]}>
                      <p>{e.date}</p>
                    </div>
                  </div>
                  <div className={classes["date"]}>
                    <div className={classes["dateQuestion"]}>
                      <div className={classes["radius"]}></div>
                      <p>Kitob Varroqi:</p>
                    </div>
                    <div className={classes["dateBtn"]}>
                      <p>{e.bookCover}</p>
                    </div>
                  </div>
                  <div className={classes["date"]}>
                    <div className={classes["dateQuestion"]}>
                      <div className={classes["radius"]}></div>
                      <p>Kitob Turi:</p>
                    </div>
                    <div className={classes["dateBtn"]}>
                      <p>{e.bookType}</p>
                    </div>
                  </div>
                  <div className={classes["date"]}>
                    <div className={classes["dateQuestion"]}>
                      <div className={classes["radius"]}></div>
                      <p>Til:</p>
                    </div>
                    <div className={classes["dateBtn"]}>
                      <p>{e.language}</p>
                    </div>
                  </div>
                </div>
                <div className={classes["icons"]}>
                  <button
                    className={classes["editBtn"]}
                    onClick={() => handleEdit(e.id)}
                  >
                    <Icon icon="carbon:edit" className={classes["iconsBtn"]} />
                    <p>Edit</p>
                  </button>
                  <button
                    className={classes["deleteBtn"]}
                    onClick={() => dataDelete(e.id)}
                  >
                    <Icon icon="mdi:delete" className={classes["iconsBtn"]} />
                    <p>Delete</p>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      {isOpen && (
        <LiberyModal save={save} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {isEditOpen && (
        <LiberyEditModal
          edit={edit}
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          editId={editId}
          setIsLoading={setIsLoading}
          data={data}
        />
      )}
    </div>
  );
};

export default LibRaryClass;
