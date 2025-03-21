const express = require("express")
const mongoose = require('mongoose')
const app =  express()
const bodyParser  = require("body-parser")
const cors = require("cors")
const indexRouter = require("./routes/index")
require("dotenv").config()

app.use(cors())
app.use(bodyParser.urlencoded({extended : false }))
app.use(bodyParser.json()) // req.body
app.use("/api",indexRouter)

const mongo_URI  = process.env.LOCAL_DB_ADDRESS
mongoose.connect(mongo_URI,{useNewUrlParser : true})
.then(()=>console.log("mogoose connected"))
.catch((err)=>console.log("mongoose connected fail",err))

app.listen(process.env.PORT || 5001,()=>{
    console.log("server on 5001")
})

