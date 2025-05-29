import React, { createContext, useContext, useState } from 'react';

export const NewsContext = createContext();
export const useNewsContext = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);
  return (
    <NewsContext.Provider value={[newsData, setNewsData]}>
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
