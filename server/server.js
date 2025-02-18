const express = require("express");
const cors = require("cors");
require("dotenv/config");

const app = express();
const port = process.env.PORT || 8000;

const middleware = [
  express.json(),
  express.urlencoded({ extended: true }),
  cors(),
];
app.use(middleware);

app.get("/", (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "Server is running" });
  } catch (err) {
    next(err);
  }
});

app.get("/health", (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "Server is healthy" });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:` + port);
});
