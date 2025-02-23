const express = require("express");
const cors = require("cors");
const { connectMongoDB } = require("./database/connectMongoDB");
const route = require("./routes");
require("dotenv/config");

const app = express();
const port = process.env.PORT || 8000;

const middleware = [
  express.json(),
  express.urlencoded({ extended: true }),
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.WEB_CLIENT_URL_DEV
        : process.env.WEB_CLIENT_URL_PRO,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  }),
];
app.use(middleware);

app.use(route);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
  });
});

app.listen(port, async () => {
  await connectMongoDB();
  console.log(`Server is running on http://localhost:` + port);
});
