const router = require("express").Router();

const controller =
require("../controllers/departmentController");

router.get("/",
controller.getDepartments);

router.post("/",
controller.createDepartment);

router.delete("/:id",
controller.deleteDepartment);

module.exports = router;
