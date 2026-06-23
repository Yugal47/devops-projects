const pool = require("../db/db");

exports.getEmployees = async (req, res, next) => {
  try {

    const search = req.query.search || "";

    const result = await pool.query(
      `
      SELECT
      e.*,
      d.name AS department_name

      FROM employees e

      LEFT JOIN departments d
      ON e.department_id = d.id

      WHERE
      e.first_name ILIKE $1 OR
      e.last_name ILIKE $1 OR
      e.email ILIKE $1

      ORDER BY e.id DESC
      `,
      [`%${search}%`]
    );

    res.json(result.rows);

  } catch (err) {
    next(err);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {

    const result = await pool.query(
      `
      SELECT *
      FROM employees
      WHERE id=$1
      `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.json(result.rows[0]);

  } catch (err) {
    next(err);
  }
};

exports.createEmployee = async (req, res, next) => {

  try {

    const {
      first_name,
      last_name,
      email,
      phone,
      salary,
      department_id
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO employees
      (
      first_name,
      last_name,
      email,
      phone,
      salary,
      department_id
      )
      VALUES($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        first_name,
        last_name,
        email,
        phone,
        salary,
        department_id
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {

  try {

    const {
      first_name,
      last_name,
      email,
      phone,
      salary,
      department_id
    } = req.body;

    const result = await pool.query(
      `
      UPDATE employees
      SET
      first_name=$1,
      last_name=$2,
      email=$3,
      phone=$4,
      salary=$5,
      department_id=$6

      WHERE id=$7

      RETURNING *
      `,
      [
        first_name,
        last_name,
        email,
        phone,
        salary,
        department_id,
        req.params.id
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {

  try {

    await pool.query(
      `
      DELETE FROM employees
      WHERE id=$1
      `,
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Employee deleted"
    });

  } catch (err) {
    next(err);
  }
};
