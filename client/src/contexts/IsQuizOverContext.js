import React, { useState } from "react";

export const IsQuizOverContext = React.createContext();

export const IsQuizOverProvider = ({ children }) => {
  const [isQuizOver, setIsQuizOver] = useState(false);

  const updateIsQuizOver = (newValue) => {
    setIsQuizOver(newValue);
  };

  return (
    <IsQuizOverContext.Provider value={{ isQuizOver, updateIsQuizOver }}>
      {children}
    </IsQuizOverContext.Provider>
  );
};
