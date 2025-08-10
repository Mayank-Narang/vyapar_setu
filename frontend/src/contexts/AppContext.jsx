
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('discover');
  const [fontSize, setFontSize] = useState(16);

  const changeFontSize = (delta) => {
    setFontSize((size) => Math.max(10, size + delta));
  };

  const resetFontSize = () => setFontSize(16);

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      fontSize,
      changeFontSize,
      resetFontSize
    }}>
      {children}
    </AppContext.Provider>
  );
};
