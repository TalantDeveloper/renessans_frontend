import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem } from "@mui/material";
import classNames from "classnames";

import { languageMenu } from "../../configs/i18nConfig";

import classes from "./LanguageDropDownComponent.module.css";

const LanguageDropDownComponent = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(languageMenu[1]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnLanguageMenuItemSelected = (item) => {
    if (language.id !== item.id) {
      handleClose();
      i18n.changeLanguage(item.code);
      setLanguage(item);
    }
  };

  useEffect(() => {
    const detectedLanguageMenu = languageMenu.find((l) =>
      i18n.language.includes(l.code)
    );

    if (detectedLanguageMenu) setLanguage(detectedLanguageMenu);
  }, [i18n.language]);

  return (
    <div>
      <div
        className={`${classes["language_change_button"]} `}
        variant="outlined"
        onClick={handleClick}
      >
        <span className={classes["language_name"]}>{language.shortTitle}</span>
        <img src={language.icon} alt={language.title} />
      </div>
      <Menu
        className={classes["language_menu"]}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ mt: 1 }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        slotProps={{
          paper: {
            sx: {
              overflow: "visible",
              borderRadius: "12px",
              width: "150px",
              boxShadow: "2px 2px 50px 0px rgba(0, 0, 0, 0.15)",
              mt: 1.5,
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: 70,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        {languageMenu.map((option) => {
          return (
            <MenuItem
              className={classNames({
                [`${classes["language_item"]}`]: true,
                [`${classes["active_language"]}`]:
                  option.code === language.code,
              })}
              key={option.id}
              onClick={() => handleOnLanguageMenuItemSelected(option)}
            >
              <img src={option.icon} alt={option.title} />
              <span className={classes["language_name"]}>{option.title}</span>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default LanguageDropDownComponent;
