const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  performanceLevel: {
    type: String,
    enum: [
      "Exceeding Expectations",
      "Meeting Expectations",
      "Approaching Expectations",
      "Below Expectations",
    ],
    required: true,
  },
});

const resultSchema = new mongoose.Schema(
  {
    studentAdmissionNumber: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    term: { type: String, required: true },
    year: { type: Number, required: true },
    subjects: { type: [subjectSchema], required: true }, // <-- array of subjects
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
