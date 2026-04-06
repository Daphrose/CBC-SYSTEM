import { useState } from "react";

const TeacherRegistration = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/register-teacher",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage("✅ Registration successful. Await admin approval.");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    marginBottom: 15,
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px 0",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.2s",
  };

  const containerStyle = {
    maxWidth: 400,
    margin: "50px auto",
    padding: 30,
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: 20, color: "#1f2937" }}>
        Teacher Registration
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#05445dff")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#326174ff")
          }
        >
          Register
        </button>
      </form>

      {message && (
        <p style={{ color: "green", marginTop: 15, textAlign: "center" }}>
          {message}
        </p>
      )}
      {error && (
        <p style={{ color: "red", marginTop: 15, textAlign: "center" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TeacherRegistration;
