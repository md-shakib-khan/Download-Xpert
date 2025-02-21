const express = require("express");
const serverRoutes = require("./serverRoute");
const userRoutes = require("./userRoute");

const route = express.Router();

route.use("/server", serverRoutes);
route.use("/user", userRoutes);

module.exports = route;
