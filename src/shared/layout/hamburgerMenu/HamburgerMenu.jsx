import React, { useState } from "react";
import { Turn } from "hamburger-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classes from "./HamburgerMenu.module.css";

// Define the dropdown items here (or import them if they are available globally)
const dropdownItems = {
  universitet: [
    { path: "/statistics", text: "RTU raqamlarda"},
    { path: "/about", text: "Universitet haqida" },
    { path: "/management", text: "Rahbariyat" },
    { path: "/structure", text: "Universitet tuzilmasi" },
    { path: "/international-cooperation", text: "Xalqaro hamkorlik" },
    { path: "/faculty-kafedra", text: "Kafedra va fakultetlar" },
    { path: "/departments", text: "center"},
    { path: "/dropdown/oquv-binolari", text: "O'quv binolari" },
    { path: "/dropdown/green-renessans", text: "Green Renessans" },
  ],
  ilmiyFaoliyat: [
    {
      text: "Ilmiy faoliyat",
      children: [
        { path: "/journal", text: "Ilmiy jurnal" },
        { path: "https://conference.renessans-edu.uz/", text: "Konferensiyalar" },
        { path: "/dropdown/ilmiy-loyihalar", text: "Ilmiy loyihalar" },
        { path: "/dropdown/oquv-rejalari", text: "O'quv rejalari" },
        { path: "/dropdown/ilmiy-maktablar", text: "Ilmiy maktablar" },
        { path: "/dropdown/murabbiylik-faoliyati", text: "Murabbiylik faoliyati" },
      ]
    },
    {
      text: "Madaniy-ma'rifiy faoliyat",
      children: [
        { path: "/about-uni", text: "Talabalar hayoti" },
        { path: "/anons", text: "Muhim sanalar" },
        { path: "/university-union", text: "University union" },
        { path: "/dropdown/ilmiy-konferensiyalar", text: "Ilmiy konferensiyalar" },
        { path: "/dropdown/nazorat-sinovlari", text: "Nazorat sinovlari" },
        { path: "/ilmiy-jurnal", text: "Ilmiy jurnal" },
        { path: "/dropdown/axborot-resurs-markazi", text: "Axborot resurs markazi" },
      ]
    },
    {
      text: "O'quv faoliyat",
      children: [
        { path: "/dropdown/madaniy-marifiy-tadbirlar", text: "Madaniy-ma'rifiy tadbirlar" },
        { path: "/dropdown/sport-klubi", text: "Sport klubi" },
        { path: "/dropdown/odob-axloq-qoidalari", text: "Odob axloq qoidalari" },
        { path: "/dropdown/zakovat-klubi", text: "Zakovat klubi" },
      ]
    },
    {
      text: "O'quv-uslubiy ta'minot",
      children: [
        { path: "/dropdown/yosh-akademiklar", text: "Yosh akademiklar" },
        { path: "/dropdown/talabalar-turar-joyi", text: "Talabalar turar joyi" },
        { path: "/dropdown/bmi-mavzulari", text: "BMI mavzulari" },
      ]
    },
  ],
  talabalarga: [
    { path: "/good-st", text: "Universitet iqtidorlari" },
    { path: "/scholarship", text: "Universitet stipendiantlari" },
    { path: "about-uni", text: "Talabalar hayoti" },
    { path: "/dropdown/imtiyozlar", text: "Imtiyozlar" },
    { path: "/our-campions", text: "Universitet chempionlari" },
    { path: "/university-union", text: "University union" },
    { path: "/library", text: "Kutubxona" },
  ],
  hamkorlik: [
    {
      text: "Xalqaro hamkorlik",
      children: [
        { path: "/international-cooperation", text: "Xalqaro aloqalar" },
        { path: "/dropdown/xalqaro-hamkor-tashkilotlar", text: "Xalqaro hamkor tashkilotlar" },
      ]
    },
    {
      text: "Mahalliy hamkorlik",
      children: [
        { path: "/international-cooperation/2", text: "Mahalliy hamkorlik" },
        { path: "/dropdown/xalqaro-malaka-oshirish-va-talim", text: "Xorijda ta'lim" },
      ]
    },
  ],
  bizningFaoliyat: [
    { path: "/news", text: "Yangiliklar" },
    { path: "/anons", text: "Muhim sanalar" },
    { path: "/confession", text: "Xalqaro ekspertlarning fikrlari" },
    { path: "/announce", text: "E'lonlar" },
    { path: "/contact", text: "Bog'lanishlar" }
  ],
};

