// 
const express = require("express");
const {
  registerTeacher,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

// ✅ Public teacher registration
router.post("/register-teacher", registerTeacher);

// ✅ Login
router.post("/login", loginUser);

module.exports = router;
