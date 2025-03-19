const express =  require("express")
const router = express.Router()
const userController = require("../controller/user.controller")
const authController = require("../controller/auth.controller")

router.post("/",userController.createUser)
router.post("/login",userController.loginWithEmail)
router.get("/myaccount",authController.authenticate , userController.getUser)

module.exports = router