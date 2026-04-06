const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createStudent,
  getStudents,
} = require("../controllers/studentController");

const router = express.Router();

// Admin only
router.post("/", protect, authorize("admin"), createStudent);
router.get("/", protect, authorize("admin"), getStudents);

module.exports = router;
