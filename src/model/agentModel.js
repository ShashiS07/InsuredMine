const mongoose=require('mongoose')

const agentSchema=new mongoose.Schema({
    agent:{type:String},
    producer:{type:String},
    company_name:{type:String},
    isDeleted:{type:Boolean,default:false}
},{timestamps:true})

module.exports=mongoose.model("agent",agentSchema)