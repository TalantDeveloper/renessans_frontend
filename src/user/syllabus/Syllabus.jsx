import React, {useState, useEffect} from "react";
import classes from "./Syllabus.module.css";
import {
    FaCalendarAlt,
    FaBook,
    FaArrowLeft,
    FaCheckCircle,
    FaSearch,
    FaChalkboardTeacher,
    FaLanguage,
    FaBrain,
    FaRunning,
    FaHistory,
    FaGlobe,
    FaChartLine,
    FaCalculator,
    FaRobot,
    FaUniversity,
    FaUserTie,
    FaPaintBrush,
    FaMoneyBillWave,
    FaFileInvoiceDollar,
    FaBriefcase,
    FaBuilding,
    FaLaptopCode,
    FaPlane,
    FaArrowRight,
} from "react-icons/fa";
import {TiAttachmentOutline} from "react-icons/ti";
import {PiChalkboardTeacherDuotone} from "react-icons/pi";
import SyllabusData from "./SyllabusData";
import Kasbiy from "./assets/2O14e3UHYlyehiJJpcMssA8HdWLoXOskix6d3JGi.jpg";

const icons = [
    FaBook,
    FaChalkboardTeacher,
    FaBrain,
    FaRunning,
    FaHistory,
    FaLanguage,
    FaGlobe,
    FaChartLine,
    FaCalculator,
    FaRobot,
    FaUniversity,
    FaUserTie,
    FaPaintBrush,
    FaMoneyBillWave,
    FaFileInvoiceDollar,
    FaBriefcase,
    FaBuilding,
    FaLaptopCode,
    FaPlane,
    FaArrowLeft,
    FaArrowRight,
];

