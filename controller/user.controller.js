const User = require("../models/user")
//비밀번호 암호화 라이브러리
const bcrypt =require("bcryptjs")

const userController = {}
// 기능 1 : 회원가입
userController.createUser = async(req,res)=>{
    try{
        // 1. 프론트엔드 한테 무슨 정보를 받는가?
        let {email,password,name,level} = req.body
        // 2. 중복 가입 방지
        const user = await User.findOne({email}) //유저를 찾아주세요 {이메일}
        if(user){
            throw new Error("이미 가입된 이메일 입니다 😭")
        }
        // 3. 비밀번호 암호화 
        const salt = await bcrypt.genSaltSync(10) //복잡도 10
        password = await bcrypt.hash(password,salt)
        // 4. 새 유저 저장 (비밀번호가 암호화된 새 유저)
        const newUser = new User({email,password,name,level : level?level : "customer"})
        await newUser.save()
        // 5. 꼭 반환 해주셔야 합니다 (백엔드가 보내줄 정보 없음)
        return res.status(200).json({status: " 새 유저 저장 성공" })
    }
    catch(error){
        res.status(400).json({status: " 새 유저 저장 실패",error:error.message })
    }

}

userController.loginWithEmail = async(req,res)=>{
    try{
        // 프론드엔드한테 전달 받는다.
        const {email,password} = req.body
        // 이 이메일 입력한 데이터를 찾아주세요
        const user = await User.findOne({email})
        // 유저가 있다면 토큰 발급 해주세요
        if(user){
            // 비밀번호 (암호화된 비밀번호) 맞는지 확인하고
            const isMatch = bcrypt.compareSync(password,user.password)
            if(isMatch){
                const token  = await user.generateToken()
                return res.status(200).json({status:"토근 발급 완료",user,token})
            }
        }
        //오류 발생시
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.")
    }
    catch(error)
    {
        res.status(400).json({status: "토큰 발급 실패",error:error.message })

    }
}
userController.getUser = async(req,res)=>{
    try{
        //userId 를 요청 받고
        const {userId} = req
        // Id 찾고
        const user = await User.findById(userId)
        if(!user){
            throw new Error("유저를 찾을 수 없습니다.")
        }
        res.status(200).json({status:"유저를 찾음",user})

    }
    catch(error){
        res.status(400).json({status:"fail",error:error.message})
    }
}


module.exports = userController
