import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Learners = () => {
  const { user } = useAuth();
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/learners", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setLearners(data))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <p>Loading learners...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>All Learners</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Learner Name</th>
            <th>Class</th>
            <th>Term</th>
            <th>Year</th>
            <th>Average</th>
            <th>Performance</th>
            <th>Teacher</th>
          </tr>
        </thead>

        <tbody>
          {learners.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No learners found
              </td>
            </tr>
          ) : (
            learners.map((l, i) => (
              <tr key={i}>
                <td>{l.name}</td>
                <td>{l.classLevel}</td>
                <td>{l.term}</td>
                <td>{l.academicYear}</td>
                <td>{l.average}%</td>
                <td>{l.performance}</td>
                <td>{l.teacher}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Learners;
