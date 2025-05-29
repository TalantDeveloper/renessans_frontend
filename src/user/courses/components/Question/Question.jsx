import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { questions } from '../../utils/questions';
import Checked from '../../assets/checked.png';

import classes from './Question.module.css';

const Question = () => {
  const { t } = useTranslation();
  const currentLang=localStorage.getItem('i18nextLng')

  const [isClassificationVisible, setClassificationVisible] = useState(
    Array(questions.length).fill(false)
  );

  const toggleClassification = (index) => {
    const newVisibility = [...isClassificationVisible];
    newVisibility[index] = !newVisibility[index];
    setClassificationVisible(newVisibility);
  };

  return (
    <div id='question'>
      <div className={classes['questions']}>
        <div className={classes['container']}>
          <div className={classes['questionsTitle']}>
            <h1>
            {t("questionTitle")}
              <span className='span_blue'>{t('questionSpan')}</span>
            </h1>
            <p>{t(`questionDescr`)}</p>
          </div>

          {questions.map((value, index) => (
            <div
              data-aos='fade-up'
              data-aos-duration='10000'
              data-aos-easing='ease-out-cubic'
              className={classes['mainQuest']}
              key={index}
              onClick={() => toggleClassification(index)}
            >
              <div className={classes['question']}>
                <p className={classes['questP']}>
                  <p> {`${index + 1}`}</p> {value[currentLang].qs}
                </p>
                <button
                  style={{
                    transform: isClassificationVisible[index]
                      ? 'rotate(0deg)'
                      : 'rotate(180deg)',
                  }}
                >
                  {isClassificationVisible[index] ? '-' : '+'}
                </button>
              </div>
              <div
                style={{
                  maxHeight: isClassificationVisible[index] ? '100px' : '0px',
                }}
                className={classes['classification']}
              >
                <div className={classes['classification-box']}>
                  <img src={Checked} alt='' />
                  <p>{t(`${value[currentLang].answer}`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
