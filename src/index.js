const express=require('express')
const route=require('./route/routes')
const mongoose=require('mongoose')
const app=express()

app.use(express.json())

mongoose.connect("mongodb+srv://Shashi_Shekhar_Singh:Shashi0708@myproject.mb3u3za.mongodb.net/InsureMedia-Db?authSource=admin&replicaSet=atlas-lhj98j-shard-0&readPreference=primary&ssl=true",{useNewUrlParser:true})
.then(()=>console.log('MongoDb is Connected'))
.catch(err=>console.log(err))

app.use('/',route)

app.listen(process.env.PORT || 4000,function(){
    console.log('Express App is running on port '+(process.env.PORT || 4000))
})