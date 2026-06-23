const { body, validationResult } = require("express-validator");

exports.employeeValidation = [
  body("first_name")
    .notEmpty()
    .withMessage("First name required"),

  body("last_name")
    .notEmpty()
    .withMessage("Last name required"),

  body("email")
    .isEmail()
    .withMessage("Valid email required")
];

exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  next();
};
