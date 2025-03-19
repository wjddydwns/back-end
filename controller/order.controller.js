const { randomStringGen } = require("../utils/randomStringGen");
const productController = require("./product.controller");
const Order = require("../models/Order"); // ✅ Order 모델 불러오기

const orderController = {};

orderController.createOrder = async (req, res) => {
    try {
        const { userId } = req;
        const { shipto, contact, totalPrice, orderList } = req.body;

        // ✅ 주문 가능한 재고 확인
        const insufficientStockItems = await productController.checkItemListStock(orderList);
        if (insufficientStockItems.length > 0) {
            const errorMessage = insufficientStockItems
                .map(item => item.message) // ✅ 오류 메시지 배열 생성
                .join(", "); // ✅ 메시지를 하나의 문자열로 변환
            return res.status(400).json({ status: "fail", error: errorMessage });
        }

        // ✅ 새로운 주문 생성
        const newOrder = new Order({
            userId,
            totalPrice,
            shipTo: shipto,  // ✅ 필드명 통일 (대소문자 주의)
            contact,
            items: orderList, // ✅ `item` → `items` 수정
            orderNum: randomStringGen(),
        });

        await newOrder.save();

        res.status(200).json({ status: "success", orderNum: newOrder.orderNum }); // ✅ `ordernum` → `orderNum` 수정
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};

module.exports = orderController;
