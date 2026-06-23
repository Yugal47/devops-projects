import { useEffect, useState } from "react";
import api from "../services/api";
import LeaveForm from "../components/LeaveForm";

function Leaves() {
  const [leaves, setLeaves] =
    useState([]);

  const loadLeaves = async () => {
    const res =
      await api.get("/leaves");

    setLeaves(res.data);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const updateStatus =
    async (id, status) => {

      await api.put(
        `/leaves/${id}/status`,
        { status }
      );

      loadLeaves();
    };

  return (
    <div>
      <h1>Leaves</h1>

      <LeaveForm
        reload={loadLeaves}
      />

      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>
                {leave.first_name}
                {" "}
                {leave.last_name}
              </td>

              <td>
                {leave.start_date}
              </td>

              <td>
                {leave.end_date}
              </td>

              <td>
                {leave.status}
              </td>

              <td>
                <button
                  onClick={() =>
                    updateStatus(
                      leave.id,
                      "Approved"
                    )
                  }
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      leave.id,
                      "Rejected"
                    )
                  }
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaves;
