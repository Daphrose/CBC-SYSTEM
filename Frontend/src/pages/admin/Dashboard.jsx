
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalTeachers: 0,
    pendingTeachers: 0,
    totalStudents: 0,
    reportsGenerated: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/dashboard-stats",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to fetch stats");
      }

      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) fetchStats();
  }, [user]);

  if (loading) return <p>Loading dashboard stats...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>{stats.totalTeachers}</h3>
          <p>Total Teachers</p>
        </div>

        <div className="dashboard-card">
          <h3>{stats.totalTeachers - stats.pendingTeachers}</h3>
          <p>Verified Teachers</p>
        </div>

        <div className="dashboard-card">
          <h3>{stats.pendingTeachers}</h3>
          <p>Pending Verifications</p>
        </div>

        <div className="dashboard-card">
          <h3>{stats.totalStudents}</h3>
          <p>Total Learners</p>
        </div>

        <div className="dashboard-card">
          <h3>{stats.reportsGenerated}</h3>
          <p>Reports Generated</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
