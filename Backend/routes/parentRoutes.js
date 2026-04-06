const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const { getChildResults } = require("../controllers/parentController");

const router = express.Router();

// Only parents can access this
router.get("/results", protect, authorize("parent"), getChildResults);

module.exports = router;
