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
    { path: "/library", text: "Ilmiy maqolalar" },
    { path: "/science-counsil", text: "Ilmiy kengash" },
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
  { text: "Ilmiy faoliyat", dropdown: "ilmiyFaoliyat" },
  { text: "Talabalarga", dropdown: "talabalar" },
  { text: "Bizning faoliyat", dropdown: "bizningFaoliyat" },
  { path: "/contact", text: "Bog'lanish" },
];

const HamburgerMenu = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

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
                  {dropdownItems[item.dropdown].map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subItem.path}
                      className={classes["dropdown-item"]}
                      style={active}
                      onClick={() => setOpen(false)}
                    >
                      {t(subItem.text)}
                    </NavLink>
                  ))}
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
