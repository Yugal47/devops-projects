import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";

function App() {
  return (
    <BrowserRouter>
      <div className="layout">

        <Sidebar />

        <div className="content">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/employees"
              element={<Employees />}
            />

            <Route
              path="/departments"
              element={<Departments />}
            />

            <Route
              path="/attendance"
              element={<Attendance />}
            />

            <Route
              path="/leaves"
              element={<Leaves />}
            />

          </Routes>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
