// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // 🔒 Protect routes — only logged-in users
// const protect = async (req, res, next) => {
//   let token;

//   // Check if authorization header exists and starts with "Bearer"
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(" ")[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Attach user to request, exclude password
//       req.user = await User.findById(decoded.id).select("-password");

//       next(); // user authenticated, continue
//     } catch (error) {
//       console.error(error);
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

// // 🛡️ Restrict routes to specific roles
// const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res
//         .status(403)
//         .json({ message: `Role '${req.user.role}' not allowed` });
//     }
//     next();
//   };
// };

// module.exports = { protect, authorize };
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔒 Protect routes — only logged-in users
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next(); // ✅ STOP HERE
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  return res.status(401).json({
    message: "Not authorized, no token",
  });
};

// 🛡️ Restrict routes to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    return next(); // ✅ STOP HERE
  };
};

module.exports = { protect, authorize };
