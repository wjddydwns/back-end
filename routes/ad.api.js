const express =  require("express")
const router = express.Router()
const authController = require("../controller/auth.controller")
const adController = require("../controller/ad.controller")

router.post("/",authController.authenticate , adController.createAd)
router.get("/getad", adController.getAd)

module.exports = router