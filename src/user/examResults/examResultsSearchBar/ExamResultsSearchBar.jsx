import React from 'react';

import classes from './ExamResultsSearchBar.module.css';

export const ExamResultsSearchBar = ({
  setSearchText,
  handleSearch,
  setSearchClass,
}) => {
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div data-aos='fade-down' className={classes['search-box']}>
      <input
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => handleEnter(e)}
        className={classes['search-input']}
        type='text'
        placeholder="O'quvchini Qidirish"
      />
      <select
        onChange={(e) => setSearchClass(e.target.value)}
        className={classes['search-select']}
      >
        <option value='Barcha Sinflar'>Barcha Sinflar</option>
        {['11-A', '11-B', '11-V', '11-G', '11-Z', '11-I'].map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
      <button onClick={() => handleSearch()} className={classes['search-btn']}>
        <p>Qidirish</p>
      </button>
    </div>
  );
};

export default ExamResultsSearchBar;
