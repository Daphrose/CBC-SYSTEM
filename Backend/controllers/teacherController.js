const Result = require("../models/Result");
const Student = require("../models/Student");

// Teacher adds a result using student admission number (multiple subjects)
exports.addResult = async (req, res) => {
  const { studentAdmissionNumber, subjects, term, year } = req.body;

  try {
    const studentExists = await Student.findOne({ admissionNumber: studentAdmissionNumber });
    if (!studentExists) return res.status(404).json({ message: "Student not found" });

    if (!subjects || subjects.length === 0)
      return res.status(400).json({ message: "At least one subject is required" });

    for (const sub of subjects) {
      if (!sub.name || sub.score === undefined || !sub.performanceLevel) {
        return res.status(400).json({ message: "Each subject must have name, score, and performanceLevel" });
      }
    }

    const result = await Result.create({
      studentAdmissionNumber: studentExists.admissionNumber,
      teacher: req.user._id,
      subjects,
      term,
      year,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get teacher results
exports.getResults = async (req, res) => {
  try {
    const results = await Result.find({ teacher: req.user._id }).sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit result
exports.editResult = async (req, res) => {
  const { id } = req.params;
  const { subjects, term, year } = req.body;

  try {
    const result = await Result.findById(id);
    if (!result) return res.status(404).json({ message: "Result not found" });

    if (result.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (subjects && subjects.length > 0) result.subjects = subjects;
    if (term) result.term = term;
    if (year) result.year = year;

    await result.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete result
exports.deleteResult = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Result.findById(id);
    if (!result) return res.status(404).json({ message: "Result not found" });

    if (result.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await result.deleteOne();
    res.json({ message: "Result deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
