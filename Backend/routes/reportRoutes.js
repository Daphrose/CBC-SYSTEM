const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const { generateReport } = require("../controllers/reportController");

const router = express.Router();

// Any logged-in parent can download their child's report
router.get("/:admissionNumber", protect, authorize("parent"), generateReport);

module.exports = router;
