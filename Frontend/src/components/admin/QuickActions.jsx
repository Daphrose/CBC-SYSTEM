// src/components/admin/QuickActions.jsx
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div style={{ margin: "20px 0", display: "flex", gap: 10 }}>
      <button onClick={() => navigate("/admin/verify-teachers")}>Verify Teacher</button>
      <button onClick={() => navigate("/admin/class-allocation")}>Allocate Class</button>
      <button onClick={() => navigate("/admin/reports")}>Generate Report</button>
    </div>
  );
};

export default QuickActions;
