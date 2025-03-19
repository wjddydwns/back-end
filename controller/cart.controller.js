const Cart = require("../models/Cart");

const cartController = {};

cartController.addToCart = async (req, res) => {
    try {
        const { userId } = req;
        const { productId, size, qty } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
            await cart.save();
        }

        const existItem = cart.items.find(
            (item) => item.productId.equals(productId) && item.size === size
        );

        if (existItem) {
            return res.status(400).json({ status: "fail", error: "아이템이 이미 카트에 담겨있습니다." });
        }

        // ✅ 기존 배열을 그대로 두고 새로운 아이템만 추가
        cart.items.push({ productId, size, qty });
        await cart.save();

        res.status(200).json({ 
            status: "카트에 아이템이 담겼습니다.", 
            data: cart, 
            cartItemQty: cart.items.length 
        });
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};

cartController.getCart = async (req, res) => {
    try {
        const { userId } = req;
        let cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart) {
            return res.status(200).json({ status: "담긴 아이템", data: [] });
        }

        // 유효하지 않은 상품 제거
        const filterItems = cart.items.filter(item => item.productId !== null);
        if (filterItems.length !== cart.items.length) {
            cart.items = filterItems;
            await cart.save();
        }

        res.status(200).json({ status: "담긴 아이템", data: cart.items });
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};

module.exports = cartController;
