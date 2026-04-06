// backend/models/Report.js
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    marks: { type: Number },
    grade: { type: String },
    comments: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
