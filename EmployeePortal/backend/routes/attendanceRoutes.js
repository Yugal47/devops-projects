const router = require("express").Router();

const controller =
require("../controllers/attendanceController");

router.get("/",
controller.getAttendance);

router.post("/",
controller.markAttendance);

module.exports = router;
