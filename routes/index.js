const express = require("express")
const router = express.Router()

const userAPI = require("./user.api")
const  adAPI = require("./ad.api")
const productApi = require("./product.api")
const cartAPI = require("./cart.api")

router.use("/user",userAPI)
router.use("/ad", adAPI)
router.use("/product",productApi)
router.use('/cart',cartAPI)

module.exports = router