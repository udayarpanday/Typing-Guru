import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [totalwpm, setTotalWpm] = useState([0]);
  const [totalAcc, setTotalAcc] = useState([0]);
  const [totalMistake, setTotaMistake] = useState([0]);



  return (
    <AppContext.Provider
      value={{
        totalwpm,
        totalAcc,
        totalMistake,
        setTotaMistake,
        setTotalAcc,
        setTotalWpm

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default { AppContext, AppProvider };
