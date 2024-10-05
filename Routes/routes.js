const express = require("express");
const router = express.Router();

const signup = require("../Controllers/signup");
const login = require("../Controllers/login");
const logout = require("../Controllers/logout");
const {
  updateUserInfo,
  updateUserValidationRules,
} = require("../Controllers/updateUserInfo");

router.post("/signup", signup);
router.post("/login", login);
router.patch("/update", updateUserValidationRules, updateUserInfo);
router.post("/logout", logout);

module.exports = router;
