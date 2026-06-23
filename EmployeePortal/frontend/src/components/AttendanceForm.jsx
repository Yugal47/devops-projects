import { useState } from "react";
import api from "../services/api";

function AttendanceForm({ reload }) {

  const [employeeId,
  setEmployeeId] = useState("");

  const submit = async (e) => {

    e.preventDefault();

    await api.post(
      "/attendance",
      {
        employee_id: employeeId,
        attendance_date:
          new Date()
          .toISOString()
          .slice(0,10),
        status:"Present"
      }
    );

    reload();
  };

  return (
    <form onSubmit={submit}>

      <input
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e)=>
          setEmployeeId(e.target.value)
        }
      />

      <button>
        Mark Present
      </button>

    </form>
  );
}

export default AttendanceForm;
