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
    { path: "/faculty-kafedra", text: "Kafedra va Fakultetlar" },
    { path: "/departments", text: "Bo'lim va Markazlar"},
    { path: "/dropdown/oquv-binolari", text: "O'quv binolar" },
    { path: "/dropdown/green-renessans", text: "Green Renessans" },
  ],
  ilmiyFaoliyat: [
    { path: "/library", text: "Ilmiy faoliyat" },
    { path: "/science-counsil", text: "Madaniy-ma'rifiy faoliyat" },
    { path: "/science-counsil", text: "O'quv faoliyat" },
    { path: "/science-counsil", text: "O'quv-uslubiy ta'minot" },
  ],
  talabalar: [
    { path: "/library", text: "Kutubxona" },
    { path: "/courses", text: "Onlayn darslar" },
    { path: "/class-table", text: "Dars jadvali" },
  ],
  bizningFaoliyat: [
    { path: "/about-uni", text: "Talabalar hayoti" },
    { path: "/our-campions", text: "Bizning chempionlar" },
    { path: "/good-st", text: "Universitet a'lochilari" },
    { path: "/university-union", text: "University Union" },
  ],
};

const mainRoutes = [
  { text: "Universitet", dropdown: "universitet" },
  { text: "Faoliyat", dropdown: "ilmiyFaoliyat" },
  { text: "Talabalarga", dropdown: "talabalar" },
  { text: "Bizning faoliyat", dropdown: "bizningFaoliyat" },
  { path: "/contact", text: "Bog'lanish" },
];

const HamburgerMenu = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openIlmiy, setOpenIlmiy] = useState(false);
  const [openMadaniy, setOpenMadaniy] = useState(false);

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
                    if (item.dropdown === "ilmiyFaoliyat" && subItem.text === "Ilmiy faoliyat") {
                      return (
                        <div key={subIndex}>
                          <div
                            className={classes["dropdown-item"]}
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpenIlmiy((prev) => !prev)}
                          >
                            {t("Ilmiy faoliyat")}
                          </div>
                          {openIlmiy && (
                            <div style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: '0' }}>
                              <NavLink to="/journal" className={classes["dropdown-item"]} style={active} onClick={() => setOpen(false)}>{t("Ilmiy jurnal")}</NavLink>
                              <NavLink to="/conference" className={classes["dropdown-item"]} style={active} onClick={() => setOpen(false)}>{t("Konferensiyalar")}</NavLink>
                              <NavLink to="/dropdown/ilmiy-loyihalar" className={classes["dropdown-item"]} style={active} onClick={() => setOpen(false)}>{t("Ilmiy loyihalar")}</NavLink>
                              <NavLink to="/dropdown/oquv-rejalari" className={classes["dropdown-item"]} style={active} onClick={() => setOpen(false)}>{t("O'quv rejalari")}</NavLink>
                              <NavLink to="/dropdown/ilmiy-maktablar" className={classes["dropdown-item"]} style={active} onClick={() => setOpen(false)}>{t("Ilmiy maktablar")}</NavLink>
                              <NavLink to="/dropdown/murabbiylik-faoliyati" className={classes["dropdown-item"]} style={active} onClick={() => setOpen(false)}>{t("Murabbiylik faoliyati")}</NavLink>
                            </div>
                          )}
                        </div>
                      );
                    } else if (item.dropdown === "ilmiyFaoliyat" && subItem.text === "Madaniy-ma'rifiy faoliyat") {
                      return (
                        <div key={subIndex}>
                          <div
                            className={classes["dropdown-item"]}
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpenMadaniy((prev) => !prev)}
                          >
                            {t("Madaniy-ma'rifiy faoliyat")}
                          </div>
                          {openMadaniy && (
                            <div style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: '0' }}>
                              <NavLink to="/about-uni" className={classes["dropdown-item"]} style={active} onClick={() => setOpen(false)}>{t("Talabalar hayoti")}</NavLink>
                              <NavLink to="/anons" className={classes["dropdown-item"]} style={active} onClick={() => setOpen(false)}>{t("Muhim sanalar")}</NavLink>
                              <NavLink to="/university-union" className={classes["dropdown-item"]} style={active} onClick={() => setOpen(false)}>{t("University union")}</NavLink>
                              <NavLink to="/dropdown/ilmiy-konferensiyalar" className={classes["dropdown-item"]} style={active} onClick={() => setOpen(false)}>{t("Ilmiy konferensiyalar")}</NavLink>
                              <NavLink to="/dropdown/nazorat-sinovlari" className={classes["dropdown-item"]} style={active} onClick={() => setOpen(false)}>{t("Nazorat sinovlari")}</NavLink>
                              <NavLink to="/journal" className={classes["dropdown-item"]} style={active} onClick={() => setOpen(false)}>{t("Ilmiy jurnal")}</NavLink>
                              <NavLink to="/dropdown/axborot-resurs-markazi" className={classes["dropdown-item"]} style={active} onClick={() => setOpen(false)}>{t("Axborot resurs markazi")}</NavLink>
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
              {t("Rektorga murojaat")}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
