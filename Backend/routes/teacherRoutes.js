const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const ClassAllocation = require("../models/ClassAllocation");
const Assessment = require("../models/Assessment");

const router = express.Router();

/* =====================================================
   GET: Teacher class allocation
===================================================== */
router.get("/my-allocation", protect, authorize("teacher"), async (req, res) => {
  try {
    const allocation = await ClassAllocation.findOne({
      teacher: req.user._id,
    });
    res.json(allocation || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   GET: All generated reports for teacher
===================================================== */
router.get("/reports", protect, authorize("teacher"), async (req, res) => {
  try {
    const reports = await Assessment.find({
      teacher: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   GET: Single assessment (for viewing reports)
===================================================== */
router.get(
  "/reports/:id",
  protect,
  authorize("teacher"),
  async (req, res) => {
    try {
      const assessment = await Assessment.findById(req.params.id);

      if (!assessment)
        return res.status(404).json({ message: "Assessment not found" });

      if (assessment.teacher.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }

      res.json(assessment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* =====================================================
   PUT: Lock assessment (finalize reports)
===================================================== */
router.put(
  "/reports/:id/lock",
  protect,
  authorize("teacher"),
  async (req, res) => {
    try {
      const assessment = await Assessment.findById(req.params.id);

      if (!assessment)
        return res.status(404).json({ message: "Assessment not found" });

      if (assessment.teacher.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }

      assessment.locked = true;
      await assessment.save();

      res.json({ message: "Assessment locked", assessment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* =====================================================
   POST: Save assessments
===================================================== */
router.post("/assessments", protect, authorize("teacher"), async (req, res) => {
  try {
    const { term, academicYear, learners } = req.body;

    const allocation = await ClassAllocation.findOne({
      teacher: req.user._id,
    });

    if (!allocation)
      return res.status(400).json({ message: "No class allocated" });

    const processedLearners = learners.map((l) => {
      const scores = Object.values(l.marks);
      const avg =
        scores.length === 0
          ? 0
          : Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

      const performance =
        avg >= 70
          ? "Exceeding Expectation"
          : avg >= 60
          ? "Meeting Expectation"
          : avg >= 40
          ? "Pass"
          : "Fail";

      return {
        name: l.name,
        marks: l.marks,
        average: avg,
        performance,
      };
    });

    const assessment = await Assessment.create({
      teacher: req.user._id,
      classLevel: allocation.classLevel,
      term,
      academicYear,
      learners: processedLearners,
      locked: false,
    });

    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
