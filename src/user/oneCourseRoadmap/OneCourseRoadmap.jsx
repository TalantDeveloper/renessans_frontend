import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { coursesData } from '../courses/utils/coursesData';
import { EnglishCourseRoadmapData } from './utils/EnglishCourseRoadmapData';
import Roadmap from './Roadmap/Roadmap';

import classes from './OneCourseRoadmap.module.css';

export const OneCourseRoadmap = () => {
  const [moduleFinder, setModuleFinder] = useState('module1');
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [oneData, setOneData] = useState({});

  const { courseName, courseCategory } = useParams();

  const handleModule = (value) => {
    setModuleFinder(value);
    setIsLoaderActive(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaderActive(false);
    }, 1000);
  }, [moduleFinder]);

  useEffect(() => {
    // data

    const mainFiltered = coursesData?.filter(
      (e) => e.source.toLocaleLowerCase() === courseCategory.toLocaleLowerCase()
    );

    const filtered = mainFiltered[0]?.courses.filter(
      (value) => value.courseName === courseName
    );

    setOneData(filtered[0]);
  }, [courseName, courseCategory]);

  return (
    <div className={classes['wrapper']}>
      <div className={classes['container']}>
        <h1 className={classes['header']}>{oneData?.courseName}</h1>
        <p className={classes['descr']}>{oneData?.descr}</p>
        <div className={classes['module-row']}>
          {Object?.keys(EnglishCourseRoadmapData).map((value) => {
            return (
              <div
                onClick={() => handleModule(value)}
                className={`${classes['module-box']} ${
                  moduleFinder === value && classes['active']
                }`}
              >
                <p className={classes['module-text']}>{value}</p>
              </div>
            );
          })}
        </div>
        {isLoaderActive ? (
          <CircularProgress className={classes['loader']} />
        ) : (
          <Roadmap
            oneCourseRoadmap={oneData?.child}
            moduleFinder={moduleFinder}
          />
        )}
      </div>
    </div>
  );
};
