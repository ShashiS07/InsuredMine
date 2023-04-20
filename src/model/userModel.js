const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    userType:{type:String},
    email:{type:String},
    firstname:{type:String},
    city:{type:String},
    phone:{type:String},
    address:{type:String},
    state:{type:String},
    dob:{type:String},
    isDeleted:{type:Boolean,default:false}
},{timestamps:true})

module.exports=mongoose.model('user',userSchema)