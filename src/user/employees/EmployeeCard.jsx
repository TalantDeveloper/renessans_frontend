import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './EmployeeCard.module.css';

const stripHtml = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const EmployeeCard = ({ employee }) => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  if (!employee) {
    return null;
  }

  const name = employee[`name_${language}`] || employee.name_uz;
  const position = employee[`position_${language}`] || employee.position_uz;
  const workExperience = employee[`work_experience_${language}`] || employee.work_experience_uz;
  const specializationText = stripHtml(employee[`specialization_${language}`] || employee.specialization_uz);
  const email = employee.email;

  let imageUrl = employee.image;


  return (
    <div className={styles.card}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} className={styles.image} />
      ) : (
        <div className={styles.imagePlaceholder}>No Image</div>
      )}
      <div className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.detailItem}>
          <span className={styles.label}>{i18n.t('employeeCard.position')}:</span> {position}
        </p>
        <p className={styles.detailItem}>
          <span className={styles.label}>{i18n.t('employeeCard.experience')}:</span> {workExperience}
        </p>
        <p className={styles.detailItem}>
          <span className={styles.label}>{i18n.t('employeeCard.specialization')}:</span> {specializationText}
        </p>
        <p className={styles.detailItem}>
          <span className={styles.label}>{i18n.t('employeeCard.email')}:</span> {email}
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;
