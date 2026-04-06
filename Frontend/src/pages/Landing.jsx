import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 className="landing-title">CBC School System</h1>

        <p className="landing-subtitle">
          Competency Based Curriculum Management Platform
        </p>

        <button
          className="landing-button"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing;
