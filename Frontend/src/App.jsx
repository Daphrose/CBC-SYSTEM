// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentReport from "./pages/teacher/StudentReport";
import Landing from "./pages/Landing";

import "./index.css";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import TeacherLayout from "./layouts/TeacherLayout";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import TeacherVerification from "./pages/admin/TeacherVerification";
import ClassAllocation from "./pages/admin/ClassAllocation";
import Learners from "./pages/admin/Learners";
import Reports from "./pages/admin/Reports"; // Make sure this is the frontend page!

// Teacher pages
import TeacherDashboard from "./pages/TeacherDashboard";
import MyClasses from "./pages/teacher/MyClasses";
import EnterAssessments from "./pages/teacher/EnterAssessments";
import GeneratedReports from "./pages/teacher/GeneratedReports";
import TeacherRegistration from "./pages/teacher/teacherRegistration";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* 🌍 LANDING PAGE */}
          <Route path="/" element={<Landing />} />

          {/* 🔐 LOGIN */}
          <Route path="/login" element={<Login />} />

          {/* PUBLIC TEACHER REGISTRATION */}
          <Route
            path="/teacher/register"
            element={<TeacherRegistration />}
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="verify-teachers" element={<TeacherVerification />} />
            <Route path="class-allocation" element={<ClassAllocation />} />
            <Route path="learners" element={<Learners />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* TEACHER ROUTES */}
          <Route
            path="/teacher"
            element={
              <ProtectedRoute role="teacher">
                <TeacherLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TeacherDashboard />} />
            <Route path="classes" element={<MyClasses />} />
            <Route path="assessments" element={<EnterAssessments />} />
            <Route path="reports" element={<GeneratedReports />} />
            <Route path="report/:assessmentId" element={<StudentReport />} />
            <Route
              path="report/:assessmentId/:learnerId"
              element={<StudentReport />}
            />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}


// function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>

//           {/* DEFAULT */}
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/login" element={<Login />} />

//           <Route path="/" element={<Landing />} />
//           <Route path="/login" element={<Login />} />


//           {/* PUBLIC TEACHER REGISTRATION */}
//           <Route
//             path="/teacher/register"
//             element={<TeacherRegistration />}
//           />

//           {/* ADMIN ROUTES */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute role="admin">
//                 <AdminLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<Navigate to="dashboard" />} />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="verify-teachers" element={<TeacherVerification />} />
//             <Route path="class-allocation" element={<ClassAllocation />} />
//             <Route path="learners" element={<Learners />} />
//             <Route path="reports" element={<Reports />} />
//           </Route>

        
//           {/* TEACHER ROUTES */}
//             <Route
//               path="/teacher"
//               element={
//                 <ProtectedRoute role="teacher">
//                   <TeacherLayout />
//                 </ProtectedRoute>
//               }
//             >
//               <Route index element={<TeacherDashboard />} />
//               <Route path="classes" element={<MyClasses />} />
//               <Route path="assessments" element={<EnterAssessments />} />
//               <Route path="reports" element={<GeneratedReports />} />

//               {/* NEW REPORT VIEW ROUTES */}
//               <Route path="report/:assessmentId" element={<StudentReport />} />
//               <Route
//                 path="report/:assessmentId/:learnerId"
//                 element={<StudentReport />}
//               />
//             </Route>


//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

export default App;
