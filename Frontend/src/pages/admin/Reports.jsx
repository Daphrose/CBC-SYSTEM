
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./report.css";

const Reports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch("http://localhost:5000/api/admin/reports", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      setReports(data);
      setLoading(false);
    };

    fetchReports();
  }, [user]);

  if (loading) return <p className="loading">Loading reports...</p>;

  return (
    <div className="reports-container">
      <h2 className="reports-title">Admin Reports & Analytics</h2>

      {reports.map((report) => (
        <div key={report._id} className="report-card">
          <p>
            <strong>Class:</strong> {report.classLevel}
          </p>
          <p>
            <strong>Term:</strong> {report.term}
          </p>
          <p>
            <strong>Year:</strong> {report.academicYear}
          </p>
          <p>
            <strong>Teacher:</strong> {report.teacher?.name}
          </p>

          <table className="report-table">
            <thead>
              <tr>
                <th>Learner</th>
                <th>Average</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {report.learners.map((l) => (
                <tr key={l._id}>
                  <td>{l.name}</td>
                  <td>{l.average}%</td>
                  <td>{l.performance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Reports;