const mainRoutes = [
  { text: "Universitet", dropdown: "universitet" },
  { text: "Faoliyat", dropdown: "ilmiyFaoliyat" },
  { text: "Hamkorlik", dropdown: "hamkorlik" },
  { text: "Talabalarga", dropdown: "talabalarga" },
  { text: "Axborot xizmati", dropdown: "bizningFaoliyat" }
];

const HamburgerMenu = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openIlmiy, setOpenIlmiy] = useState(false);
  const [openMadaniy, setOpenMadaniy] = useState(false);
  const [openOquv, setOpenOquv] = useState(false);
  const [openOquvUslubiy, setOpenOquvUslubiy] = useState(false);
  const [openXalqaroHamkorlik, setOpenXalqaroHamkorlik] = useState(false);
  const [openMahalliyHamkorlik, setOpenMahalliyHamkorlik] = useState(false);

  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const active = ({ isActive }) => ({
    color: isActive ? "var(--primary-color)" : "var(--txt-dark-grey-color)",
  });

  return (
    <div className={classes["wrapper"]}>
      <Turn toggled={open} toggle={setOpen} />
      <div
        style={open ? { transform: "translateX(0)" } : null}
        className={classes["hamburger"]}
      >
        <div className={classes["nav-items"]}>
          {mainRoutes.map((item, index) => (
            <div key={index}>
              <div
                className={classes["item"]}
                onClick={() =>
                  item.dropdown
                    ? handleDropdownToggle(item.dropdown)
                    : setOpen(false)
                }
              >
                {t(item.text)}
              </div>
              {item.dropdown && activeDropdown === item.dropdown && (
                <div className={classes["dropdown"]}>
                  {dropdownItems[item.dropdown].map((subItem, subIndex) => {
                    if (subItem.children) { // Check if it's a nested dropdown
                      let openState, setOpenState;
                      switch (subItem.text) {
                        case "Ilmiy faoliyat":
                          openState = openIlmiy;
                          setOpenState = setOpenIlmiy;
                          break;
                        case "Madaniy-ma'rifiy faoliyat":
                          openState = openMadaniy;
                          setOpenState = setOpenMadaniy;
                          break;
                        case "O'quv faoliyat":
                          openState = openOquv;
                          setOpenState = setOpenOquv;
                          break;
                        case "O'quv-uslubiy ta'minot":
                          openState = openOquvUslubiy;
                          setOpenState = setOpenOquvUslubiy;
                          break;
                        case "Xalqaro hamkorlik":
                          openState = openXalqaroHamkorlik;
                          setOpenState = setOpenXalqaroHamkorlik;
                          break;
                        case "Mahalliy hamkorlik":
                          openState = openMahalliyHamkorlik;
                          setOpenState = setOpenMahalliyHamkorlik;
                          break;
                        default:
                          openState = false;
                          setOpenState = () => {}; // No-op for safety
                      }
                      return (
                        <div key={subIndex}>
                          <div
                            className={classes["dropdown-item"]}
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpenState((prev) => !prev)}
                          >
                            {t(subItem.text)}
                          </div>
                          {openState && (
                            <div style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: '0' }}>
                              {subItem.children.map((childItem, childIndex) => (
                                <NavLink
                                  key={childIndex}
                                  to={childItem.path}
                                  className={classes["dropdown-item"]}
                                  style={active}
                                  onClick={() => setOpen(false)}
                                >
                                  {t(childItem.text)}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <NavLink
                          key={subIndex}
                          to={subItem.path}
                          className={classes["dropdown-item"]}
                          style={active}
                          onClick={() => setOpen(false)}
                        >
                          {t(subItem.text)}
                        </NavLink>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          ))}
          <NavLink onClick={() => setOpen(false)} to={"/auth"}>
            <div className={classes["login-button"]}>
              {t("rektorgamurojat")}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
