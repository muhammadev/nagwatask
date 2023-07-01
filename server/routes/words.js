const express = require("express");
const router = express.Router();
const testData = require("../TestData.json");

router.get("/", (req, res) => {
  // randomly selects 10 objects from the "wordsList"

  let uniqueWords = new Set();
  const requiredPartsOfSpeech = ["adjective", "adverb", "noun", "verb"];
  let isValidWordsScheme = false;

  while (uniqueWords.size < 10 || !isValidWordsScheme) {
    uniqueWords.add(
      testData.wordList[Math.floor(Math.random() * testData.wordList.length)]
    );

    // remove random extra words
    let uniqueWordsArray = Array.from(uniqueWords);

    if (uniqueWordsArray.length > 10) {
      uniqueWordsArray.splice(
        Math.floor(Math.random() * uniqueWordsArray.length),
        1
      );
    }

    // check if words array scheme is valid
    isValidWordsScheme = requiredPartsOfSpeech.every((pos) =>
      uniqueWordsArray.some((word) => word.pos === pos)
    );

    // reset uniqueWords
    uniqueWords = new Set(uniqueWordsArray);
  }

  // convert it into array before sending
  res.send(Array.from(uniqueWords));
});

module.exports = router;