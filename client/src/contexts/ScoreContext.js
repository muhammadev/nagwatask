import React, { useState } from "react";

export const ScoreContext = React.createContext();

export function ScoreContextProvider({ children }) {
  const [score, setScore] = useState(0);

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  return (
    <ScoreContext.Provider value={{ score, updateScore }}>
      {children}
    </ScoreContext.Provider>
  );
}
