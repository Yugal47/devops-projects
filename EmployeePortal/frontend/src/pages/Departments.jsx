import { useEffect, useState } from "react";
import api from "../services/api";
import DepartmentForm from "../components/DepartmentForm";

function Departments() {
  const [departments, setDepartments] =
    useState([]);

  const loadDepartments = async () => {
    const res =
      await api.get("/departments");

    setDepartments(res.data);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const deleteDepartment =
    async (id) => {
      await api.delete(
        `/departments/${id}`
      );

      loadDepartments();
    };

  return (
    <div>
      <h1>Departments</h1>

      <DepartmentForm
        reload={loadDepartments}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Employees</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((dep) => (
            <tr key={dep.id}>
              <td>{dep.name}</td>

              <td>
                {dep.description}
              </td>

              <td>
                {dep.employee_count}
              </td>

              <td>
                <button
                  onClick={() =>
                    deleteDepartment(dep.id)
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

export default Departments;
