import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageDropDownComponent from "../../components/languageDropdown/LanguageDropDownComponent";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import classes from "./Navbar.module.css";
import navbarLogo from "./main-logo.svg";
import navbarLogoEng from "./logo eng.svg";
import navbarLogoRu from "./logo rus.svg";
import axios from "axios";

import ZoomSelector from "../../utils/my/ZoomSelector";
import AudioDictorButton from "../../utils/my/AudioDictorButton";
import DarkMode from "../../utils/my/DarkMode";

import { FaEye } from "react-icons/fa";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menus, setMenus] = useState([]);
  const [dropdowns, setDropdowns] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const navigate = useNavigate();

  const staticDropdownItems = [
    { path: "/statistics", text: t("RTU raqamlarda") },
    { path: "/about", text: t("Universitet haqida") },
    { path: "/management", text: t("Rahbariyat") },
    { path: "/structure", text: t("Tuzilma") },
    { path: "/faculty-kafedra", text: t("Kafedra va fakultetlar") },
    { path: "/science-counsil", text: t("Ilmiy kengash") },
  ];

  const staticItemsColumn1 = [
    { path: "/journal", text: t("Ilmiy jurnal") },
    { path: "https://conference.renessans-edu.uz/", text: t("Konferensiyalar") },
  ];

  const staticItemsColumn2 = [
    { path: "/about-uni", text: t("Talabalar hayoti") },
    { path: "/anons", text: t("Tadbirlar") },
    { path: "/union-union", text: t("universityUnion") },
  ];

  const staticItemsColumn3 = [];

  const staticItemsColumn4 = [];

  const studentStaticItems = [
    { path: "/good-st", text: t("Bizning a'lochilar") },
    { path: "/our-campions", text: t("Bizning chempionlar") },
    { path: "/scholarship", text: t("Stipendiantlar") },
    { path: "/university-union", text: t("universityUnion") },
    { path: "/about-uni", text: t("Talabalar hayoti") },
    { href: "https://lib.renessans-edu.uz/", text: t("Kutubxona") },
  ];

  const newsStaticItems = [
    { path: "/news", text: t("Yangiliklar") },
    { path: "/announce", text: t("E'lonlar") },
    { path: "/anons", text: t("Tadbirlar") },
    { path: "/contact", text: t("Bog'lanish") },
    { path: "/confession", text: t("Xalqaro ekspertlarning fikrlari") },
  ];

  const xalqaro1 = [
    { path: "/international-cooperation/2", text: t("Mahalliy hamkorlik") },
  ];

  const xalqaro2 = [
    { path: "/international-cooperation", text: t("Xalqaro aloqalar") },
  ];

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menuResponse = await axios.get(
          "https://sayt.renessans-edu.uz/api/pagecreate/menus/"
        );
        const dropdownResponse = await axios.get(
          "https://sayt.renessans-edu.uz/api/pagecreate/dropdowns/"
        );
        setMenus(menuResponse.data);
        setDropdowns(dropdownResponse.data);
      } catch (error) {
        console.error("Error fetching menu and dropdown data:", error);
      }
    };

    fetchMenus();
  }, []);

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
      {/* <div className={classes["testRejim"]}>
        <p>▴ Sayt test rejimida ishlamoqda ▴</p>
      </div> */}
      <div className={classes["aboweHeader"]}>
        <a href="https://student.renessans-edu.uz/dashboard/login">{t("hemis")}</a>
        <a href="#">{t("syllabus")}</a>
        <a href="#">{t("timetable")}</a>
        <a href="https://conference.renessans-edu.uz/">{t("conference")}</a>
        <a href="/journal">{t("journal")}</a>
        <a href="#">{t("acceptance")}</a>
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
            {menus.map((menu) => (
              <NavLink
                key={menu.id}
                className={classes["item"]}
                style={active}
                onMouseEnter={() => handleMouseEnter(menu.id)}
                onMouseLeave={handleMouseLeave}
              >
                {menu[`name_${i18n.language}`] || menu.name}
                {showDropdown === menu.id && (
                  <div className={`${classes["dropdown"]} ${classes["open"]}`}>
                    {menu.id === 1 &&
                      staticDropdownItems.map((item, index) => (
                        <NavLink
                          key={index}
                          to={item.path}
                          className={classes["dropdown-item"]}
                        >
                          {t(item.text)}
                        </NavLink>
                      ))}

                    {menu.id === 2 && (
                      <div
                        className={`${classes["dropdown2"]} ${classes["open"]}`}
                      >
                        {[
                          staticItemsColumn1,
                          staticItemsColumn2,
                          staticItemsColumn3,
                          staticItemsColumn4,
                        ].map((staticItems, columnIndex) => (
                          <div
                            className={classes["dropdown-column"]}
                            key={columnIndex}
                          >
                            <div className={classes["dropdown-category"]}>
                              {columnIndex === 0 && t("Ilmiy faoliyat")}
                              {columnIndex === 1 &&
                                t("Madaniy-ma'rifiy faoliyat")}
                              {columnIndex === 2 && t("Moliyaviy faoliyat")}
                              {columnIndex === 3 && t("O'quv-uslubiy ta'minot")}
                            </div>
                            {staticItems.map((item, index) => (
                              <NavLink
                                key={index}
                                to={item.path}
                                className={classes["dropdown-item"]}
                              >
                                {t(item.text)}
                              </NavLink>
                            ))}
                            {dropdowns
                              .filter(
                                (dropdown) => dropdown.menu === menu.name_uz
                              )
                              .map((dropdown, index) => {
                                const column = index % 4; // This ensures dropdowns are distributed evenly across columns (0 to 3)
                                if (column === columnIndex) {
                                  return (
                                    <NavLink
                                      key={dropdown.id}
                                      to={`/dropdown/${dropdown.slug}`}
                                      className={classes["dropdown-item"]}
                                    >
                                      {dropdown[`site_title_${i18n.language}`]}
                                    </NavLink>
                                  );
                                }
                                return null;
                              })}
                          </div>
                        ))}
                      </div>
                    )}

                    {menu.id === 4 &&
                      studentStaticItems.map((item, index) => (
                        <NavLink
                          key={index}
                          to={item.href || item.path}
                          className={classes["dropdown-item"]}
                        >
                          {t(item.text)}
                        </NavLink>
                      ))}

                    {menu.id === 3 && (
                      <div
                        className={`${classes["dropdown3"]} ${classes["open"]}`}
                      >
                        {[xalqaro2, xalqaro1].map(
                          (staticItems, columnIndex) => (
                            <div
                              className={classes["dropdown-column"]}
                              key={columnIndex}
                            >
                              <div className={classes["dropdown-category"]}>
                                {columnIndex === 0 && t("Xalqaro hamkorlik")}
                                {columnIndex === 1 && t("Mahalliy hamkorlik")}
                              </div>
                              {staticItems.map((item, index) => (
                                <NavLink
                                  key={index}
                                  to={item.path}
                                  className={classes["dropdown-item"]}
                                >
                                  {t(item.text)}
                                </NavLink>
                              ))}
                              {/* Distribute API dropdowns sequentially across columns */}
                              {dropdowns
                                .filter(
                                  (dropdown) => dropdown.menu === menu.name_uz
                                )
                                .map((dropdown, index) => {
                                  const column = index % 2; // For two columns, this ensures dropdowns are distributed across column 0 and 1
                                  if (column === columnIndex) {
                                    return (
                                      <NavLink
                                        key={dropdown.id}
                                        to={`/dropdown/${dropdown.slug}`}
                                        className={classes["dropdown-item"]}
                                      >
                                        {
                                          dropdown[
                                            `site_title_${i18n.language}`
                                          ]
                                        }
                                      </NavLink>
                                    );
                                  }
                                  return null;
                                })}
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {menu.id === 5 &&
                      newsStaticItems.map((item, index) => (
                        <NavLink
                          key={index}
                          to={item.path}
                          className={classes["dropdown-item"]}
                        >
                          {t(item.text)}
                        </NavLink>
                      ))}
                    {dropdowns
                      .filter((dropdown) => dropdown.menu === menu.name_uz)
                      .map((dropdown) => (
                        <NavLink
                          key={dropdown.id}
                          to={`/dropdown/${dropdown.slug}`}
                          className={classes["dropdown-item"]}
                        >
                          {dropdown.site_title_uz}
                        </NavLink>
                      ))}
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
              <FaEye className={classes["accessibility-icon"]} />
              <div className={classes["accessibility-buttons"]}>
                <ZoomSelector />
                <AudioDictorButton />
                <DarkMode />
              </div>
            </div>
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
