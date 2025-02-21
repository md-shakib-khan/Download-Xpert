const express = require("express");
const {
  RegisterUser,
  LoginUser,
  AuthByProviders,
  TokenVerification,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

const userRoutes = express.Router();

userRoutes.get("");

userRoutes.post("/auth/manual/register", RegisterUser);
userRoutes.post("/auth/manual/login", LoginUser);
userRoutes.post("/auth/providers", AuthByProviders);
userRoutes.post("/auth/token-verify", verifyToken, TokenVerification);

userRoutes.put("");

userRoutes.delete("");

module.exports = userRoutes;
