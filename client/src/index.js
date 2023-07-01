import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AnsweredQuestionsLengthProvider } from "./contexts/AnsweredQuestionsLengthContext";
import { ScoreContextProvider } from "./contexts/ScoreContext";
import { IsQuizOverProvider } from "./contexts/IsQuizOverContext";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IsQuizOverProvider>
      <AnsweredQuestionsLengthProvider>
        <ScoreContextProvider>
          <App />
        </ScoreContextProvider>
      </AnsweredQuestionsLengthProvider>
    </IsQuizOverProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
