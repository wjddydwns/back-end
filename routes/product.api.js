const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const productController = require("../controller/product.controller");

// ✅ 상품 등록 (인증 필요)
router.post("/", authController.authenticate, productController.createProduct);

// ✅ 전체 상품 조회
router.get("/products", productController.getAllProducts);

// ✅ 특정 상품 조회 (ID 사용)
router.get("/:id", productController.getProduct);

// router.get("/edit/:id",authController.authenticate, productController.editProduct)

router.put("/:id",authController.authenticate,productController.updateProduct)

module.exports = router;
