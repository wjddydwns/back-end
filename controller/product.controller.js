const Product = require("../models/Product");

const productController = {};

// ✅ 전체 상품 조회
productController.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ status: "success", products });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};

// ✅ 특정 상품 조회 (ID 사용)
productController.getProduct = async (req, res) => {
    try {
        const { id } = req.params; // URL에서 ID 가져오기
        if (!id) {
            return res.status(400).json({ status: "fail", message: "상품 ID가 필요합니다." });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ status: "fail", message: "상품을 찾을 수 없습니다." });
        }

        res.status(200).json({ status: "success", product });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};

// ✅ 상품 등록
productController.createProduct = async (req, res) => {
    try {
        const { sku, name, image, category, description, price, stock, status } = req.body;

        if (!sku || !name || !category || !price || !stock) {
            return res.status(400).json({ status: "fail", message: "필수 정보를 입력해주세요." });
        }

        const newProduct = new Product({
            sku,
            name,
            image,
            category,
            description,
            price,
            stock,
            status: status || "active",
        });

        await newProduct.save();
        res.status(201).json({ status: "success", product: newProduct });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};

module.exports = productController;
