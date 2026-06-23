const router = require("express").Router();

const controller =
require("../controllers/employeeController");

const {
  employeeValidation,
  checkValidation
} =
require("../middleware/validateEmployee");

router.get("/", controller.getEmployees);

router.get("/:id",
controller.getEmployeeById);

router.post(
  "/",
  employeeValidation,
  checkValidation,
  controller.createEmployee
);

router.put(
  "/:id",
  employeeValidation,
  checkValidation,
  controller.updateEmployee
);

router.delete(
  "/:id",
  controller.deleteEmployee
);

module.exports = router;
