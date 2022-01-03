const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connecting to database : OK");
  })
  .catch((error) => {
    console.error(`Connecting to database : KO. ${error.message}`);
  });

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.get("*", (req, res) => {
  res.send("Server hello world");
});
app.get("/test", (req, res) => {
  res.send("Server hello eewe");
});
app.all("/secret", function (req, res, next) {
  console.log("Accessing the secret section ...");
  next(); // pass control to the next handler
});
app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT} : OK`);
});
