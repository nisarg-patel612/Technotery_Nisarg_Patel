const router = require("express").Router();
const upload = require("../Middleware/Upload");
const ctrl = require("../Controllers/Product.Controller");

router.post("/", upload.single("image"), ctrl.createProduct);
router.get("/", ctrl.getProducts);
router.get("/:id", ctrl.getProduct);
router.put("/:id", upload.single("image"), ctrl.updateProduct);
router.delete("/:id", ctrl.deleteProduct);

module.exports = router;