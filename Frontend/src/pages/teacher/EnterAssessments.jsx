
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AssessmentTable from "../../components/teacher/AssessmentTable";

const EnterAssessments = () => {
  const { user } = useAuth();

  const [learners, setLearners] = useState([{ name: "", marks: {} }]);

  const saveAssessments = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/teacher/assessments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            term: "Term 1",
            academicYear: "2025",
            learners,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save");
        return;
      }

      alert("✅ Assessments saved successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }
  };

  return (
    <div
      style={{
        padding: 25,
        maxWidth: 900,
        margin: "0 auto",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f9fafb",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2
        style={{
          fontSize: 26,
          marginBottom: 10,
          color: "#1f2937",
          textAlign: "center",
        }}
      >
        Enter Assessments
      </h2>
      <p
        style={{
          fontSize: 16,
          color: "#4b5563",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Add learners and enter marks. Click save when done.
      </p>

      <div
        style={{
          overflowX: "auto",
          marginBottom: 20,
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: 10,
          backgroundColor: "#fff",
        }}
      >
        <AssessmentTable learners={learners} setLearners={setLearners} />
      </div>

      <button
        onClick={saveAssessments}
        style={{
          display: "block",
          width: "100%",
          padding: "12px 0",
          backgroundColor: "#2563eb",
          color: "#fff",
          fontSize: 16,
          fontWeight: 500,
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#607dcfff")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3c5790ff")}
      >
        Save Assessments
      </button>
    </div>
  );
};

export default EnterAssessments;
