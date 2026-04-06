

// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";


// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("admin");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // Role mismatch protection
//       if (data.role !== role) {
//         setError(`This user is not a ${role}`);
//         return;
//       }

//       login(data, navigate);
//     } catch (err) {
//       if (err.message.toLowerCase().includes("verify")) {
//         setError("⏳ Await admin approval before first login");
//       } else {
//         setError(err.message);
//       }
//     }
//   };

//   return (
//     <div style={{ padding: 40, maxWidth: 420, margin: "auto" }}>
//       <h2 style={{ textAlign: "center" }}>System Login</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{ width: "100%", padding: 8, marginBottom: 10 }}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ width: "100%", padding: 8, marginBottom: 10 }}
//         />

//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           style={{ width: "100%", padding: 8, marginBottom: 10 }}
//         >
//           <option value="admin">Admin</option>
//           <option value="teacher">Teacher</option>
//         </select>

//         <button type="submit" style={{ width: "100%", padding: 10 }}>
//           Login
//         </button>
//       </form>

//       {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

//       {/* 🔗 REGISTER AS TEACHER */}
//       <p style={{ marginTop: 15, fontSize: 14, textAlign: "center" }}>
//         New teacher?{" "}
//      <Link to="/teacher/register" style={{ color: "#007bff" }}>
//   Register as Teacher
//       </Link>

//       </p>

//       <p style={{ marginTop: 8, fontSize: 12, textAlign: "center" }}>
//         Teachers must await admin approval before first login
//       </p>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.role !== role) {
        setError(`This user is not a ${role}`);
        return;
      }

      login(data, navigate);
    } catch (err) {
      if (err.message.toLowerCase().includes("verify")) {
        setError("⏳ Await admin approval before first login");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">System Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            className="login-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
          </select>

          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        {error && <p className="login-error">{error}</p>}

        <p className="login-register">
          New teacher?{" "}
          <Link to="/teacher/register" className="login-link">
            Register as Teacher
          </Link>
        </p>

        <p className="login-note">
          Teachers must await admin approval before first login
        </p>
      </div>
    </div>
  );
};

export default Login;
