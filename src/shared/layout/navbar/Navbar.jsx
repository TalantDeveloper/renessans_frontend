import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageDropDownComponent from "../../components/languageDropdown/LanguageDropDownComponent";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import classes from "./Navbar.module.css";
import navbarLogo from "./main-logo.svg";
import navbarLogoEng from "./logo eng.svg";
import navbarLogoRu from "./logo rus.svg";
import axios from "axios";
import { testUrl } from "../../../user/home/BaseData";
// import litsenziya from "./litsenziya.pdf"

// import ZoomSelector from "../../utils/my/ZoomSelector";
// import AudioDictorButton from "../../utils/my/AudioDictorButton";
// import DarkMode from "../../utils/my/DarkMode";
import ToggleSwitches from "../../../ToggleSwitches";

// import { FaEye } from "react-icons/fa";
import { BaseURL } from "../../../user/home/BaseData";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  // const [menus, setMenus] = useState([]);
  // const [dropdowns, setDropdowns] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const [showElabDropdown, setShowElabDropdown] = useState(false);
  // const navigate = useNavigate();

  const staticDropdownItems = [
    { path: "/about", text: t("Universitet haqida") },
    { path: "/structure", text: t("Universitet tuzilmasi") },
    
    { path: "/statistics", text: t("RTU raqamlarda") },
    { path: "/centers", text: t('center') },
    
    { path: "/management", text: t("Rahbariyat") },
    { path: "/faculties", text: t("Kafedra va fakultetlar") }, 
    { path: "/dropdown/oquv-binolari", text: t("O'quv binolari") },
    { path: "/directions", text: t("Yo'nalishlar") },
    { path: "/documents/normativ-huquqiy-hujjatlar", text: t("document") },
    { path: "/dropdown/bosh-ish-orinlari/", text: t("free jobs") },
    // { path: "/litsenziya", text: t("litsenziya") },
    // { path: litsenziya, text: t("litsenziya")},
  ];

  const staticItemsColumn1 = [
    // { path: "/journal", text: t("Ilmiy jurnal") },
    // { path: "https://conference.renessans-edu.uz/", text: t("Konferensiyalar") },
    { path: "/newscategories/3", text: t("Ilmiy jarayonlar") },
    { path: "https://conference.renessans-edu.uz/", text: t("Ilmiy konferensiyalar") },
    { path: "/journal", text: t("journal") },
    { path: "/activity/ilmiy-faoliyat/ilmiy-maktablar", text: t("Ilmiy maktablar") },
    { path: "/activity/ilmiy-faoliyat/ilmiy-kengash", text: t("Ilmiy kengash") },
    { path: "/activity/ilmiy-faoliyat/green-renessans", text: t("Green Renessans") },
    { path: "/activity/ilmiy-faoliyat/oquv-va-labaratoriya-bazalari", text: t("O‘quv va labaratoriya bazalari") },
    { path: "/activity/ilmiy-faoliyat/axborotlashtirish-jarayonlari", text: t("Axborotlashtirish jarayonlari") },
    { path: "/activity/ilmiy-faoliyat/yosh-akademiklar", text: t("Yosh akademiklar") },
    { path: "/activity/ilmiy-faoliyat/avtorefereat-dissertatsiya", text: t("Avtoreferat va dissertatsiya") },
  ];

  const staticItemsColumn2 = [
    { path: "/activity/manaviy-marifiy-faoliyat/manaviyat-va-marifat-kengashi", text: t("Ma’naviyat va ma’rifat Kengashi") },
    { path: "/newscategories/4", text: t("Fan va jamoat arboblari bilan muloqotlar") },
    { path: "/activity/manaviy-marifiy-faoliyat/axborot-resurslar", text: t("Axborot resurslar") },
    { path: "/newscategories/5", text: t("Ma’naviy-ma’rifiy tadbirlar") },
    { path: "/newscategories/6", text: t("Murabbiylar faoliyati") },
    { path: "/activity/manaviy-marifiy-faoliyat/tanlovlar", text: t("Tanlovlar") },
    // { path: "/about-uni", text: t("Talabalar hayoti") },
    // { path: "/university-union", text: t("universityUnion") },
    // { path: "/dropdown/murabbiylik-faoliyati", text: t("Murabbiylik faoliyati") },
    // { path: "/dropdown/madaniy-marifiy-tadbirlar", text: t("Madaniy-ma'rifiy tadbirlar") },
    // { path: "/dropdown/odob-axloq-qoidalari", text: t("Odob axloq qoidalari") },
  ];

  const staticItemsColumn3 = [
    { path: "/newscategories/7", text: t("Oʻquv jarayoni") },
    { path: "/activity/oquv-faoliyat/talim-jarayoni-meyoriy-hujjatlari", text: t("Ta'lim jarayoni me'yoriy hujjatlari") },
    { path: "/activity/oquv-faoliyat/video-maruzalar", text: t("Elektron kontentlar") },
    { path: "/activity/oquv-faoliyat/amaliyot-shartnomalari", text: t("Amaliyot shartnomalari") },
    { path: "/activity/oquv-faoliyat/oquv-rejalari", text: t("O'quv reja va Syllabus") },
    { path: "/activity/oquv-faoliyat/nazorat-sinovlari", text: t("Nazorat sinovi va namunalari") },
    { path: "/activity/oquv-faoliyat/bmi-mavzular/", text: t("BMI mavzular") },
    // { path: "/dropdown/nazorat-sinovlari", text: t("BMI mavzulari") },
  ];

  // const staticItemsColumn4 = [
  //   { path: "/dropdown/yosh-akademiklar", text: t("Yosh akademiklar") },
  //   { path: "/dropdown/zakovat-klubi", text: t("Zakovat klubi") },
  //   { path: "/dropdown/talabalar-turar-joyi", text: t("Talabalar turar joyi") },
  //   { path: "/dropdown/sport-klubi", text: t("Sport klubi") },
  //   { path: "/dropdown/axborot-resurs-markazi", text: t("Axborot resurs markazi") },
  // ];

  const studentStaticItems = [
    { path: "/baseactivities/talabalar-hayoti/", text: t("Talabalar hayoti") },
    { path: "/activity/talabalarga/karyera/", text: t("Karyera") },
    { path: "/university-union", text: t("universityUnion") },
    { path: "/activity/talabalarga/talabalar-turar-joyi", text: t("Talabalar turar joyi") },
    { path: "/activity/talabalarga/alochi-talabalar", text: t("Iqtidorlilar va chempionlar") },
    { path: "/scholarship", text: t("Stipendiantlar") },
    // { path: "/dropdown/imtiyozlar", text:t("Imtiyozlar") },
    // { path: "/about-uni", text: t("Talabalar hayoti") },
    // { href: "/library", text: t("Kutubxona") },
  ];

  const newsStaticItems = [
    { path: "/news", text: t("Yangiliklar") },
    { path: "/announce", text: t("E'lonlar") },
    // { path: "/anons", text: t("Tadbirlar") },
    { path: "/contact", text: t("Bog'lanish") },
  ];

  const xalqaro = [
    // { path: "/cooperations/mahalliy-hamkorliklar", text: t("Mahalliy hamkorlik") },
    { path: "/activity/hamkorlik/xalqaro-aloqalar", text: t("Xalqaro aloqalar") },
    { path: "/confession", text: t("Xalqaro e'tirof") },
    { path: "/activity/hamkorlik/xorijda-talim", text: t("Xorijda ta'lim") },
    { path: "/partners", text: t("partners") },
  ];
  const menu = [
    {text: t("Universitet") },
    {text: t("Faoliyat") },
    {text: t("Hamkorlik") },
    {text: t("Talabalarga") },
    {text: t("Axborot xizmati") },
  ];

  // const xalqaro2 = [
   
  // ];

  // useEffect(() => {
  //   const fetchMenus = async () => {
  //     try {
  //       const menuResponse = await axios.get(
  //         BaseURL + "api/pagecreate/menus/"
  //       );
  //       const dropdownResponse = await axios.get(
  //         BaseURL + "api/pagecreate/dropdowns/"
  //       );
  //       setMenus(menuResponse.data);
  //       setDropdowns([]);
  //     } catch (error) {
  //       console.error("Error fetching menu and dropdown data:", error);
  //     }
  //   };

  //   fetchMenus();
  // }, []);

  const active = ({ isActive }) => {
    return {
      color: isActive ? "var(--primary-color)" : "var(--txt-dark-grey-color)",
    };
  };

  const handleMouseEnter = (menuId) => {
    setShowDropdown(menuId);
  };

  const handleMouseLeave = () => {
    setShowDropdown(null);
  };

  const getLogo = () => {
    switch (i18n.language) {
      case "en":
        return navbarLogoEng;
      case "ru":
        return navbarLogoRu;
      default:
        return navbarLogo;
    }
  };

  return (
    <div>
      <div className={classes["testRejim"]}>
        <p>▴ Sayt test rejimida ishlamoqda ▴</p>
      </div>
      <div className={classes["aboweHeader"]}>
        <a href="https://student.renessans-edu.uz/dashboard/login">{t("hemis")}</a>
        {/* <a href="https://syllabus.renessans-edu.uz">{t("syllabus")}</a> */}
        <a href="https://timetable.renessans-edu.uz">{t("timetable")}</a>
        <a href="https://conference.renessans-edu.uz/">{t("conference")}</a>
        <a href="/journal">{t("journal")}</a>
        <a href="/">{t("acceptance")}</a>
        <a href="https://lib.renessans-edu.uz/uz/library/1">{t("E-LIB")}</a>
        <a href="#">{t("E-LAB")}</a>
        <div
          className={classes.elabDropdownWrapper}
          onMouseEnter={() => setShowElabDropdown(true)}
          onMouseLeave={() => setShowElabDropdown(false)}
          style={{ display: "inline-block", position: "relative" }}
        >
        </div>
      </div>
      <div className={classes["navbar-wrapper"]}>
        <div className={classes["navbar"]}>
          <Link to="/">
            <img
              className={classes["navbar-logo"]}
              src={getLogo()}
              alt="logo"
            />
          </Link>
          <div className={classes["navbar-items"]}>
            {menu.map((menyu, index_menyu) => (
              <NavLink
                key={index_menyu}
                className={classes["item"]}
                style={active}
                onMouseEnter={() => handleMouseEnter(index_menyu)}
                onMouseLeave={handleMouseLeave}
              >
                {t(menyu.text)}
                {showDropdown === index_menyu && (
                  <div className={`${classes["open"]}`}>
                    {index_menyu === 0 &&
                      <div className={`${classes["dropdown"]} ${classes["open"]}`}>
                        {staticDropdownItems.map((item, index) => (
                          <NavLink
                            key={index}
                            to={item.path}
                            className={classes["dropdown-item"]}
                          >
                            {t(item.text)}
                          </NavLink>
                        
                        ))}
                      </div>
                    }
                    {index_menyu === 1 && 
                      <div className={`${classes["dropdown2"]} ${classes["open"]}`}>
                        {[staticItemsColumn1, staticItemsColumn2, staticItemsColumn3,// staticItemsColumn4,
                          ].map((staticItems, columnIndex) => (
                            <div
                              className={classes["dropdown-column"]}
                              key={columnIndex}
                            >
                              <div className={classes["dropdown-category"]}>
                                {columnIndex === 0 && t("Ilmiy faoliyat")}
                                {columnIndex === 1 &&
                                  t("Madaniy-ma'rifiy faoliyat")}
                                {columnIndex === 2 && t("O'quv faoliyat")}
                                {/* {columnIndex === 3 && t("O'quv-uslubiy ta'minot")} */}
                              </div>
                              {staticItems.map((item, index) => (
                                item.path.startsWith('https') ? (
                                  <a
                                    href={item.path}
                                    className={classes["dropdown-item"]}
                                  >
                                    {t(item.text)}
                                  </a>
                                ) : (
                                  <NavLink
                                    key={index}
                                    to={item.path}
                                    className={classes["dropdown-item"]}
                                  >
                                    {t(item.text)}
                                  </NavLink>
                                )
                              ))}
                            </div>
                          ))}
                        </div>
                    }
                    {index_menyu === 2 &&
                      <div className={`${classes["dropdown3"]} ${classes["open"]}`}>
                        {[xalqaro].map(
                          (staticItems, columnIndex) => (
                            <div
                              className={classes["dropdown-column"]}
                              key={columnIndex}
                            >
                              {staticItems.map((item, index) => (
                                item.path.startsWith('http') ? (
                                  <a
                                    key={index}
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes["dropdown-item"]}
                                  >
                                    {t(item.text)}
                                  </a>
                                ) : (
                                  <NavLink
                                    key={index}
                                    to={item.path}
                                    className={classes["dropdown-item"]}
                                  >
                                    {t(item.text)}
                                  </NavLink>
                                )
                              ))}
                            </div>
                            )
                        )}
                      </div>
                    }
                    {index_menyu === 3 && 
                      <div className={`${classes["dropdown3"]} ${classes["open"]}`}>
                        {[studentStaticItems].map(
                          (staticItems, columnIndex) => (
                            <div
                              className={classes["dropdown-column"]}
                              key={columnIndex}
                            >
                              {staticItems.map((item, index) => (
                                item.path.startsWith('http') ? (
                                  <a
                                    key={index}
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes["dropdown-item"]}
                                  >
                                    {t(item.text)}
                                  </a>
                                ) : (
                                  <NavLink
                                    key={index}
                                    to={item.path}
                                    className={classes["dropdown-item"]}
                                    >
                                      {t(item.text)}
                                  </NavLink>
                                )
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    }
                    {index_menyu === 4 && 
                      <div className={`${classes["dropdown3"]} ${classes["open"]}`}>
                        {[newsStaticItems].map(
                          (staticItems, columnIndex) => (
                            <div
                              className={classes["dropdown-column"]}
                              key={columnIndex}
                            >
                              {staticItems.map((item, index) => (
                                item.path.startsWith('http') ? (
                                  <a
                                    key={index}
                                      href={item.path}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={classes["dropdown-item"]}
                                  >
                                    {t(item.text)}
                                  </a>
                                ) : (
                                  <NavLink
                                    key={index}
                                    to={item.path}
                                    className={classes["dropdown-item"]}
                                    >
                                      {t(item.text)}
                                  </NavLink>
                                )
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    }
                  </div>
                )}
              </NavLink>  
            ))}
          </div>

          <div className={classes["buttons-wrapper"]}>
            <LanguageDropDownComponent />
            <Link to="/auth">
              <div className={classes["login-button"]}>
                {t("rektorgamurojat")}
              </div>
            </Link>
            <div className={classes["accessibility-wrapper"]}>
              <ToggleSwitches />
            </div>
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
