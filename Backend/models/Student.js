const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    admissionNumber: {
      type: String,
      required: true,
      unique: true,
    },

    grade: {
      type: String, // e.g Grade 1, Grade 2
      required: true,
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
