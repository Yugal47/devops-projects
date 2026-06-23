import { useEffect, useState } from "react";
import api from "../services/api";
import AttendanceForm from "../components/AttendanceForm";

function Attendance() {
  const [records, setRecords] =
    useState([]);

  const loadAttendance =
    async () => {
      const res =
        await api.get("/attendance");

      setRecords(res.data);
    };

  useEffect(() => {
    loadAttendance();
  }, []);

  return (
    <div>
      <h1>Attendance</h1>

      <AttendanceForm
        reload={loadAttendance}
      />

      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((item) => (
            <tr key={item.id}>
              <td>
                {item.first_name}
                {" "}
                {item.last_name}
              </td>

              <td>
                {item.attendance_date}
              </td>

              <td>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
