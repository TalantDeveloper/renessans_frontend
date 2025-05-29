import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const AudioDiktor = () => {
  const audio_diktor = useSelector((s) => s?.audio_diktor);
  const [audioText, setAudioText] = useState("");
  const utterance = useRef(null);
  const { i18n } = useTranslation();
  const convertCyrillicToLatin = (text = "") => {
    const cyrillicMap = {
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "yo",
      ж: "zh",
      з: "z",
      и: "i",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "kh",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "shch",
      ъ: "",
      ы: "y",
      ь: "",
      э: "e",
      ю: "yu",
      я: "ya",
      ғ: "g'",
      қ: "q",
      ҳ: "h",
      ў: "o'",
      А: "A",
      Б: "B",
      В: "V",
      Г: "G",
      Д: "D",
      Е: "E",
      Ё: "Yo",
      Ж: "Zh",
      З: "Z",
      И: "I",
      Й: "Y",
      К: "K",
      Л: "L",
      М: "M",
      Н: "N",
      О: "O",
      П: "P",
      Р: "R",
      С: "S",
      Т: "T",
      У: "U",
      Ф: "F",
      Х: "Kh",
      Ц: "Ts",
      Ч: "Ch",
      Ш: "Sh",
      Щ: "Shch",
      Ъ: "",
      Ы: "Y",
      Ь: "",
      Э: "E",
      Ю: "Yu",
      Я: "Ya",
      Ғ: "G'",
      Қ: "Q",
      Ҳ: "H",
      Ў: "O'",
    };

    return text.replace(
      /[а-яА-ЯғқҳўЁёЖжЧчШшЩщЪъЫыЬьЭэЮюЯя]/g,
      function (match) {
        return cyrillicMap[match];
      }
    );
  };
  const handlerFunction = (event) => {
    if (document.contains(document.getElementById("audio_dictor_btn_id"))) {
      document.getElementById("audio_dictor_btn_id").remove();
    }
    if (window.getSelection().toString().length > 0) {
      const selection = window.getSelection().toString();
      setAudioText(selection);
      var scrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
      const posX = event.clientX;
      const posY = event.clientY + 20 + scrollTop;
      document.body.insertAdjacentHTML(
        "beforeend",
        `<div id="audio_dictor_btn_id" style="top: ${posY}px; left: ${posX}px;" class="audio_dictor_btn"><svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"></path></svg></div>`
      );
    }
  };
  const audiofunk = () => {
    if (utterance.current && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    if (i18n.language === "en") {
      utterance.current = new SpeechSynthesisUtterance(
        convertCyrillicToLatin(audioText)
      );
      utterance.lang = "en-US";
    } else {
      utterance.current = new SpeechSynthesisUtterance(audioText);
      utterance.current.lang = "ru-RU";
    }
    window.speechSynthesis.speak(utterance.current);
    if (document.contains(document.getElementById("audio_dictor_btn_id"))) {
      document.getElementById("audio_dictor_btn_id").remove();
    }
  };
  useEffect(() => {
    const root = document.getElementById("root");
    if (audio_diktor) {
      root?.addEventListener("mouseup", handlerFunction, false);
    } else {
      root?.removeEventListener("mouseup", handlerFunction);
    }
    return () => {
      root?.removeEventListener("mouseup", handlerFunction);
    };
  }, [audio_diktor]);
  useEffect(() => {
    const audio_dictor_btn_id = document.getElementById("audio_dictor_btn_id");
    if (audio_dictor_btn_id) {
      audio_dictor_btn_id?.addEventListener("click", audiofunk, false);
    }
    return () => {
      audio_dictor_btn_id?.removeEventListener("click", audiofunk);
    };
  }, [audioText]);
  return <></>;
};

export default AudioDiktor;
