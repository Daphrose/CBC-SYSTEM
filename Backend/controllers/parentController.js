const Result = require("../models/Result");
const Student = require("../models/Student");

// Get all results for parent's children
exports.getChildResults = async (req, res) => {
  try {
    // Find children of this parent
    const children = await Student.find({ parent: req.user._id });
    if (!children || children.length === 0) {
      return res.status(404).json({ message: "No children found for this parent" });
    }

    // Collect results for all children
    const results = await Result.find({
      studentAdmissionNumber: { $in: children.map(c => c.admissionNumber) },
    }).sort({ createdAt: -1 });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
