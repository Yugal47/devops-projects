import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>EMS</h2>

      <Link to="/">
        Dashboard
      </Link>

      <Link to="/employees">
        Employees
      </Link>

      <Link to="/departments">
        Departments
      </Link>

      <Link to="/attendance">
        Attendance
      </Link>

      <Link to="/leaves">
        Leaves
      </Link>

    </div>
  );
}

export default Sidebar;
