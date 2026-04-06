// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";


const AdminLayout = () => {
  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className="admin-main" style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
