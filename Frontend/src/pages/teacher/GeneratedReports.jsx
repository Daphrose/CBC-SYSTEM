// src/pages/teacher/GeneratedReports.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const GeneratedReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/teacher/reports", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      setReports(data || []);
    } catch (err) {
      console.error("fetchReports error:", err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading reports...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Generated Reports</h2>
      <p>Reports are read-only after submission.</p>

      {reports.length === 0 ? (
        <p>No reports generated yet.</p>
      ) : (
        reports.map((report) => (
          <div
            key={report._id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              marginBottom: 14,
              borderRadius: 6,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>
                  {report.classLevel} — {report.term} ({report.academicYear})
                </strong>
                <div style={{ fontSize: 13, color: "#555" }}>
                  {report.locked ? "Finalized (Locked)" : "Editable (Unlocked)"}
                </div>
              </div>

              <div>
                <Link to={`/teacher/report/${report._id}/${report.learners[0]?._id || ""}`}>
                  <button style={{ marginRight: 8 }}>Open first report</button>
                </Link>
                <Link to={`/teacher/report/${report._id}`}>
                  <button>View all learners</button>
                </Link>
              </div>
            </div>

            <table border="1" cellPadding="6" width="100%" style={{ marginTop: 10 }}>
              <thead>
                <tr>
                  <th>Learner</th>
                  <th>Average</th>
                  <th>Performance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {report.learners.map((l) => (
                  <tr key={l._id}>
                    <td>{l.name}</td>
                    <td>{l.average ?? "—"}%</td>
                    <td>{l.performance}</td>
                    <td>
                      <Link to={`/teacher/report/${report._id}/${l._id}`}>
                        <button>View Report</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default GeneratedReports;