const Syllabus = () => {
    const [activeFaculty, setActiveFaculty] = useState(
        "Matematika va Iqtisodiyot"
    );
    const [activeScheduleType, setActiveScheduleType] = useState("Kunduzgi");
    const [activeCourse, setActiveCourse] = useState("1-kurs");
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedLessonName, setSelectedLessonName] = useState("");
    const [selectedLessonText, setSelectedLessonText] = useState("");
    const [selectedLessonImg, setSelectedLessonImg] = useState("");
    const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
    const [selectLiterature, setSelectLiterature] = useState("");
    const [selectLink, setSelectLink] = useState("");
    const [selectVideo, setSelectVideo] = useState("");
    const [selectStext, setSelectStext] = useState("");
    const [selectStext2, setSelectStext2] = useState("");
    const [selectStext3, setSelectStext3] = useState("");
    const [selectAuthor, setSelectAuthor] = useState("");

    useEffect(() => {
        const loadData = () => {
            const facultyData = SyllabusData.faculties[activeFaculty];
            if (facultyData && facultyData.courses) {
                setFilteredCourses(facultyData.courses);
                setSearchResults(facultyData.courses);
            } else {
                setFilteredCourses([]);
                setSearchResults([]);
            }
            setIsLoading(false);
        };

        setTimeout(loadData, 500);
    }, [activeFaculty]);

    useEffect(() => {
        const results = filteredCourses.filter((course) =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, filteredCourses]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFacultyChange = (faculty) => {
        setActiveFaculty(faculty);
        setSelectedCourse(null);
        setIsLoading(true);

        setTimeout(() => {
            const facultyData = SyllabusData.faculties[faculty]?.courses || [];
            setFilteredCourses(facultyData);
            setSearchResults(facultyData);
            setIsLoading(false);
        }, 500);
    };

    const handleScheduleTypeChange = (type) => {
        setActiveScheduleType(type);
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const handleCourseChange = (course) => {
        setActiveCourse(course);
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const handleLessonClick = (lesson, index) => {
        setSelectedLessonIndex(index);
        setSelectedLessonName(lesson.title);
        setSelectedLessonText(lesson.text);
        setSelectedLessonImg(lesson.image);
        setSelectLiterature(lesson.literature);
        setSelectLink(lesson.link);
        setSelectVideo(lesson.video);
        setSelectStext(lesson.s_text);
        setSelectStext2(lesson.s_text2);
        setSelectStext3(lesson.s_text3);
        setSelectAuthor(lesson.author);
    };

    const handleNextLesson = () => {
        if (selectedCourse) {
            const nextIndex = selectedLessonIndex + 1;
            if (nextIndex < selectedCourse.classes[0].lessons.length) {
                const nextLesson = selectedCourse.classes[0].lessons[nextIndex];
                handleLessonClick(nextLesson, nextIndex);
            }
        }
    };

    const handlePreviousLesson = () => {
        if (selectedCourse) {
            const prevIndex = selectedLessonIndex - 1;
            if (prevIndex >= 0) {
                const prevLesson = selectedCourse.classes[0].lessons[prevIndex];
                handleLessonClick(prevLesson, prevIndex);
            }
        }
    };

    const handleAuthorClick = (author) => {
        setIsLoading(true);
        setSelectAuthor(author);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className={classes.syllabusContainer}>
            <header className={classes.header}>
                <div data-aos="fade-up" className={classes.logoContainer}>
                    <h1>Bizning syllabus</h1>
                </div>

                <div data-aos="fade-up" className={classes.searchContainer}>
                    <input
                        type="text"
                        placeholder="Fan bo‘yicha izlash..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className={classes.searchInput}
                    />
                    <button
                        onClick={() => setSearchTerm(searchTerm)}
                        className={classes.searchButton}
                    >
                        <FaSearch/>
                    </button>
                </div>
            </header>

            <main
                className={`${classes.main} ${!isLoading ? classes.columnLayout : ""}`}
            >
                <div data-aos="fade-up" className={classes.allSelector}>
                    <div className={classes.facultySelector}>
                        {Object.keys(SyllabusData.faculties).map((faculty) => (
                            <button
                                key={faculty}
                                className={`${classes.facultyButton} ${
                                    activeFaculty === faculty ? classes.active : ""
                                }`}
                                onClick={() => handleFacultyChange(faculty)}
                            >
                                {faculty}
                            </button>
                        ))}
                    </div>

                    <div className={classes.scheduleTypeSelector}>
                        {["Kunduzgi", "Sirtqi", "Kechki"].map((type) => (
                            <button
                                key={type}
                                className={`${classes.scheduleButton} ${
                                    activeScheduleType === type ? classes.active : ""
                                }`}
                                onClick={() => handleScheduleTypeChange(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div data-aos="fade-up" className={classes.courseSelector}>
                        {["1-kurs", "2-kurs", "3-kurs", "4-kurs", "5-kurs"].map(
                            (course) => (
                                <label key={course}>
                                    <input
                                        type="radio"
                                        name="course"
                                        value={course}
                                        checked={activeCourse === course}
                                        onChange={() => handleCourseChange(course)}
                                    />
                                    {course}
                                </label>
                            )
                        )}
                    </div>
                </div>

                {isLoading ? (
                    <div data-aos="fade-up" className={classes.loader}>
                        Yuklanmoqda...
                    </div>
                ) : selectedCourse ? (
                    <div data-aos="fade-up" className={classes.courseDetailsContent}>
                        <h2>
                            <FaBook/> {selectedCourse.name} bo‘yicha barcha darsliklarimiz
                        </h2>
                        <div className={classes.classAllItem}>
                            <div className={classes.classItemLeft}>
                                {selectedCourse.classes.map((classItem, idx) => (
                                    <div key={idx} className={classes.classItem}>
                                        <h4>
                                            <FaBook/> {classItem.name}
                                        </h4>
                                        <ul>
                                            {classItem.lessons.map((lesson, i) => (
                                                <li
                                                    key={i}
                                                    onClick={() => handleLessonClick(lesson, i)}
                                                >
                                                    <FaCheckCircle/> {lesson.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div data-aos="fade-up" className={classes.classItemRight}>
                                <>
                                    {selectedLessonName ? (
                                        <div>
                                            <h4>{selectedLessonName}</h4>
                                            {selectedLessonImg && (
                                                <img src={selectedLessonImg} alt=""/>
                                            )}
                                            <p>{selectedLessonText}</p>

                                            {isLoading ? (
                                                <div>Yuklanmoqda...</div>
                                            ) : (
                                                <div className={classes.authordisplay}>
                                                    {selectAuthor && (
                                                        <p>
                                                            <span>Avtor:</span> {selectAuthor}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            <div data-aos="fade-up" className={classes.stext}>
                                                {selectStext && <p>{selectStext}</p>}
                                                {selectStext2 && <p>{selectStext2}</p>}
                                                {selectStext3 && <p>{selectStext3}</p>}
                                            </div>
                                            {selectLink && (
                                                <div className={classes.selectedLinkAll}>
                                                    <a
                                                        href={selectLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={classes.selectedLink}
                                                    >
                                                        Faylni ko‘rish
                                                    </a>
                                                </div>
                                            )}
                                            {selectVideo && (
                                                <div className={classes.selectVideo}>
                                                    <h2>
                                                        <TiAttachmentOutline/> Mavzuga doir video
                                                    </h2>
                                                    <iframe
                                                        width="100%"
                                                        height="315"
                                                        src={selectVideo}
                                                    ></iframe>
                                                </div>
                                            )}

                                            <div
                                                data-aos="fade-up"
                                                className={
                                                    selectLiterature
                                                        ? classes.literatureTable
                                                        : classes.literatureTableNone
                                                }
                                            >
                                                <div className={classes.tableHeader}>
                                                    <div className={classes.headerItem}>№</div>
                                                    <div className={classes.headerItem}>Adabiyotlar</div>
                                                    <div className={classes.headerItem}>Avtorlar</div>
                                                </div>

                                                {selectLiterature ? (
                                                    selectLiterature.map((literature, index) => (
                                                        <div
                                                            data-aos="fade-up"
                                                            key={index}
                                                            className={classes.tableRow}
                                                        >
                                                            <div className={classes.ordinalNumber}>
                                                                {index + 1}
                                                            </div>
                                                            <div className={classes.tableCell}>
                                                                {literature.title}
                                                            </div>
                                                            <div className={classes.tableCell}>
                                                                {literature.author}
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div data-aos="fade-up" className={classes.tableRow}>
                                                        <div className={classes.tableCell}></div>
                                                        <div className={classes.tableCell}></div>
                                                    </div>
                                                )}
                                            </div>

                                            <div
                                                data-aos="fade-up"
                                                className={classes.lessonNavigation}
                                            >
                                                <button
                                                    onClick={handlePreviousLesson}
                                                    disabled={selectedLessonIndex === 0}
                                                    className={classes.navigationButton}
                                                >
                                                    <FaArrowLeft/>
                                                    Avvalgi
                                                </button>
                                                <button
                                                    onClick={handleNextLesson}
                                                    disabled={
                                                        selectedLessonIndex >=
                                                        selectedCourse.classes[0].lessons.length - 1
                                                    }
                                                    className={classes.navigationButton}
                                                >
                                                    Keyingi
                                                    <FaArrowRight/>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>
                                            O‘zbekiston Respublikasi Prezidentining 2024-yil
                                            21-iyundagi 231-son qarori bilan Maktabgacha va maktab
                                            ta’limi tashkilotlari rahbar, pedagog va mutaxassis
                                            kadrlarini uzluksiz kasbiy rivojlantirish tizimi
                                            samaradorligini ta’minlash, ularning kasbiy bilim,
                                            ko‘nikma va mahoratini muntazam oshirib borish, Prezident
                                            maktablarida to‘plangan ilg‘or tajribalarni umumiy o‘rta
                                            ta’lim muassasalariga keng tatbiq etish belgilandi.
                                            O‘zbekiston Respublikasi Maktabgacha va maktab ta’limi
                                            vazirining 2024-yil 7-avgustdagi,pedagog va mutaxassis
                                            kadrlarini uzluksiz kasbiy rivojlantirish tizimi
                                            samaradorligini ta’minlash, ularning kasbiy bilim,
                                            ko‘nikma va mahoratini muntazam oshirib borish, Prezident
                                            maktablarida to‘plangan ilg‘or tajribalarni umumiy o‘rta
                                            ta’lim muassasalariga keng tatbiq etish belgilandi.
                                            "Umumiy o‘rta ta’lim muassasalari o‘qituvchilari uchun
                                            “Kasbiy rivojlanish kuni” va “Kasbiy rivojlanish soati”
                                            tadbirlarini bosqichma-bosqich joriy etish to‘g‘risida"gi
                                            246-son buyrug‘i bilan Umumiy oʻrta taʼlim muassasalari
                                            oʻqituvchilari uchun “Kasbiy rivojlanish kuni” va “Kasbiy
                                            rivojlanish soati” tadbirlarini tashkil etish TARTIBI
                                            tasdiqlandi. Siz ushbu sahifa orqali “Kasbiy rivojlanish
                                            kuni” va “Kasbiy rivojlanish soati” tadbirlari uchun
                                            tayyorlangan o‘quv-metodik materiallar bilan
                                            tanishishingiz mumkin.
                                        </p>
                                    )}
                                </>
                            </div>

                            <div data-aos="fade-up" className={classes.classItemRightImage}>
                                <div className={classes.itemFirst}>
                                    <img src={Kasbiy} alt=""/>
                                    <div className={classes.RightImageWords}>
                                        <div className={classes.rating}>
                                            <input type="radio" name="rating" id="r5"/>
                                            <label htmlFor="r5">★</label>
                                            <input type="radio" name="rating" id="r4"/>
                                            <label htmlFor="r4">★</label>
                                            <input type="radio" name="rating" id="r3"/>
                                            <label htmlFor="r3">★</label>
                                            <input type="radio" name="rating" id="r2"/>
                                            <label htmlFor="r2">★</label>
                                            <input type="radio" name="rating" id="r1"/>
                                            <label htmlFor="r1">★</label>
                                        </div>
                                        <div className={classes.iconPlusWord}>
                                            <FaBriefcase/>
                                            <p>aniq fanlar</p>
                                        </div>
                                        <div className={classes.iconPlusWord}>
                                            <FaLanguage/> <p>o`zbek tili</p>
                                        </div>
                                        <div className={classes.iconPlusWord}>
                                            <FaCalculator/>
                                            <p>ko‘rishlar soni: 10</p>
                                        </div>
                                        <div className={classes.itemSecond}>
                                            <h1>Avtorlar</h1>
                                            {[
                                                "Shavkat Abdullayev",
                                                "Barno Asatullayeva",
                                                "Mirkomil Akmadaliyev",
                                                "Lobar Karimova",
                                            ].map((authorName) => (
                                                <ul
                                                    key={authorName}
                                                    onClick={() => handleAuthorClick(authorName)}
                                                >
                                                    <li>
                                                        <PiChalkboardTeacherDuotone/> {authorName}
                                                    </li>
                                                </ul>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className={classes.backButton}
                            onClick={() => {
                                setSelectedCourse(null);
                            }}
                        >
                            <FaArrowLeft/> Orqaga qaytish
                        </button>
                    </div>
                ) : (
                    <div className={classes.courseDetails}>
                        {searchResults.map((course, index) => {
                            const IconComponent = icons[index % icons.length];
                            return (
                                <div key={index} className={classes.courseCard}>
                                    <div className={classes.courseHeader}>
                                        <IconComponent className={classes.icon}/>
                                        <h3 className={classes.courseName}>{course.name}</h3>
                                    </div>
                                    <div className={classes.classPreview}>
                                        <p>
                                            Fakultet: <span>{activeFaculty}</span>
                                        </p>
                                        <p>
                                            Ta‘lim shakli: <span>{activeScheduleType}</span>
                                        </p>
                                        <p>
                                            Davomiyligi: <span>104 soat</span>
                                        </p>
                                        <p>
                                            Guruhlar soni: <span>7 ta</span>
                                        </p>
                                    </div>
                                    <button
                                        className={classes.applyButton}
                                        onClick={() => setSelectedCourse(course)}
                                    >
                                        Ko‘rish
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Syllabus;
