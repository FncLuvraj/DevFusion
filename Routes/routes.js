const express = require("express");
const router = express.Router();

const signup = require("../Controllers/signup");
const login = require("../Controllers/login");
const logout = require("../Controllers/logout");
const AuthMiddlewear = require("../middlewear/Auth");
const { sendingRequest } = require("../Controllers/sendingRequest");
const {
  updateUserInfo,
  updateUserValidationRules,
} = require("../Controllers/updateUserInfo");

const recievingRequest = require("../Controllers/recievingRequest");

router.post("/signup", signup);
router.post("/login", login);
router.patch(
  "/update",
  updateUserValidationRules,
  AuthMiddlewear,
  updateUserInfo
);
router.post("/logout", logout);
router.post(
  "/sendConnectionRequest/:status/:receiverUserId",
  AuthMiddlewear,
  sendingRequest
);

router.post(
  "/RecievingConnectionRequest/:status/:requestId",
  AuthMiddlewear,
  recievingRequest
);

module.exports = router;
