const pool = require("../db/db");

exports.getLeaves = async (req, res, next) => {

  try {

    const result = await pool.query(
      `
      SELECT
      l.*,
      e.first_name,
      e.last_name

      FROM leave_requests l

      JOIN employees e
      ON l.employee_id=e.id

      ORDER BY l.id DESC
      `
    );

    res.json(result.rows);

  } catch (err) {
    next(err);
  }
};

exports.createLeave = async (req, res, next) => {

  try {

    const {
      employee_id,
      start_date,
      end_date,
      reason
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO leave_requests
      (
      employee_id,
      start_date,
      end_date,
      reason
      )
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,
      [
        employee_id,
        start_date,
        end_date,
        reason
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    next(err);
  }
};

exports.updateLeaveStatus = async (req, res, next) => {

  try {

    const { status } = req.body;

    const result = await pool.query(
      `
      UPDATE leave_requests
      SET status=$1
      WHERE id=$2
      RETURNING *
      `,
      [status, req.params.id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    next(err);
  }
};
