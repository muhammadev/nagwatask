import "./final-score.scss";
import { useContext, useEffect, useState } from "react";
import { ScoreContext } from "../../contexts/ScoreContext";
import { IsQuizOverContext } from "../../contexts/IsQuizOverContext";
import { AnsweredQuestionsLengthContext } from "../../contexts/AnsweredQuestionsLengthContext";

export default function FinalResult({ onTryAgain }) {
  const { score, updateScore } = useContext(ScoreContext);
  const { updateIsQuizOver } = useContext(IsQuizOverContext);
  const { updateAnsweredQuestionsLength } = useContext(
    AnsweredQuestionsLengthContext
  );
  const [rank, setRank] = useState(0);

  useEffect(() => {
    fetch("/rank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score }),
    })
      .then((response) => response.json())
      .then((result) => {
        setRank(result.rank);
      })
      .catch((err) => {
        console.error(err);
      });

    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const tryAgain = () => {
    updateIsQuizOver(false);
    updateScore(0);
    setRank(0);
    updateAnsweredQuestionsLength(0);
    onTryAgain();
  };

  return (
    <div className="final-score-container">
      <h1>your final score is: {score}%</h1>
      <h3>you ranked at: {rank}%</h3>
      <button id="playAgainBtn" className="btn" onClick={tryAgain}>
        Try Again
      </button>
    </div>
  );
}
