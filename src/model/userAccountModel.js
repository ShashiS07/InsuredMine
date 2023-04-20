const mongoose=require('mongoose')

const userAccountSchema=new mongoose.Schema({
    category_name:{type:String},
    csr:{type:String},
    account_name:{type:String},
    account_type:{type:String},
    zip:{type:String},
    isDeleted:{type:Boolean,default:false}
},{timestamps:true})

module.exports=mongoose.model("user_account",userAccountSchema)