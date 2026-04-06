const User = require("../models/User");
const Assessment = require("../models/Assessment");

// Create teacher
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const teacher = await User.create({
      name,
      email,
      password,
      role: "teacher",
      verified: false,
    });

    res.status(201).json({
      message: "Teacher created. Awaiting verification.",
      teacher,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Update user
exports.updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) user.password = req.body.password;

  await user.save();
  res.json(user);
};

// Delete user
exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.role === "admin")
    return res.status(400).json({ message: "Cannot delete admin" });

  await user.deleteOne();
  res.json({ message: "User deleted" });
};

// Verify teacher
exports.verifyTeacher = async (req, res) => {
  const teacher = await User.findById(req.params.id);
  if (!teacher || teacher.role !== "teacher") {
    return res.status(404).json({ message: "Teacher not found" });
  }

  teacher.verified = true;
  teacher.verifiedAt = new Date();
  teacher.verifiedBy = req.user._id;

  await teacher.save();
  res.json({ message: "Teacher verified" });
};

// ✅ FIXED DASHBOARD STATS
exports.getDashboardStats = async (req, res) => {
  const totalTeachers = await User.countDocuments({ role: "teacher" });
  const pendingTeachers = await User.countDocuments({
    role: "teacher",
    verified: false,
  });

  const assessments = await Assessment.find();

  const reportsGenerated = assessments.length;
  const totalStudents = assessments.reduce(
    (sum, a) => sum + a.learners.length,
    0
  );

  res.json({
    totalTeachers,
    pendingTeachers,
    totalStudents,
    reportsGenerated,
  });
};
