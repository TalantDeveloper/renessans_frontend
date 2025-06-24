import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next"; // Import the hook
import styles from "./UniversityUnion.module.css";
import DefaultImg4 from "./2023-07-13-14-11-45_6ab33211e536c0992de38e18309da348.jpeg";
import { testUrl } from "../home/BaseData";

const UniversityUnion = () => {
    const {t, i18n} = useTranslation();
    const [clubs, setClubs] = useState([]);
    const [fields, setFields] = useState([]);
    const [categories, setCategories] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedClub, setSelectedClub] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        group: "",
        phoneNumber: "",
        fields: "",
    });
    const [showToast, setShowToast] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clubsRes, ] = await Promise.all([
                    fetch(testUrl + "/api/club-students/")
                ]);

                const [clubsData] = await Promise.all([
                    clubsRes.json(),
                ]);

                setClubs(clubsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    

    const defaultImages = [DefaultImg4];

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * defaultImages.length);
        return defaultImages[randomIndex];
    };

    const handleJoin = (club) => {
        setSelectedClub(club);
        setModalOpen(true);
    };

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);

        setModalOpen(false);

        setFormData({
            firstName: "",
            lastName: "",
            group: "",
            phoneNumber: "",
        });

        // Prepare the message for Telegram in the selected language
        let fieldsMessage = formData.fields
            ? formData.fields
            : t("universityUnion.fields"); // Translation for fields if not selected

        const message = `
    ${t("universityUnion.join")}:
    Klub: ${selectedClub[`title_${i18n.language}`]}
    Ism: ${formData.firstName} ${formData.lastName}
    Guruh: ${formData.group}
    Telefon: ${formData.phoneNumber}
    `;

        // Send the message to Telegram
        const telegramApiUrl = `https://api.telegram.org/bot7443223152:AAHhNAB534F-i5sGUyKpR1AwBztad1tyduU/sendMessage`;
        const chatId = "-1002381957849";

        try {
            const response = await fetch(telegramApiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message to Telegram");
            }

            console.log("Message sent to Telegram successfully");
        } catch (error) {
            console.error("Error sending message to Telegram:", error);
        }
    };

    return (
        <div className={styles.allContainer}>
            <div className={styles.container}>
                <h1 className={styles.title}>{t("clubs")}</h1>
                <div className={styles.clubList}>
                    {clubs.map((club) => (
                        <div key={club.id} className={styles.clubCard}>
                            <div className={styles.cardHeader}>
                                <h2 className={styles.clubName}>
                                    {club[`title_${i18n.language}`]}
                                </h2>
                            </div>
                            <div className={styles.cardBody}>
                                <img
                                    src={club.image || getRandomImage()}
                                    alt={club[`title_${i18n.language}`]}
                                    className={styles.clubImage}
                                />
                                <div dangerouslySetInnerHTML={{
                                   __html: club[`goal_${i18n.language}`],
                                     }}/>
                                <p className={styles.clubTutor}>
                                    <strong>{t("tutor")}:</strong>{" "}
                                    {club[`tutor_${i18n.language}`]}
                                </p>
                                <p className={styles.clubCategory}>
                                    <strong>{t("category")}:</strong>{" "}
                                    {club?.category[`name_${i18n.language}`]}
                                </p>
                                <p className={styles.clubFields}>
                                    <strong>{t("fields")}:</strong>
                                </p>
                                <ul className={styles.fieldsList}>
                                    {club?.fields?.map((field, index) => (
                                        <li key={index} className={styles.field}>
                                            {field[`name_${i18n.language}`]}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={styles.joinButton}
                                    onClick={() => handleJoin(club)}
                                >
                                    {t("join")}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {modalOpen && selectedClub && (
                    <div className={styles.modalBackdrop}>
                        <div className={styles.modalContent}>
                            <h2>
                                {t("join")} {selectedClub[`title_${i18n.language}`]}
                            </h2>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <label>{t("firstName")}</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleFormChange}
                                    required
                                />
                                <label>{t("lastName")}</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleFormChange}
                                    required
                                />
                                <label>{t("group")}</label>
                                <input
                                    type="text"
                                    name="group"
                                    value={formData.group}
                                    onChange={handleFormChange}
                                    required
                                />
                                <label>{t("phoneNumber")}</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleFormChange}
                                    required
                                />
                                <button onClick={handleSubmit} className={styles.submitButton}>
                                    {t("submit")}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className={styles.closeButton}
                                    style={{marginLeft: "10px"}}
                                >
                                    {t("close")}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {showToast && (
                    <div className={styles.toast}>
                        <p>
                            {t("successMessage")} {selectedClub[`title_${i18n.language}`]}!
                        </p>
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div className={styles.sidebar}>
                <h3>
                    {t("Talabalarga")}
                </h3>
                <ul>
                    <li onClick={() => navigate("/activity/talabalarga/bmi-mavzular")}>
                        {i18n.t("BMI mavzular")}
                    </li>
                    <li onClick={() => navigate("/activity/talabalarga/karyera")}>
                        {i18n.t("Karyera")}
                    </li>
                    <li onClick={() => navigate("/activity/talabalarga/talabalar-turar-joyi")}>
                        {i18n.t("Talabalar turar joyi")}
                    </li>
                    <li onClick={() => navigate("/activity/talabalarga/alochi-talabalar")}>
                        {i18n.t("A'lochi talabalar")}
                    </li>
                    <li
                        onClick={() => navigate("/scholarship")}
                    >
                        {i18n.t("ourScholarship")}
                    </li>
                    <li className={styles.active}>
                        {i18n.t("universityUnion")}
                    </li>
                    
                </ul>
            </div>
        </div>
    );
};

export default UniversityUnion;
