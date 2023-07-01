import { useContext, useEffect, useState } from "react";
import { AnsweredQuestionsLengthContext } from "../../contexts/AnsweredQuestionsLengthContext";
import "./progress-bar.scss";

export default function Progress({ totalQuestionsLength }) {
  const { answeredQuestionsLength } = useContext(AnsweredQuestionsLengthContext);

  const [currentProgress, setCurrentProgress] = useState(
    (answeredQuestionsLength / totalQuestionsLength) * 100
  );

  useEffect(() => {
    setCurrentProgress((answeredQuestionsLength / totalQuestionsLength) * 100);
  }, [answeredQuestionsLength]);

  return (
    <div className="container">
      {/* <span>Progress Bar</span> */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: currentProgress + '%' }}></div>
      </div>
    </div>
  );
}
