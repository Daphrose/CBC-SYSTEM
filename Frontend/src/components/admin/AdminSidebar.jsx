
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const AdminSidebar = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(navigate);
//   };

//   return (
//     <div className="admin-sidebar" style={{ width: 220, background: "#1E293B", color: "#fff", padding: 20 }}>
//       <h2 style={{ marginBottom: 20 }}>Admin Panel</h2>
//       <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//         <NavLink to="/admin/dashboard" style={{ color: "#fff", textDecoration: "none" }}>Dashboard</NavLink>
//         <NavLink to="/admin/verify-teachers" style={{ color: "#fff", textDecoration: "none" }}>Teacher Verification</NavLink>
//         <NavLink to="/admin/class-allocation" style={{ color: "#fff", textDecoration: "none" }}>Class Allocation</NavLink>
//         <NavLink to="/admin/learners" style={{ color: "#fff", textDecoration: "none" }}>Learners</NavLink>
//         <NavLink to="/admin/reports" style={{ color: "#fff", textDecoration: "none" }}>Reports</NavLink>
//         {/* <NavLink to="/admin/terms" style={{ color: "#fff", textDecoration: "none" }}>Academic Terms</NavLink> */}
//         <button onClick={handleLogout} style={{ marginTop: 20, padding: 8, background: "#F87171", border: "none", cursor: "pointer" }}>Logout</button>
//       </nav>
//     </div>
//   );
// };

// export default AdminSidebar;
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    padding: "10px 12px",
    borderRadius: 6,
    display: "block",
    transition: "all 0.2s",
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: "#2563EB",
    fontWeight: 500,
  };

  return (
    <div
      style={{
        width: 220,
        background: "#1E293B",
        color: "#fff",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: 30, fontSize: 22, textAlign: "center" }}>
        Admin Panel
      </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <NavLink
          to="/admin/dashboard"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/verify-teachers"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Teacher Verification
        </NavLink>
        <NavLink
          to="/admin/class-allocation"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Class Allocation
        </NavLink>
        <NavLink
          to="/admin/learners"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Learners
        </NavLink>
        <NavLink
          to="/admin/reports"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Reports
        </NavLink>

        <button
          onClick={handleLogout}
          style={{
            marginTop: 20,
            padding: "10px",
            background: "#F87171",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 500,
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#EF4444")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#F87171")}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
