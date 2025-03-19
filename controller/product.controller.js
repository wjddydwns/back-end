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

productController.getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) throw new Error("No item found");
      res.status(200).json({ status: "success", data: product });
    } catch (error) {
      return res.status(400).json({ status: "fail", error: error.message });
    }
  };

productController.checkStock =async(item)=>{
    // 내가 사려는 아이템 재고 정보 들고오기
    const product = await Product.findById(item.productId)
    // 내가 사려는 아이템 qty,와 재고 비교
    if(product.stock[item.size]<item.qty){
    //만약 재고가 불충분하면 불충분 메세지와 함께 데이터 반환
        return {isverify:false,message:`${product.name}의 ${item.size}재고가 부족합니다.`}
    }
    const newStock = {...product.stock}
    newStock[item.size] -= item.qty
    product.stock = newStock
    await product.save()
    //충분 하다면 , 재고에서 - qty 하고 성공메세지 보내기.
    return {isverify : true}
  }
productController.checkItemListStock = async (itemList)=>{
    const insufficientStockItems =[]
    //재고 확인 로직
    // 비동기 한번에 처리 
    await Promise.all(
    itemList.map(async(item)=>{
        const stockCheck = await productController.checkStock(item)
        if(!stockCheck.isverify){
            insufficientStockItems.push({item,message:stockCheck.message})
        }
        return stockCheck
    })
)
    return insufficientStockItems
    
}

module.exports = productController;
