import React, { useState } from "react";

export const AnsweredQuestionsLengthContext = React.createContext();

export const AnsweredQuestionsLengthProvider = ({ children }) => {
  const [answeredQuestionsLength, setAnsweredQuestionsLength] = useState(0);

  // update method
  const updateAnsweredQuestionsLength = (newValue) => {
    setAnsweredQuestionsLength(newValue);
  };

  return (
    <AnsweredQuestionsLengthContext.Provider
      value={{ answeredQuestionsLength, updateAnsweredQuestionsLength }}
    >
      {children}
    </AnsweredQuestionsLengthContext.Provider>
  );
};
