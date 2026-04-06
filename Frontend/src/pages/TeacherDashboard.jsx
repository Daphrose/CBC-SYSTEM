// src/pages/TeacherDashboard.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [allocation, setAllocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllocation();
  }, []);

  const fetchAllocation = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/teacher/my-allocation",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!res.ok) {
        console.error("Failed to fetch allocation:", res.status);
        setAllocation(null);
        return;
      }

      const data = await res.json();
      setAllocation(data);
    } catch (err) {
      console.error(err);
      setAllocation(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  if (!allocation)
    return (
      <div>
        <h2>Teacher Dashboard</h2>
        <p style={{ color: "orange" }}>
          ⚠️ No class allocated yet. Please wait for admin.
        </p>
      </div>
    );

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <div style={{ marginTop: 20 }}>
        <p>
          <strong>Class:</strong> {allocation.classLevel}
        </p>
        <p>
          <strong>Academic Year:</strong> {allocation.academicYear}
        </p>
        <p>
          <strong>Term:</strong> {allocation.term}
        </p>
      </div>

      <div style={{ marginTop: 20 }}>
        <button style={{ marginRight: 10 }}>Manage Students</button>
        <button>Enter Assessments</button>
      </div>
    </div>
  );
};

export default TeacherDashboard;
