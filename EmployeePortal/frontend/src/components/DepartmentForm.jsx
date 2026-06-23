import { useState } from "react";
import api from "../services/api";

function DepartmentForm({ reload }) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [error, setError] =
    useState("");

  const submit = async (e) => {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError(
        "Department name is required"
      );
      return;
    }

    try {
      await api.post("/departments", {
        name,
        description
      });

      setName("");
      setDescription("");

      reload();

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to create department"
      );
    }
  };

  return (
    <form onSubmit={submit}>

      <h3>Add Department</h3>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <input
        type="text"
        placeholder="Department Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button type="submit">
        Create Department
      </button>

    </form>
  );
}

export default DepartmentForm;
