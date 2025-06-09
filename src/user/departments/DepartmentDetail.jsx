import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import "slick-carousel/slick/slick.css"; // Slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Slick carousel theme styles
import classes from "./departmentsDetail.module.css";
import {BaseURL, testUrl} from "../home/BaseData";
const DepartmentDetails = () => {
    const {short_id} = useParams();
    const {t, i18n} = useTranslation(); // Access i18n instance
    const [data, setData] = useState(null);
    const [employees, setEmployees] = useState(null);
    const [boss, setBoss] = useState(null);
    const [openDropdown, setOpenDropdown] = useState({});

    
    // console.log("data", data);
    // console.log(employees);

    useEffect(() => {

        axios
            .get(
                testUrl + "/api/department/department/" + short_id
            )
            .then((response) => {
                setData(response.data.department);
                setEmployees(response.data.employees);
                setBoss(response.data.boss);
            })
            .catch((error) =>
                console.error("Error fetching departments data: ", error)
            );

    }, [i18n.language]);
    

    // Get the first staff member
    const toggleDropdown = (id, type) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [id]: {
        activities: type === "activities" ? !prev[id]?.activities : false,
        responsibilities:
          type === "responsibilities" ? !prev[id]?.responsibilities : false,
      },
    }));
  };
    // Get the rest of the staff members

    return (

        <div className={classes.mainContainer}>
              <div data-aos="fade-up" className={classes["rahbariyat-container"]}>
                <h1 className={classes["page-title"]}>
                    {data?.name_uz}
                </h1>
        
                    <div
                      className={`${classes.card}`}
                      key={boss?.id}
                    >
                      <div
                        className={classes.headerRight }
                      >
                        <div className={classes.info}>
                          <h2>{boss['name_' + i18n?.language]}</h2>
                          <p>{boss['position_' + i18n?.language]}</p>
                          <div className={classes.contact}>
                            <div className={classes.contactItem}>
                              <FaPhoneAlt className={classes.icon} />
                              <span>{boss?.phone}</span>
                            </div>
                            <div className={classes.contactItem}>
                              <FaEnvelope className={classes.icon2} />
                              <span>{boss?.email}</span>
                            </div>
                          </div>
                          <div className={classes.buttons}>
                            <button
                              className={classes.button}
                              onClick={() => toggleDropdown(boss?.id, "activities")}
                            >
                              {t("work_experience")}{" "}
                              {openDropdown[boss?.id]?.activities ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </button>
                            <button
                              className={classes.button}
                              onClick={() =>
                                toggleDropdown(boss?.id, "responsibilities")
                              }
                            >
                              {t("tasks")}{" "}
                              {openDropdown[boss?.id]?.responsibilities ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </button>
                          </div>
                          <div
                            className={`${classes.dropdownContent} ${
                              openDropdown[boss?.id]?.activities ? classes.show : ""
                            }`}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: boss['about_' + i18n?.language],
                              }}
                            />
                          </div>
                          <div
                            className={`${classes.dropdownContent} ${
                              openDropdown[boss?.id]?.responsibilities
                                ? classes.show
                                : ""
                            }`}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: boss['specialization_' + i18n?.language],
                              }}
                            />
                          </div>
                        </div>
        
                        <div className={classes.imageWrapper}>
                          <img
                            src={testUrl + boss?.image} // Fallback to default image if not available
                            alt={boss['name_' + i18n?.language]}
                            className={classes.logo}
                          />
                        </div>
                      </div>
                    </div>
                  
                    {employees.map((employee, index) => (
                        <div
                            className={`${classes.card} ${
                            index === 0 ? classes.highlightedCard : ""
                            }`}
                            key={employee.id}
                        >
                        <div
                        className={classes.headerLeft}
                        >
                            <div className={classes.info}>
                                <h2>{employee[`name_${i18n.language}`]}</h2>
                                <p>{employee[`position_${i18n.language}`]}</p>
                                <div className={classes.contact}>
                    <div className={classes.contactItem}>
                      <FaPhoneAlt className={classes.icon} />
                      <span>{employee.phone}</span>
                    </div>
                    <div className={classes.contactItem}>
                      <FaEnvelope className={classes.icon2} />
                      <span>{employee.email}</span>
                    </div>
                  </div>
                  <div className={classes.buttons}>
                    <button
                      className={classes.button}
                      onClick={() => toggleDropdown(employee.id, "activities")}
                    >
                      {t("work_experience")}{" "}
                      {openDropdown[employee.id]?.activities ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                    <button
                      className={classes.button}
                      onClick={() =>
                        toggleDropdown(employee.id, "responsibilities")
                      }
                    >
                      {t("tasks")}{" "}
                      {openDropdown[employee.id]?.responsibilities ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  </div>
                  <div
                    className={`${classes.dropdownContent} ${
                      openDropdown[employee.id]?.activities ? classes.show : ""
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: employee[`about_${i18n.language}`],
                      }}
                    />
                  </div>
                  <div
                    className={`${classes.dropdownContent} ${
                      openDropdown[employee.id]?.responsibilities
                        ? classes.show
                        : ""
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: employee[`about_${i18n.language}`],
                      }}
                    />
                  </div>
                </div>

                <div className={classes.imageWrapper}>
                  <img
                    src={testUrl + employee.image} // Fallback to default image if not available
                    alt={employee[`name_${i18n.language}`]}
                    className={classes.logo}
                  />
                </div>
              </div>
            </div>
          ))}
              </div>
        
            </div>
    );
};

export default DepartmentDetails;
