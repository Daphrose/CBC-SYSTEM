
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const TeacherVerification = () => {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingIds, setLoadingIds] = useState([]); // Track which teachers are being verified

  // Fetch all teachers
  const fetchTeachers = async () => {
    if (!user?.token) return; // ensure token exists

    try {
      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to fetch teachers");
      }

      const data = await res.json();
      setTeachers(data.filter((u) => u.role === "teacher"));
    } catch (err) {
      console.error("Error fetching teachers:", err);
      setMessage(err.message);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [user]); // re-fetch when user changes

  // Verify teacher
  const verifyTeacher = async (id) => {
    if (!user?.token) return;

    try {
      setLoadingIds((prev) => [...prev, id]);
      const res = await fetch(
        `http://localhost:5000/api/admin/verify-teacher/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Verification failed");
      }

      await res.json();
      setMessage("Teacher verified successfully ✅");
      fetchTeachers();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoadingIds((prev) => prev.filter((tid) => tid !== id));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Teacher Verification</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((teacher) => {
            const isVerifying = loadingIds.includes(teacher._id);
            return (
              <tr key={teacher._id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>
                  {teacher.verified ? (
                    <span style={{ color: "green" }}>Verified</span>
                  ) : (
                    <span style={{ color: "orange" }}>Pending</span>
                  )}
                </td>
                <td>
                  {!teacher.verified && (
                    <button
                      onClick={() => verifyTeacher(teacher._id)}
                      disabled={isVerifying}
                    >
                      {isVerifying ? "Verifying..." : "Verify"}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherVerification;
