import React, { useState } from "react";
import { Turn } from "hamburger-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classes from "./HamburgerMenu.module.css";

// Define the dropdown items here (or import them if they are available globally)
const dropdownItems = {
  universitet: [
        { path: "/about", text: "Universitet haqida" },
        { path: "/structure", text: "Universitet tuzilmasi" },
        
        { path: "/statistics", text: "RTU raqamlarda" },
        { path: "/centers", text: 'center' },
        
        { path: "/management", text: "Rahbariyat" },
        { path: "/faculties", text: "Kafedra va fakultetlar" }, 
        { path: "/dropdown/oquv-binolari", text: "O'quv binolari" },
        { path: "/directions", text: "Yo'nalishlar" },
        { path: "/documents/normativ-huquqiy-hujjatlar", text: "document" },
        { path: "/dropdown/bosh-ish-orinlari/", text: "free jobs" },
  ],
  ilmiyFaoliyat: [
    {
      text: "Ilmiy faoliyat",
      children: [
        { path: "/newscategories/2", text: "Ilmiy jarayonlar" },
        { path: "https://conference.renessans-edu.uz/", text: "Ilmiy konferensiyalar" },
        { path: "/journal", text: "journal" },
        { path: "/activity/ilmiy-faoliyat/ilmiy-maktablar", text: "Ilmiy maktablar" },
        { path: "/dropdown/ilmiy-kengash", text: "Ilmiy kengash" },
        { path: "/activity/ilmiy-faoliyat/green-renessans", text: "Green Renessans" },
        { path: "/activity/ilmiy-faoliyat/oquv-va-labaratoriya-bazalari", text: "O‘quv va labaratoriya bazalari" },
        { path: "/dropdown/axborotlashtirish-jarayonlari", text: "Axborotlashtirish jarayonlari" },
        { path: "/activity/ilmiy-faoliyat/yosh-akademiklar", text: "Yosh akademiklar" },
        { path: "/activity/ilmiy-faoliyat/avtorefereat-dissertatsiya", text: "Avtoreferat va dissertatsiya" },
      ]
    },
    {
      text: "Madaniy-ma'rifiy faoliyat",
      children: [
        { path: "/activity/manaviy-marifiy-faoliyat/manaviyat-va-marifat-kengashi", text: "Ma’naviyat va ma’rifat Kengashi" },
        { path: "/newscategories/3", text: "Fan va jamoat arboblari bilan muloqotlar" },
        { path: "/dropdown/axborot-resurslar", text: "Axborot resurslar" },
        { path: "/newscategories/4", text: "Ma’naviy-ma’rifiy tadbirlar" },
        { path: "/newscategories/5", text: "Murabbiylar faoliyati" },
        { path: "/activity/manaviy-marifiy-faoliyat/tanlovlar", text: "Tanlovlar" },
      ]
    },
    {
      text: "O'quv faoliyat",
      children: [
        { path: "/newscategories/6", text: "Oʻquv jarayoni" },
        { path: "/activity/oquv-faoliyat/talim-jarayoni-meyoriy-hujjatlari", text: "Ta'lim jarayoni me'yoriy hujjatlari" },
        { path: "/activity/oquv-faoliyat/video-maruzalar", text: "Elektron kontentlar" },
        { path: "/activity/oquv-faoliyat/amaliyot-shartnomalari", text: "Amaliyot shartnomalari" },
        { path: "/activity/oquv-faoliyat/oquv-rejalari", text: "O'quv reja va Syllabus" },
        { path: "/activity/oquv-faoliyat/nazorat-sinovlari", text: "Nazorat sinovi va namunalari" },
        { path: "/activity/oquv-faoliyat/bmi-mavzular/", text: "BMI mavzular" },
      ]
    },
    // {
      // text: "O'quv-uslubiy ta'minot",
      // children: [
      //   { path: "/dropdown/yosh-akademiklar", text: "Yosh akademiklar" },
      //   { path: "/dropdown/zakovat-klubi", text: "Zakovat klubi" },
      //   { path: "/dropdown/talabalar-turar-joyi", text: "Talabalar turar joyi" },
      //   { path: "/dropdown/sport-klubi", text: "Sport klubi" },
      //   { path: "/dropdown/axborot-resurs-markazi", text: "Axborot resurs markazi" },
      // ]
    // },
  ],
  talabalarga: [
    { path: "/baseactivities/talabalar-hayoti/", text: "Talabalar hayoti" },
    { path: "/activity/talabalarga/karyera/", text: "Karyera" },
    { path: "/university-union", text: "universityUnion" },
    { path: "/dropdown/talabalar-turar-joyi", text: "Talabalar turar joyi" },
    { path: "/activity/talabalarga/alochi-talabalar", text: "Iqtidorlilar va chempionlar" },
    { path: "/scholarship", text: "Stipendiantlar" },
  ],
  hamkorlik: [
    { path: "/newscategories/7", text: "Xalqaro aloqalar" },
    { path: "/confession", text: "Xalqaro e'tirof" },
    { path: "/activity/hamkorlik/xorijda-talim", text: "Xorijda ta'lim" },
    { path: "/partners", text: "partners" },
  ],
  bizningFaoliyat: [
    { path: "/news", text: "Yangiliklar" },
    { path: "/announce", text: "E'lonlar" },
    // { path: "/anons", text: t("Tadbirlar") },
    { path: "/contact", text: "Bog'lanish" },
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
