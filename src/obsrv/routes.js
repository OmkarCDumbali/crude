const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.post("/", controller.createData);
router.get("/:id", controller.readDataById);
router.put("/:id", controller.updateData);
router.delete("/:id", controller.deleteData);


module.exports = router;
