import { useEffect, useState } from "react";
import api from "../services/api";

function EmployeeForm({ onCreated }) {
  const [departments, setDepartments] =
    useState([]);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    salary: "",
    department_id: ""
  });

  useEffect(() => {
    api.get("/departments")
      .then((res) =>
        setDepartments(res.data)
      );
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await api.post("/employees", form);

    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      salary: "",
      department_id: ""
    });

    onCreated();
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="First Name"
        value={form.first_name}
        onChange={(e) =>
          setForm({
            ...form,
            first_name: e.target.value
          })
        }
      />

      <input
        placeholder="Last Name"
        value={form.last_name}
        onChange={(e) =>
          setForm({
            ...form,
            last_name: e.target.value
          })
        }
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value
          })
        }
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value
          })
        }
      />

      <input
        placeholder="Salary"
        value={form.salary}
        onChange={(e) =>
          setForm({
            ...form,
            salary: e.target.value
          })
        }
      />

      <select
        value={form.department_id}
        onChange={(e) =>
          setForm({
            ...form,
            department_id: e.target.value
          })
        }
      >
        <option value="">
          Select Department
        </option>

        {departments.map((dep) => (
          <option
            key={dep.id}
            value={dep.id}
          >
            {dep.name}
          </option>
        ))}
      </select>

      <button type="submit">
        Add Employee
      </button>
    </form>
  );
}

export default EmployeeForm;
