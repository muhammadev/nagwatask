const express = require("express");
const app = express();
const port = 3001;

const bodyParser = require("body-parser");

// parse JSON bodies
app.use(bodyParser.json());
// parse url-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, Express.js!");
});

// words GET endpoint
const wordsRouter = require("./routes/words");
app.use("/words", wordsRouter);

// rank POST endpoint
const rankRouter = require("./routes/rank");
app.use("/rank", rankRouter);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app, server };
