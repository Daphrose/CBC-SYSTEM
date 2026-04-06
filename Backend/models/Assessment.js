// src/models/Assessment.js
const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    classLevel: { type: String, required: true },
    term: { type: String, required: true },
    academicYear: { type: String, required: true },
    learners: [
      {
        name: { type: String, required: true },
        marks: { type: Map, of: Number }, // e.g. { Maths: 80, English: 75, ... }
        average: Number,
        performance: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
