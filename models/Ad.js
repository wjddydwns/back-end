const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const AdSchema =  Schema({
    ad_path :  {type: String, require:true, unique : true , trim : true}
})
AdSchema.methods.toJSON =function(){
    const obj = this._doc
    delete obj.__v
    return obj
}
const Ad = mongoose.model("Ad",AdSchema)

module.exports = Ad