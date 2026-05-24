const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

/* Controller */

const {

    addProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct

} = require("../controllers/productController");

/* Routes */
router.post(
    "/",
    upload.array("images", 5),
    addProduct
);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;