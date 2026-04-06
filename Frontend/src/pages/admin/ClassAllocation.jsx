
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./classAllocation.css";

const ClassAllocation = () => {
  const { user } = useAuth();

  const [teachers, setTeachers] = useState([]);
  const [allocations, setAllocations] = useState([]);

  const [teacherId, setTeacherId] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [academicYear, setAcademicYear] = useState("2025");
  const [term, setTerm] = useState("Term 1");

  useEffect(() => {
    fetchTeachers();
    fetchAllocations();
  }, []);

  const authHeader = {
    Authorization: `Bearer ${user.token}`,
    "Content-Type": "application/json",
  };

  const fetchTeachers = async () => {
    const res = await fetch("http://localhost:5000/api/admin/teachers", {
      headers: authHeader,
    });
    const data = await res.json();
    setTeachers(Array.isArray(data) ? data : []);
  };

  const fetchAllocations = async () => {
    const res = await fetch(
      "http://localhost:5000/api/admin/class-allocations",
      { headers: authHeader }
    );
    const data = await res.json();
    setAllocations(Array.isArray(data) ? data : []);
  };

  const handleAllocate = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/admin/allocate-class", {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({ teacherId, classLevel, academicYear, term }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }
    setTeacherId("");
    setClassLevel("");
    fetchAllocations();
  };

  return (
    <div className="class-allocation-container">
      <h2 className="page-title">Class Allocation</h2>

      <form onSubmit={handleAllocate} className="allocation-form">
        <label>
          Teacher:
          <select
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Class:
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            <option>PP1</option>
            <option>PP2</option>
            <option>PP3</option>
            <option>Grade 1</option>
            <option>Grade 2</option>
            <option>Grade 3</option>
            <option>Grade 4</option>
            <option>Grade 5</option>
            <option>Grade 6</option>
            <option>Grade 7</option>
            <option>Grade 8</option>
            <option>Grade 9</option>
          </select>
        </label>

        <label>
          Academic Year:
          <input
            type="text"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            required
          />
        </label>

        <label>
          Term:
          <select value={term} onChange={(e) => setTerm(e.target.value)}>
            <option>Term 1</option>
            <option>Term 2</option>
            <option>Term 3</option>
          </select>
        </label>

        <button type="submit" className="allocate-btn">
          Allocate
        </button>
      </form>

      <hr />

      <h3>Allocation History</h3>
      <table className="allocation-table">
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Class</th>
            <th>Year</th>
            <th>Term</th>
          </tr>
        </thead>
        <tbody>
          {allocations.map((a) => (
            <tr key={a._id}>
              <td>{a.teacher?.name}</td>
              <td>{a.classLevel}</td>
              <td>{a.academicYear}</td>
              <td>{a.term}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassAllocation;
