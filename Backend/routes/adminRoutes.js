// const express = require("express");
// const { protect, authorize } = require("../middleware/authMiddleware");

// const User = require("../models/User");
// const ClassAllocation = require("../models/ClassAllocation");
// const Assessment = require("../models/Assessment");

// const {
//   createUser,
//   getAllUsers,
//   updateUser,
//   deleteUser,
//   verifyTeacher,
//   getDashboardStats,
// } = require("../controllers/adminController");

// const router = express.Router();

// /* =========================
//    USER MANAGEMENT
// ========================= */

// router.post("/users", protect, authorize("admin"), createUser);
// router.get("/users", protect, authorize("admin"), getAllUsers);
// router.put("/users/:id", protect, authorize("admin"), updateUser);
// router.delete("/users/:id", protect, authorize("admin"), deleteUser);
// router.put("/verify-teacher/:id", protect, authorize("admin"), verifyTeacher);

// /* =========================
//    DASHBOARD STATS
// ========================= */

// router.get(
//   "/dashboard-stats",
//   protect,
//   authorize("admin"),
//   getDashboardStats
// );

// /* =========================
//    VERIFIED TEACHERS
// ========================= */

// router.get("/teachers", protect, authorize("admin"), async (req, res) => {
//   try {
//     const teachers = await User.find({
//       role: "teacher",
//       verified: true,
//     }).select("name email");

//     res.json(teachers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// /* =========================
//    CLASS ALLOCATION
// ========================= */

// router.post("/allocate-class", protect, authorize("admin"), async (req, res) => {
//   try {
//     const { teacherId, classLevel, academicYear, term } = req.body;

//     const teacher = await User.findById(teacherId);
//     if (!teacher || teacher.role !== "teacher") {
//       return res.status(404).json({ message: "Teacher not found" });
//     }

//     const alreadyAllocated = await ClassAllocation.findOne({
//       teacher: teacherId,
//       academicYear,
//       term,
//     });

//     if (alreadyAllocated) {
//       return res.status(400).json({
//         message: "Teacher already allocated for this term/year",
//       });
//     }

//     const allocation = await ClassAllocation.create({
//       teacher: teacherId,
//       classLevel,
//       academicYear,
//       term,
//     });

//     res.status(201).json(allocation);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// /* =========================
//    ADMIN REPORTS (READ ONLY)
// ========================= */

// router.get("/reports", protect, authorize("admin"), async (req, res) => {
//   try {
//     const reports = await Assessment.find()
//       .populate("teacher", "name email")
//       .sort({ createdAt: -1 });

//     res.json(reports);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// /* =========================
//    LEARNERS (FROM ASSESSMENTS)
// ========================= */

// router.get("/learners", protect, authorize("admin"), async (req, res) => {
//   try {
//     const assessments = await Assessment.find().populate(
//       "teacher",
//       "name email"
//     );

//     const learners = assessments.flatMap((a) =>
//       a.learners.map((l) => ({
//         name: l.name,
//         average: l.average,
//         performance: l.performance,
//         classLevel: a.classLevel,
//         term: a.term,
//         academicYear: a.academicYear,
//         teacher: a.teacher?.name || "Unknown",
//       }))
//     );

//     res.json(learners);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");

const User = require("../models/User");
const ClassAllocation = require("../models/ClassAllocation");
const Assessment = require("../models/Assessment");

const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  verifyTeacher,
  getDashboardStats,
} = require("../controllers/adminController");

const router = express.Router();

/* =========================
   USER MANAGEMENT
========================= */

router.post("/users", protect, authorize("admin"), createUser);
router.get("/users", protect, authorize("admin"), getAllUsers);
router.put("/users/:id", protect, authorize("admin"), updateUser);
router.delete("/users/:id", protect, authorize("admin"), deleteUser);
router.put("/verify-teacher/:id", protect, authorize("admin"), verifyTeacher);

/* =========================
   DASHBOARD STATS
========================= */
router.get("/dashboard-stats", protect, authorize("admin"), getDashboardStats);

/* =========================
   VERIFIED TEACHERS
========================= */
router.get("/teachers", protect, authorize("admin"), async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher", verified: true }).select(
      "name email"
    );
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   CLASS ALLOCATION
========================= */
// POST allocate class
router.post("/allocate-class", protect, authorize("admin"), async (req, res) => {
  try {
    const { teacherId, classLevel, academicYear, term } = req.body;

    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "teacher") {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const alreadyAllocated = await ClassAllocation.findOne({
      teacher: teacherId,
      academicYear,
      term,
    });

    if (alreadyAllocated) {
      return res.status(400).json({
        message: "Teacher already allocated for this term/year",
      });
    }

    const allocation = await ClassAllocation.create({
      teacher: teacherId,
      classLevel,
      academicYear,
      term,
    });

    res.status(201).json(allocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET all class allocations (this was missing!)
router.get("/class-allocations", protect, authorize("admin"), async (req, res) => {
  try {
    const allocations = await ClassAllocation.find()
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });
    res.json(allocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   ADMIN REPORTS (READ ONLY)
========================= */
router.get("/reports", protect, authorize("admin"), async (req, res) => {
  try {
    const reports = await Assessment.find()
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   LEARNERS (FROM ASSESSMENTS)
========================= */
router.get("/learners", protect, authorize("admin"), async (req, res) => {
  try {
    const assessments = await Assessment.find().populate("teacher", "name email");

    const learners = assessments.flatMap((a) =>
      a.learners.map((l) => ({
        name: l.name,
        average: l.average,
        performance: l.performance,
        classLevel: a.classLevel,
        term: a.term,
        academicYear: a.academicYear,
        teacher: a.teacher?.name || "Unknown",
      }))
    );

    res.json(learners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
