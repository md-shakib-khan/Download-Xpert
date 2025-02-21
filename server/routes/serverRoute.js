const express = require("express");
const {
  serverRunning,
  healthCheck,
} = require("../controllers/serverController");

const serverRoutes = express.Router();

serverRoutes.get("/", serverRunning);
serverRoutes.get("/health-check", healthCheck);

module.exports = serverRoutes;
