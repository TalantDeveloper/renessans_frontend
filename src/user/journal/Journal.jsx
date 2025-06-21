import React, {useState, useEffect} from "react";
import styles from "./Journal.module.css";
import {useDropzone} from "react-dropzone";
import {
    FaBook,
    FaFileDownload,
    FaPlusCircle,
    FaUser,
    FaLeaf,
    FaAtom,
    FaTools,
    FaUserGraduate,
    FaCheckCircle,
    FaPhone,
} from "react-icons/fa";
import {BaseURL, testUrl} from "../home/BaseData";
import {Contacts} from "../contact/components/contact/Contact";
import {useTranslation} from "react-i18next";

const Journal = () => {
    const {t} = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const [journals, setJournals] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        file: null,
    });

    // Fetch journals
    useEffect(() => {
        fetch(
            testUrl + "/api/journals/"
        )
            .then((res) => res.json())
            .then((data) => setJournals(data))
            .catch((err) => console.error("Error fetching journals:", err));
    }, []);

    // Handle form submission to Telegram
    const handleSubmit = (e) => {
        e.preventDefault();
        const botToken = "7443223152:AAHhNAB534F-i5sGUyKpR1AwBztad1tyduU";
        const chatId = "-1002384689140";
        const {fullName, phone, file} = formData;

        if (!chatId) {
            alert(t("chatIdMissing"));
            return;
        }

        const formDataObj = new FormData();
        formDataObj.append("chat_id", chatId);
        formDataObj.append(
            "caption",
            `${t("newArticleSent")}\n\n${t("name")}: ${fullName}\n${t(
                "phone"
            )}: ${phone}`
        );
        formDataObj.append("document", file);

        fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
            method: "POST",
            body: formDataObj,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    alert(t("articleSentSuccess"));
                    setFormData({fullName: "", phone: "", file: null}); // Reset form
                } else {
                    alert(t("articleSendError"));
                }
            })
            .catch((err) => console.error("Error:", err));
    };

    const onDrop = (acceptedFiles) => {
        setFormData({...formData, file: acceptedFiles[0]});
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: ".pdf, .doc, .docx", // Specify accepted file types
        maxFiles: 1, // Allow only one file
    });

    return (
        <div className={styles.container}>
            {/* Breadcrumb Navigation */}
            <div className={styles.breadcrumb}>
        <span
            className={`${styles.breadcrumbItem} ${
                currentPage === 1 ? styles.active : ""
            }`}
            onClick={() => setCurrentPage(1)}
        >
          <FaBook className={styles.icon}/> {t("information")}
        </span>
                <span
                    className={`${styles.breadcrumbItem} ${
                        currentPage === 2 ? styles.active : ""
                    }`}
                    onClick={() => setCurrentPage(2)}
                >
          <FaFileDownload className={styles.icon}/> {t("allJournals")}
        </span>
                <span
                    className={`${styles.breadcrumbItem} ${
                        currentPage === 3 ? styles.active : ""
                    }`}
                    onClick={() => setCurrentPage(3)}
                >
          <FaPlusCircle className={styles.icon}/> {t("submitArticle")}
        </span>
            </div>

            <div className={styles.pageContent}>
                {currentPage === 1 && (
                    <div className={styles.infoPage}>
                        <div className={styles.forTitle}>
                            <h1 className={styles.pageTitle}>{t("journalTitle")}</h1>
                            {/* <p className={styles.subTitle}>
                {new Date().getFullYear()}-{t("submissionsOpen")}
              </p> */}
                        </div>

                        {/* Section 1: Categories */}
                        <div className={`${styles.card} ${styles.categoryCard}`}>
                            <h2 className={styles.sectionTitle}>
                                <FaUserGraduate className={styles.icons}/>{" "}
                                {t("articleDirections")}
                            </h2>
                            <ul className={styles.categoryList}>
                                <div className={styles.mazgi}>
                                    <h3>
                                        <FaUserGraduate className={styles.listIcon}/>
                                        {t("socialHumanitarian")}
                                    </h3>
                                    <li>{t("historyArcheologyPhilology")}</li>
                                </div>
                                <div className={styles.mazgi}>
                                    <h3>
                                        <FaLeaf className={styles.listIcon}/>{" "}
                                        {t("naturalSciences")}
                                    </h3>
                                    <li>{t("chemistryBiologyEcology")}</li>
                                </div>
                                <div className={styles.mazgi}>
                                    <h3>
                                        <FaAtom className={styles.listIcon}/> {t("exactSciences")}
                                    </h3>
                                    <li>{t("physicsMathematicsAstronomy")}</li>
                                </div>
                                <div className={styles.mazgi}>
                                    <h3>
                                        <FaTools className={styles.listIcon}/>{" "}
                                        {t("technicalSciences")}
                                    </h3>
                                    <li>{t("engineeringInformatics")}</li>
                                </div>
                            </ul>
                        </div>

                        {/* Section 2: Content Requirements */}
                        <div className={styles.cardimiz}>
                            <h2 className={styles.sectionTitle}>
                                <FaCheckCircle className={styles.icons}/>{" "}
                                {t("contentRequirements")}
                            </h2>
                            <ul className={styles.requirementsList}>
                                <li className={styles.requirementsCard}>
                                    <FaCheckCircle className={styles.requirementsCardIcon}/>
                                    <span className={styles.requirementsText}>
                    {t("highlightingReforms")}
                  </span>
                                </li>
                                <li className={styles.requirementsCard}>
                                    <FaCheckCircle className={styles.requirementsCardIcon}/>
                                    <span className={styles.requirementsText}>
                    {t("applicationOfModernTech")}
                  </span>
                                </li>
                                <li className={styles.requirementsCard}>
                                    <FaCheckCircle className={styles.requirementsCardIcon}/>
                                    <span className={styles.requirementsText}>
                    {t("interdisciplinaryResearch")}
                  </span>
                                </li>
                                <li className={styles.requirementsCard}>
                                    <FaCheckCircle className={styles.requirementsCardIcon}/>
                                    <span className={styles.requirementsText}>
                    {t("disseminationOfInternationalExperience")}
                  </span>
                                </li>
                                <li className={styles.requirementsCard}>
                                    <FaCheckCircle className={styles.requirementsCardIcon}/>
                                    <span className={styles.requirementsText}>
                    {t("presentationOfInnovativeResearch")}
                  </span>
                                </li>
                            </ul>
                        </div>

                        {/* Section 3: Submission Guidelines */}
                        <div className={`${styles.card} ${styles.guidelinesCard}`}>
                            <h2 className={styles.sectionTitle}>
                                <FaCheckCircle className={styles.icons}/>{" "}
                                {t("submissionGuidelines")}
                            </h2>
                            {/* <p>{t("articleStructureIntro")}</p> */}

                            <div className={styles.cards}>
                                <div className={styles.card1}>
                                    <div className={styles.h3_dv}>
                                        <div className={styles.dv}></div>
                                        <h3 className={styles.titlemiz}>{t("articleStructure")}</h3>
                                    </div>
                                    <p className={styles.descr}>
                                        {t("introductionLiteratureReviewMethodology")}
                                    </p>
                                </div>

                                <div className={styles.card1}>
                                    <div className={styles.h3_dv}>
                                        <div className={styles.dv}></div>
                                        <h3 className={styles.titlemiz}>{t("format")}</h3>
                                    </div>
                                    <p className={styles.descr}>{t("fontStyleTimesNewRoman")}</p>
                                </div>

                                <div className={styles.card1}>
                                    <div className={styles.h3_dv}>
                                        <div className={styles.dv}></div>
                                        <h3 className={styles.titlemiz}>{t("language")}</h3>
                                    </div>
                                    <p className={styles.descr}>{t("uzbekRussianEnglish")}</p>
                                </div>

                                <div className={styles.card1}>
                                    <div className={styles.h3_dv}>
                                        <div className={styles.dv}></div>
                                        <h3 className={styles.titlemiz}>{t("illustrations")}</h3>
                                    </div>
                                    <p className={styles.descr}>
                                        {t("highQualityIllustrations")}
                                    </p>
                                </div>

                                <div className={styles.card1}>
                                    <div className={styles.h3_dv}>
                                        <div className={styles.dv}></div>
                                        <h3 className={styles.titlemiz}>{t("plagiarismCheck")}</h3>
                                    </div>
                                    <p className={styles.descr}>{t("antiPlagiarismMinimum")}</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Contact */}
                        <div className={`${styles.card} ${styles.contactCard}`}>
                            <h1 className={styles.sectionTitle}>
                                <FaUserGraduate className={styles.icons}/> {t("contact")}
                            </h1>
                            <Contacts/>
                        </div>
                    </div>
                )}

                {currentPage === 2 && (
                    <div className={styles.journalIssues}>
                        <h1 className={styles.title}>{t("allJournals")}</h1>
                        <div className={styles.journalGrid}>
                            {journals.map((journal) => (
                                <div key={journal.id} className={styles.journalCard}>
                                    <div className={styles.cardContent}>
                                        <img
                                            src={journal.image}
                                            alt={journal.title}
                                            className={styles.cardImage}
                                        />
                                        <h3>{journal.title}</h3>
                                        <p>{journal.description}</p>
                                        <p>
                                            {t("articleCount")}: {journal.article_count}
                                        </p>
                                        <a
                                            href={journal.file_upload}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.downloadButton}
                                        >
                                            <FaFileDownload/> {t("download")}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {currentPage === 3 && (
                    <div className={styles.submitPage}>
                        <h1 className={styles.title}>{t("submitArticle")}</h1>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputWrapper}>
                                <FaUser className={styles.inputIcon}/>
                                <input
                                    type="text"
                                    placeholder={t("fullName")}
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData({...formData, fullName: e.target.value})
                                    }
                                    required
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <FaPhone className={styles.inputIcon}/>
                                <input
                                    type="tel"
                                    placeholder={t("phone")}
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({...formData, phone: e.target.value})
                                    }
                                    required
                                />
                            </div>

                            {/* File Dropzone */}
                            <div
                                {...getRootProps()}
                                className={`${styles.fileDropzone} ${
                                    isDragActive ? styles.active : ""
                                }`}
                            >
                                <input {...getInputProps()} />
                                {formData.file ? (
                                    <p className={styles.fileName}>
                                        {t("selectedFile")}: {formData.file.name}
                                    </p>
                                ) : (
                                    <p>
                                        {isDragActive ? t("dropFileHere") : t("clickToUploadFile")}
                                    </p>
                                )}
                            </div>

                            {/* Show error message if needed */}
                            {formData.file &&
                                ![
                                    "application/pdf",
                                    "application/msword",
                                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                ].includes(formData.file.type) && (
                                    <p className={styles.errorMessage}>{t("invalidFileType")}</p>
                                )}

                            <button type="submit" className={styles.submitButton}>
                                {t("submitArticle")}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Journal;
