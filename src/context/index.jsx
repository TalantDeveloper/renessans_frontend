import React from 'react';
import NewsProvider from './News/newsContext';
import StatusContextProvider from './StatusContextProvider/StatusContextProvider';

export const MainContextProvider = ({ children }) => {
  return (
    <NewsProvider>
      <StatusContextProvider>{children}</StatusContextProvider>
    </NewsProvider>
  );
};

export default MainContextProvider;
