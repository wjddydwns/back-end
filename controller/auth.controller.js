const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
require("dotenv")

authController = {}

//토큰값 체크
authController.authenticate = async(req,res,next)=>{
    try{
        //헤더에 있는 토큰
        const tokenString = req.headers.authorization
        if(!tokenString){
            throw new Error ("토큰값이 없습니다.")
        }
        const token = tokenString.replace("Bearer " ,"")
        //verify() 확인하는 함수
        jwt.verify(token, JWT_SECRET_KEY, (error , payload)=>{
            if(error){
                throw new Error("유요하지 않은 토큰")
            }
            req.userId = payload._id
        })

        next()
    }
    catch(error){
        res.status(400).json({status:"fail",message:error.message})
    }
}

module.exports = authController