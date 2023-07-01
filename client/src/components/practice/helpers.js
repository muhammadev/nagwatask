import static_data from "./static_data.json";
const successMessages = static_data.feedback.success;
const failureMessages = static_data.feedback.failure;

export const generateFeedback = (isCorrect, answerEl) => {
  let msg;

  // picking a random feedback
  if (isCorrect) {
    answerEl.classList.add("success");
    msg = successMessages[Math.floor(Math.random() * successMessages.length)];
  } else {
    answerEl.classList.add("failure");
    msg = failureMessages[Math.floor(Math.random() * failureMessages.length)];
  }

  let notifyElem = document.createElement("div"),
    homeEl = document.querySelector(".home");

  notifyElem.classList.add("notify");
  notifyElem.classList.add(isCorrect ? "success" : "failure");
  notifyElem.innerHTML = msg;
  homeEl.append(notifyElem);
  // console.log("got here", notifyElem)

  notifyElem.addEventListener("webkitAnimationEnd", function (e) {
    if (e.animationName === "get-out") {
      homeEl.removeChild(notifyElem);
    }
  });
};
