import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {FaArrowRight} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import styles from "./Documents.module.css";
import {testUrl} from "../BaseData";
import documeticon from "./document.jpeg";

const Documents = () => {
    const {t, i18n} = useTranslation();
    const [documents, setDocuments] = useState([]);

    useEffect(() => {

        axios
            .get(
                testUrl + "/api/documents"
            )
            .then((response) => {
                setDocuments(response.data);
            })
            .catch((error) =>
                console.error("Error fetching documents data: ", error)
            );
            console.log(documents);
    }, [i18n.language]);


    const getDocumentsName = (document) => {
        const title = document[`name_${i18n.language}`];
        return title || document.name_uz || t("no_name_available");
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>

                {/* Departments Section */}
                <div className={styles.section}>
                    <h3 className={styles.title}>
                        {t("document")}
                    </h3>
                    <div className={styles.facultyList}>
                        {documents.length > 0 ? (
                            documents.map((document, index) => (
                                <a key={document.id}
                                   href={document.document}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className={styles.documentCard}>
                                    <div className={styles.iconWrapper}>
                                        <img src={documeticon} alt="doc icon" className={styles.documentIcon} />
                                    </div>
                                    <div className={styles.documentInfo}>
                                        <span className={styles.documentTitle}>{getDocumentsName(document)}</span>
                                    </div>
                                    <div className={styles.arrowWrapper}>
                                        <FaArrowRight className={styles.arrowIcon}/>
                                    </div>
                                </a>
                            ))
                        ) : (
                            <div>
                                {t("no_document_found")}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documents;
