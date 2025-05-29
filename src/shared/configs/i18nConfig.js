import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationRU from "./locales/ru/translation.json";
import translationUZ from "./locales/uz/translation.json";

import EnglishFlag from "../assets/images/icons/uk.svg";
import RusFlag from "../assets/images/icons/rus.svg";
import UzbFlag from "../assets/images/icons/uzb.svg";

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
  uz: {
    translation: translationUZ,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "uz",
    lng: "uz",
    keySeparator: "^",
    nsSeparator: "~",
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export const languageMenu = [
  {
    id: "2987bf89-0a39-4005-b75d-b612526bbd79",
    title: "English",
    shortTitle: "En",
    code: "en",
    icon: EnglishFlag,
  },
  {
    id: "8acc7d82-d909-4232-b40e-400e8875c271",
    title: "Русский",
    shortTitle: "Ру",
    code: "ru",
    icon: RusFlag,
  },
  {
    id: "8acc7d82-d909-4232-b40e-400e8875c222",
    title: "O'zbekcha",
    shortTitle: "O'z",
    code: "uz",
    icon: UzbFlag,
  },
];

export default i18n;
