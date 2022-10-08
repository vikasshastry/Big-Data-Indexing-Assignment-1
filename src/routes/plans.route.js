var router = require("express").Router();
const controller = require("../controllers");
const makeCallback = require("../utils/expressCallback");

//POST
router.post("/", makeCallback(controller.plansController.insert));

//GET
router.get("/:id", makeCallback(controller.plansController.find));

//DELETE
router.delete("/:id", makeCallback(controller.plansController.remove));

module.exports = router;
