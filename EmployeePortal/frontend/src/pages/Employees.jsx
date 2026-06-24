import { useEffect, useState } from "react";
import api from "../services/api";
import EmployeeForm from "../components/EmployeeForm";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const loadEmployees = async () => {
    const res = await api.get(
      `/employees?search=${search}`
    );

    setEmployees(
      Array.isArray(res.data)
        ? res.data
        : res.data?.employees || res.data?.data || []
    );
  };

  useEffect(() => {
    loadEmployees();
  }, [search]);

  const deleteEmployee = async (id) => {
    await api.delete(`/employees/${id}`);
    loadEmployees();
  };

  return (
    <div>
      <h1>Employees</h1>

      <EmployeeForm onCreated={loadEmployees} />

      <br />

      <input
        placeholder="Search employee..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
	  {Array.isArray(employees) &&
	    employees.map(emp => (
              <tr key={emp.id}>
              <td>
                {emp.first_name} {emp.last_name}
              </td>

              <td>{emp.email}</td>

              <td>
                {emp.department_name}
              </td>

              <td>
                <button
                  onClick={() =>
                    deleteEmployee(emp.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
