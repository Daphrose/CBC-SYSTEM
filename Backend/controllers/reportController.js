const Result = require("../models/Result");
const Student = require("../models/Student");
const { jsPDF } = require("jspdf");

// Helper to add table rows
const addTableRow = (doc, y, subject, score, performance) => {
  doc.text(subject, 20, y);
  doc.text(score, 140, y);
  doc.text(performance, 170, y);
};

exports.generateReport = async (req, res) => {
  const { admissionNumber } = req.params;

  try {
    const student = await Student.findOne({ admissionNumber });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const results = await Result.find({ studentAdmissionNumber: admissionNumber });
    if (!results || results.length === 0)
      return res.status(404).json({ message: "No results found for this student" });

    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("SCHOOL NAME", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("COMPETENCY-BASED CURRICULUM (CBC)", 105, 30, { align: "center" });
    doc.text("LEARNER PROGRESS REPORT", 105, 40, { align: "center" });

    // Learner Info
    doc.setFontSize(10);
    doc.text(`Learner Name: ${student.name}`, 20, 60);
    doc.text(`Admission No: ${student.admissionNumber}`, 20, 70);
    doc.text(`Grade/Class: ${student.grade}`, 20, 80);
    doc.text(`Term: ${results[0].term}`, 120, 70);
    doc.text(`Year: ${results[0].year}`, 120, 80);

    // Subjects Table
    let y = 100;
    doc.text("------------------------------------------------------", 20, y); y+=10;
    doc.text("SUBJECT / LEARNING AREA", 20, y); y+=10;
    doc.text("------------------------------------------------------", 20, y); y+=10;
    doc.text("Subject", 20, y); doc.text("Score (%)", 140, y); doc.text("Performance Level", 170, y); y+=10;

    let totalScore = 0;
    let count = 0;

    results.forEach(r => {
      r.subjects.forEach(sub => {
        const scoreText = sub.score !== undefined ? sub.score.toString() : "N/A";
        const performanceText = sub.performanceLevel || "N/A";
        addTableRow(doc, y, sub.name, scoreText, performanceText);
        y += 10;

        if (sub.score !== undefined) {
          totalScore += sub.score;
          count += 1;
        }
      });
    });

    const overallScore = count > 0 ? Math.round(totalScore / count) : 0;

    y += 10;
    doc.text("------------------------------------------------------", 20, y); y+=10;
    doc.text("OVERALL PERFORMANCE", 20, y); y+=10;
    doc.text("------------------------------------------------------", 20, y); y+=10;
    doc.text(`Total Score: ${overallScore}%`, 20, y); y+=10;
    doc.text("Final Performance Level: PASS", 20, y);

    y += 20;
    doc.text("------------------------------------------------------", 20, y); y+=10;
    doc.text("TEACHER’S REMARKS", 20, y); y+=10;
    doc.text("------------------------------------------------------", 20, y); y+=10;
    doc.text("The learner demonstrates good progress.", 20, y);

    y += 20;
    doc.text("------------------------------------------------------", 20, y); y+=10;
    doc.text("ATTENDANCE", 20, y); y+=10;
    doc.text("------------------------------------------------------", 20, y); y+=10;
    doc.text("Days Present: ____    Days Absent: ____", 20, y);

    y += 20;
    doc.text("------------------------------------------------------", 20, y); y+=10;
    doc.text("SIGNATURES", 20, y); y+=10;
    doc.text("------------------------------------------------------", 20, y); y+=10;
    doc.text("Class Teacher: __________________  Date: __________", 20, y); y+=10;
    doc.text("Administrator: _________________  Date: __________", 20, y);

    const pdfData = doc.output();
    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(pdfData, "binary"));

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
