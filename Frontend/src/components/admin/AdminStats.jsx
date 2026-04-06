// // src/components/admin/AdminStats.jsx
// const AdminStats = () => {
//   return (
//     <div style={{ display: "flex", gap: 20, margin: "20px 0" }}>
//       <div style={{ padding: 20, background: "#E2E8F0", flex: 1 }}>Total Teachers: 12</div>
//       <div style={{ padding: 20, background: "#E2E8F0", flex: 1 }}>Verified Teachers: 8</div>
//       <div style={{ padding: 20, background: "#E2E8F0", flex: 1 }}>Pending Verifications: 4</div>
//       <div style={{ padding: 20, background: "#E2E8F0", flex: 1 }}>Total Classes: 6</div>
//     </div>
//   );
// };

// export default AdminStats;

// src/components/admin/AdminStats.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminStats = () => {
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
      const res = await fetch("http://localhost:5000/api/admin/dashboard-stats", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

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
    if (user) fetchStats();
  }, [user]);

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ display: "flex", gap: 20, margin: "20px 0" }}>
      <div style={{ padding: 20, background: "#E2E8F0", flex: 1 }}>
        Total Teachers: {stats.totalTeachers}
      </div>
      <div style={{ padding: 20, background: "#E2E8F0", flex: 1 }}>
        Verified Teachers: {stats.totalTeachers - stats.pendingTeachers}
      </div>
      <div style={{ padding: 20, background: "#E2E8F0", flex: 1 }}>
        Pending Verifications: {stats.pendingTeachers}
      </div>
      <div style={{ padding: 20, background: "#E2E8F0", flex: 1 }}>
        Total Learners: {stats.totalStudents}
      </div>
      <div style={{ padding: 20, background: "#E2E8F0", flex: 1 }}>
        Reports Generated: {stats.reportsGenerated}
      </div>
    </div>
  );
};

export default AdminStats;

