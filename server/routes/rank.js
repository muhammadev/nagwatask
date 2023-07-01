const express = require("express");
const router = express.Router();
const testData = require("../TestData.json");

router.post("/", (req, res) => {
  // extract the score
  const { score: userScore } = req.body;

  // get all scores below the user's score
  const belowThresholdScores = testData.scoresList.filter(
    (score) => score < userScore
  );

  // calculate the rank
  let rank = (
    (belowThresholdScores.length / testData.scoresList.length) *
    100
  ).toFixed(2);

  res.status(200).send(JSON.stringify({ rank }));
});

module.exports = router;
