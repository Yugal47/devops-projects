const pool = require("../db/db");

exports.getStats = async (req, res, next) => {

  try {

    const employees =
      await pool.query(
        "SELECT COUNT(*) FROM employees"
      );

    const departments =
      await pool.query(
        "SELECT COUNT(*) FROM departments"
      );

    const pendingLeaves =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM leave_requests
        WHERE status='Pending'
        `
      );

    res.json({
      totalEmployees:
        Number(employees.rows[0].count),

      totalDepartments:
        Number(departments.rows[0].count),

      pendingLeaves:
        Number(pendingLeaves.rows[0].count)
    });

  } catch (err) {
    next(err);
  }
};
