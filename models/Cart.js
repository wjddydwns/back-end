
//cart.js

const mongoose = require('mongoose')
const User = require('./user')
const Product = require('./Product')
const Schema  = mongoose.Schema

const cartSchema  = Schema({
    // 외래키 FK , reference User 테이블
   userId : {type : mongoose.ObjectId, ref:User},
   items:[{
    productId :{type : mongoose.ObjectId, ref:Product},
    size :{type : String , required : true},
    // qty quentity : 수량량
    qty : {type:Number, default : 1}
   }]

},{timestamps : true})

// 뺴고 싶은 정보
cartSchema.methods.toJSON =function(){
    const obj = this._doc

    delete obj.__v
    delete obj.updateAt
    delete obj.createAt
    return obj
}

const Cart = mongoose.model("Cart",cartSchema)

module.exports = Cart