import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    pendingLeaves: 0
  });

useEffect(() => {
  api.get("/dashboard")
    .then((res) => {
      setStats(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);
  return (
    <div>
      <h1>Dashboard</h1>

      <p>Total Employees: {stats.totalEmployees}</p>
      <p>Total Departments: {stats.totalDepartments}</p>
      <p>Pending Leaves: {stats.pendingLeaves}</p>
    </div>
  );
}

export default Dashboard;
