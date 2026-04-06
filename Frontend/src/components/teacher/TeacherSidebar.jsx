// src/components/teacher/TeacherSidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const TeacherSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const linkStyle = {
    textDecoration: "none",
    color: "#1f2937",
    padding: "10px 12px",
    borderRadius: 6,
    display: "block",
    fontWeight: 500,
    transition: "background 0.2s",
  };

  return (
 
          <div
        className="no-print"
        style={{
          width: 220,
          backgroundColor: "#6b85beff",
          color: "#131313ff",
          padding: 20,
          minHeight: "100vh",
          borderRight: "1px solid #E5E7EB",
          fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        }}
      >

      <h3
        style={{
          textAlign: "center",
          marginBottom: 25,
          fontSize: 20,
          color: "#111827",
        }}
      >
        Teacher Menu
      </h3>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ marginBottom: 8 }}>
          <Link
            to="/teacher"
            style={linkStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "#E5E7EB")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            Dashboard
          </Link>
        </li>

        <li style={{ marginBottom: 8 }}>
          <Link
            to="/teacher/classes"
            style={linkStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "#E5E7EB")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            My Classes
          </Link>
        </li>

        <li style={{ marginBottom: 8 }}>
          <Link
            to="/teacher/assessments"
            style={linkStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "#E5E7EB")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            Enter Assessments
          </Link>
        </li>

        <li style={{ marginBottom: 8 }}>
          <Link
            to="/teacher/reports"
            style={linkStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "#E5E7EB")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            Reports
          </Link>
        </li>

        <li>
          <button
            onClick={() => logout(navigate)}
            style={{
              marginTop: 20,
              width: "100%",
              padding: "10px",
              backgroundColor: "#59a3c3ff",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 500,
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#110504ff")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#120504ff")
            }
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TeacherSidebar;
