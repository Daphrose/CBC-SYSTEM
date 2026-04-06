const Student = require("../models/Student");

// @desc    Create a student
// @route   POST /api/students
// @access  Admin
exports.createStudent = async (req, res) => {
  try {
    const { name, admissionNumber, grade, parent, teacher } = req.body;

    if (!name || !admissionNumber || !grade || !parent || !teacher) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // const studentExists = await Student.findOne({ admissionNumber });
    // if (studentExists) {
    //   return res.status(400).json({ message: "Student already exists" });
    const studentExists = await Student.findOne({ admissionNumber: req.body.studentAdmissionNumber });
      if (!studentExists) {
      return res.status(404).json({ message: "Student not found" });
}


    const student = await Student.create({
      name,
      admissionNumber,
      grade,
      parent,
      teacher,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all students
// @route   GET /api/students
// @access  Admin
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("parent", "name email")
      .populate("teacher", "name email");

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
