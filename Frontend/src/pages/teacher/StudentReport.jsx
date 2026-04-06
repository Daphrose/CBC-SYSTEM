// src/pages/teacher/StudentReport.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const StudentReport = () => {
  const { assessmentId, learnerId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    fetchAssessment();
    // eslint-disable-next-line
  }, [assessmentId]);

  useEffect(() => {
    if (assessment && learnerId) {
      const found = assessment.learners.find((l) => l._id === learnerId);
      setSelectedLearner(found || null);
    }
    if (assessment && !learnerId) setSelectedLearner(null);
    // eslint-disable-next-line
  }, [assessment, learnerId]);

  const fetchAssessment = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/teacher/reports/${assessmentId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) throw new Error("Failed to load assessment");
      const data = await res.json();
      setAssessment(data);
    } catch (err) {
      console.error(err);
      setAssessment(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLock = async () => {
    if (!window.confirm("Lock this assessment (finalize) ? This cannot be undone.") ) return;
    try {
      setActionMessage("Locking...");
      const res = await fetch(`http://localhost:5000/api/teacher/reports/${assessmentId}/lock`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to lock");
      setAssessment(data.assessment || data); // updated doc returned
      setActionMessage("Locked ✅");
    } catch (err) {
      console.error(err);
      setActionMessage(err.message || "Error");
    } finally {
      setTimeout(() => setActionMessage(""), 2000);
    }
  };

  if (loading) return <p>Loading report...</p>;
  if (!assessment) return <p>Assessment not found.</p>;

  // If no learner selected, show list
  if (!selectedLearner) {
    return (
      <div style={{ padding: 20 }}>
        <h2>
          {assessment.classLevel} — {assessment.term} ({assessment.academicYear})
        </h2>
        <p>
          {assessment.locked ? <strong>Finalized (Locked)</strong> : <strong>Editable (Unlocked)</strong>}
        </p>

        <button onClick={() => navigate(-1)} style={{ marginRight: 8 }}>Back</button>
        {!assessment.locked && <button onClick={handleLock} style={{ marginRight: 8 }}>{actionMessage || "Lock Assessment"}</button>}
        <button onClick={handlePrint}>Print</button>

        <h3 style={{ marginTop: 12 }}>Learners</h3>
        <ul>
          {assessment.learners.map((l) => (
            <li key={l._id}>
              <Link to={`/teacher/report/${assessment._id}/${l._id}`}>{l.name}</Link> — {l.average}% — {l.performance}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Render single learner printable report
  const learner = selectedLearner;

  // Create subjects rows based on marks object
  const subjectRows = Object.entries(learner.marks || {});

  return (
    <div style={{ padding: 20 }}>
      <div id="report-area" style={{ maxWidth: 800, margin: "auto", background: "#fff", padding: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <h3 style={{ margin: 0 }}>SCHOOL NAME</h3>
          <div style={{ fontSize: 14, marginTop: 4 }}>COMPETENCY-BASED CURRICULUM (CBC)</div>
          <h2 style={{ marginTop: 6 }}>LEARNER PROGRESS REPORT</h2>
          <hr />
        </div>

        <div style={{ marginBottom: 8 }}>
          <div><strong>Learner Name:</strong> {learner.name}</div>
          <div><strong>Grade/Class:</strong> {assessment.classLevel}</div>
          <div><strong>Term:</strong> {assessment.term} &nbsp; <strong>Year:</strong> {assessment.academicYear}</div>
        </div>

        <hr />

        <h4>SUBJECTS / LEARNING AREAS</h4>

        <table border="1" cellPadding="6" width="100%">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Score (%)</th>
            </tr>
          </thead>
          <tbody>
            {subjectRows.map(([subj, score]) => (
              <tr key={subj}>
                <td>{subj}</td>
                <td style={{ textAlign: "center" }}>{score ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        <div style={{ marginTop: 12 }}>
          <h4>OVERALL PERFORMANCE</h4>
          <p><strong>Total Score:</strong> {learner.average}%</p>
          <p><strong>Final Performance Level:</strong> {learner.performance}</p>
        </div>

        <hr />

        <div>
          <h4>TEACHER'S REMARKS</h4>
          <p>{learner.teacherRemarks || "No remarks provided."}</p>
        </div>

        <hr />

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
          <div>
            <div>Class Teacher: __________________</div>
            <div>Date: _________________________</div>
          </div>

          <div>
            <div>Administrator: __________________</div>
            <div>Date: _________________________</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14 }}>

        {/* <button onClick={() => navigate(-1)} style={{ marginRight: 8 }}>Back</button>
        {!assessment.locked && (
          <button onClick={handleLock} style={{ marginRight: 8 }}>{actionMessage || "Lock Assessment"}</button>
        )}
        <button onClick={handlePrint}>Print Report</button> */}
                  <div className="report-actions no-print">
            <button onClick={() => navigate(-1)}>Back</button>

            {!assessment.locked && (
              <button onClick={handleLock}>
                {actionMessage || "Lock Assessment"}
              </button>
            )}

            <button onClick={handlePrint}>Print Report</button>
          </div>

      </div>
    </div>
  );
};

export default StudentReport;
