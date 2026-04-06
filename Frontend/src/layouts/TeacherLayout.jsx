// src/layouts/TeacherLayout.jsx
import { Outlet } from "react-router-dom";
import TeacherSidebar from "../components/teacher/TeacherSidebar";

const TeacherLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <TeacherSidebar />
      <main style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </main>
    </div>
    
  );
};

export default TeacherLayout;

