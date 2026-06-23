const pool = require("../db/db");

exports.getDepartments = async (req, res, next) => {

  try {

    const result = await pool.query(
      `
      SELECT
      d.*,
      COUNT(e.id)::int AS employee_count

      FROM departments d

      LEFT JOIN employees e
      ON e.department_id=d.id

      GROUP BY d.id

      ORDER BY d.id
      `
    );

    res.json(result.rows);

  } catch (err) {
    next(err);
  }
};

exports.createDepartment = async (req, res, next) => {

  try {

    const { name, description } = req.body;

    const result = await pool.query(
      `
      INSERT INTO departments
      (name,description)
      VALUES($1,$2)
      RETURNING *
      `,
      [name, description]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    next(err);
  }
};

exports.deleteDepartment = async (req, res, next) => {

  try {

    await pool.query(
      `
      DELETE FROM departments
      WHERE id=$1
      `,
      [req.params.id]
    );

    res.json({
      success: true
    });

  } catch (err) {
    next(err);
  }
};
