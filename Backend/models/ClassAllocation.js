const mongoose = require("mongoose");

const classAllocationSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    classLevel: {
      type: String, // e.g. Grade 1
      required: true,
    },
    academicYear: {
      type: String, // e.g. 2025
      required: true,
    },
    term: {
      type: String, // Term 1
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClassAllocation", classAllocationSchema);
