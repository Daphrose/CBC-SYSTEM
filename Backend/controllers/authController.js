
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// // Generate JWT
// const generateToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

// // @route   POST /api/auth/register
// // Teachers register but remain UNVERIFIED
// exports.registerUser = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       role: role || "teacher",
//       verified: role === "admin" ? true : false,
//     });

//     res.status(201).json({
//       message:
//         user.role === "teacher"
//           ? "Registration successful. Await admin approval."
//           : "Admin created successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @route   POST /api/auth/login
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // 🚫 BLOCK unverified teachers
//     if (user.role === "teacher" && !user.verified) {
//       return res
//         .status(403)
//         .json({ message: "Await admin approval before first login" });
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id, user.role),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/**
 * @route   POST /api/auth/register-teacher
 * @desc    Public teacher registration (UNVERIFIED)
 * @access  Public
 */
exports.registerTeacher = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    await User.create({
      name,
      email,
      password,
      role: "teacher",
      verified: false,
    });

    res.status(201).json({
      message: "Registration successful. Await admin approval.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🚫 Block unverified teachers
    if (user.role === "teacher" && !user.verified) {
      return res
        .status(403)
        .json({ message: "Await admin approval before first login" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

