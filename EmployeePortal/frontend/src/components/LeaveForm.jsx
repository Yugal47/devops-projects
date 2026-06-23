import { useEffect, useState } from "react";
import api from "../services/api";

function LeaveForm({ reload }) {
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    start_date: "",
    end_date: "",
    reason: ""
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (
      !form.employee_id ||
      !form.start_date ||
      !form.end_date ||
      !form.reason
    ) {
      alert("All fields are required");
      return;
    }

    if (
      new Date(form.end_date) <
      new Date(form.start_date)
    ) {
      alert(
        "End date cannot be before start date"
      );
      return;
    }

    try {
      await api.post("/leaves", form);

      setForm({
        employee_id: "",
        start_date: "",
        end_date: "",
        reason: ""
      });

      reload();
    } catch (err) {
      console.error(err);
      alert("Failed to submit leave request");
    }
  };

  return (
    <form onSubmit={submit}>
      <h3>Apply Leave</h3>

      <select
        value={form.employee_id}
        onChange={(e) =>
          setForm({
            ...form,
            employee_id: e.target.value
          })
        }
      >
        <option value="">
          Select Employee
        </option>

        {employees.map((emp) => (
          <option
            key={emp.id}
            value={emp.id}
          >
            {emp.first_name} {emp.last_name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={form.start_date}
        onChange={(e) =>
          setForm({
            ...form,
            start_date: e.target.value
          })
        }
      />

      <input
        type="date"
        value={form.end_date}
        onChange={(e) =>
          setForm({
            ...form,
            end_date: e.target.value
          })
        }
      />

      <textarea
        placeholder="Reason"
        value={form.reason}
        onChange={(e) =>
          setForm({
            ...form,
            reason: e.target.value
          })
        }
      />

      <button type="submit">
        Apply Leave
      </button>
    </form>
  );
}

export default LeaveForm;
