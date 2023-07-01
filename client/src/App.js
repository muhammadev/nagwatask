import "./App.css";
import React, { useContext, useEffect, useState } from "react";

// component imports
import Practice from "./components/practice/Practice";
import ProgressBar from "./components/progress-bar/ProgressBar";
import FinalResult from "./components/final-result/FinalResult";

// context imports
import { IsQuizOverContext } from "./contexts/IsQuizOverContext";

function App() {
  const [words, setWords] = useState([]);
  const { isQuizOver } = useContext(IsQuizOverContext);

  const fetchWordsApi = () => {
    fetch("/words")
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        setWords(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchWordsApi();
    
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const handleTryAgain = () => {
    fetchWordsApi();
  };

  return (
    <div className="home">
      {!isQuizOver ? (
        <>
          <ProgressBar totalQuestionsLength={words.length} />
          <Practice words={words} totalQuestionsLength={words.length} />
        </>
      ) : (
        <FinalResult onTryAgain={handleTryAgain} />
      )}
    </div>
  );
}

export default App;
