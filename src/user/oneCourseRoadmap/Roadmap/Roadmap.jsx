import React, { useState } from 'react';

import { questions } from '../../courses/utils/questions';

import classes from './Roadmap.module.css';

const Roadmap = ({ moduleFinder, oneCourseRoadmap }) => {
  const [isClassificationVisible, setClassificationVisible] = useState(
    Array(questions.length).fill(false)
  );

  const toggleClassification = (index) => {
    const newVisibility = [...isClassificationVisible];
    newVisibility[index] = !newVisibility[index];
    setClassificationVisible(newVisibility);
  };

  return (
    <div className={classes['questions']}>
      <div className={classes['container']}>
        {oneCourseRoadmap[moduleFinder]?.map((value, index) => (
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
                <p> {`${index + 1}`}</p> {value.lessonTitle}
              </p>
              <button>{isClassificationVisible[index] ? '-' : '+'}</button>
            </div>
            <div
              style={{
                maxHeight: isClassificationVisible[index] ? '720px' : '0px',
                padding: isClassificationVisible[index] ? '20px' : '0px',
              }}
              className={classes['classification']}
            >
              {isClassificationVisible[index] && (
                <iframe
                  className={classes['course_video']}
                  src={value.link}
                  title={value.lessonTitle}
                  frameborder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowfullscreen
                ></iframe>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
