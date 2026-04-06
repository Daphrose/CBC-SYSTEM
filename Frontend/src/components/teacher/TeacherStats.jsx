const TeacherStats = () => {
  return (
    <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
      <div style={{ padding: 20, background: "#d1e7dd", flex: 1 }}>Assigned Classes: 3</div>
      <div style={{ padding: 20, background: "#cff4fc", flex: 1 }}>Learners: 45</div>
      <div style={{ padding: 20, background: "#f8d7da", flex: 1 }}>Pending Reports: 2</div>
    </div>
  );
};

export default TeacherStats;
