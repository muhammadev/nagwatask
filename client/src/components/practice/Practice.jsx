import "./practice.scss";
import React, { useState, useContext, useEffect } from "react";
import { AnsweredQuestionsLengthContext } from "../../contexts/AnsweredQuestionsLengthContext";
import { IsQuizOverContext } from "../../contexts/IsQuizOverContext";
import static_data from "./static_data.json";
import { generateFeedback } from "./helpers";
import { ScoreContext } from "../../contexts/ScoreContext";
const choices = static_data.question_choices;

/**
 * User answers the first word question
 * Feedback appears to the user
 * Score is updated
 * Word is changed to the next index in the array
 */

export default function Practice(props) {
  const { words, totalQuestionsLength } = props;

  const [wordIndex, setWordIndex] = useState(0);
  const [isQuestionMode, setIsQuestionMode] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const { answeredQuestionsLength, updateAnsweredQuestionsLength } = useContext(
    AnsweredQuestionsLengthContext
  );
  const { updateIsQuizOver } = useContext(IsQuizOverContext);
  const { score, updateScore } = useContext(ScoreContext);

  // update the score on updating the correct answers
  useEffect(() => {
    if (totalQuestionsLength) {
      updateScore((correctAnswers / totalQuestionsLength) * 100);
    }

    // eslint-disable-line react-hooks/exhaustive-deps
  }, [correctAnswers, totalQuestionsLength]);

  const evaluateAnswer = (answer, e) => {
    if (isQuestionMode) {
      // disable question mode
      setIsQuestionMode(false);

      // check answer
      const isCorrect = words[wordIndex].pos === answer;

      // return feedback to the user
      generateFeedback(isCorrect, e.target);

      // calculate the score
      setCorrectAnswers((prevValue) => (isCorrect ? prevValue + 1 : prevValue));

      // to update the progress bar
      console.log(answeredQuestionsLength, "there");
      updateAnsweredQuestionsLength(answeredQuestionsLength + 1);

      // if it's the last word, go to final score page
      if (wordIndex === 9) {
        updateIsQuizOver(true);
      }
    }
  };

  const continueToNextQuestion = () => {
    setIsQuestionMode(true);
    setWordIndex((prevIndex) => prevIndex + 1);

    // reset the quiz UI
    let choiceElements = document.querySelectorAll(".choice");
    choiceElements.forEach((el) => {
      el.classList.remove("failure");
      el.classList.remove("success");
    });
  };

  return (
    <div className="quiz-pg">
      <h1>Define this word's part of speech</h1>
      <h3>{words[wordIndex]?.word}</h3>
      <div className="choices">
        {choices.map((option, i) => (
          <div
            key={i}
            className="choice"
            onClick={(e) => evaluateAnswer(option, e)}
          >
            {option}
          </div>
        ))}
      </div>
      <p className="score">
        Score: <span id="scoreSpan">{score}</span>
      </p>
      {isQuestionMode ? null : (
        <button
          id="continueBtn"
          className="btn"
          onClick={continueToNextQuestion}
        >
          Continue
        </button>
      )}
    </div>
  );
}
