import React, { useEffect, useState } from 'react';
import { CircularProgress, Pagination } from '@mui/material';

import ExamResultsSearchBar from './examResultsSearchBar/ExamResultsSearchBar';
import ExamResultsTable from './examResultsTable/ExamResultsTable';
import ExcelUploader from '../../shared/components/excelUploader/ExcelUploader';

import classes from './ExamResults.module.css';
const ExamResults = () => {
  const [searchText, setSearchText] = useState('');
  const [searchClass, setSearchClass] = useState('');
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = () => {
    const filtered = userData.filter((value) =>
      value.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) &&
      searchClass.length === 0
        ? true
        : value.class === searchClass
    );
    setUserData(filtered);
    setIsLoading(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [userData]);

  return (
    <section className={classes['wrapper']}>
      <div className={classes['container']}>
        <h1 className={classes['header']}>
          <span className='span_blue'>249-maktab</span> CHSB natijalari
        </h1>
        <p className={classes['descr']}>
          Ortiqcha muammolarsiz CHSB natijalaringizni ko'ring
        </p>

        {userData.length === 0 ? (
          <ExcelUploader
            setIsLoading={setIsLoading}
            setUserData={setUserData}
          />
        ) : (
          <div className={classes['flex']}>
            <ExamResultsSearchBar
              setSearchText={setSearchText}
              setSearchClass={setSearchClass}
              handleSearch={handleSearch}
            />{' '}
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <ExamResultsTable userData={userData} />
                <div className={classes['pagination-box']}>
                  <Pagination count={5} variant='outlined' shape='rounded' />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExamResults;
