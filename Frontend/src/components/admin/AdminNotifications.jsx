// src/components/admin/AdminNotifications.jsx
const AdminNotifications = () => {
  const notifications = [
    "Teacher John Otieno requested login access",
    "New teacher registration pending",
  ];

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((note, idx) => (
          <li key={idx}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNotifications;
