const pool = require("../db/db");

exports.getAttendance = async (req, res, next) => {

  try {

    const result = await pool.query(
      `
      SELECT
      a.*,
      e.first_name,
      e.last_name

      FROM attendance a

      JOIN employees e
      ON a.employee_id=e.id

      ORDER BY a.attendance_date DESC
      `
    );

    res.json(result.rows);

  } catch (err) {
    next(err);
  }
};

exports.markAttendance = async (req, res, next) => {

  try {

    const {
      employee_id,
      attendance_date,
      status
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO attendance
      (
      employee_id,
      attendance_date,
      status
      )
      VALUES($1,$2,$3)
      RETURNING *
      `,
      [
        employee_id,
        attendance_date,
        status
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    next(err);
  }
};
