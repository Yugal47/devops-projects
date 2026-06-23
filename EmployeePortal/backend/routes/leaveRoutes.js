const router = require("express").Router();

const controller =
require("../controllers/leaveController");

router.get("/",
controller.getLeaves);

router.post("/",
controller.createLeave);

router.put(
  "/:id/status",
  controller.updateLeaveStatus
);

module.exports = router;
