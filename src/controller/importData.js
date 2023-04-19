const csv=require('csvtojson')
const userModel=require('../model/userModel')
const agentModel=require('../model/agentModel')
const policyModel=require('../model/policyModel')
const userAccountModel=require('../model/userAccountModel')

const importData=async (req,res)=>{
try{
    var userdata=[]
    var agentdata=[]
    var policydata=[]
    var userAccountdata=[]
    csv()
    .fromFile(req.file.path)
    .then(async(response)=>{
        for(let x=0;x<response.length;x++){
            userdata.push({
                userType:response[x].userType,
                email:response[x].email,
                firstname:response[x].firstname,
                city:response[x].city,
                phone:response[x].phone,
                address:response[x].address,
                state:response[x].state,
                dob:response[x].dob
            })
            agentdata.push({
                agent:response[x].agent,
                producer:response[x].producer,
                company_name:response[x].company_name
            })
            policydata.push({
                policy_mode:response[x].policy_mode,
                policy_number:response[x].policy_number,
                premium_amount:response[x].premium_amount,
                policy_type:response[x].policy_type,
                policy_start_date:response[x].policy_start_date,
                policy_end_date:response[x].policy_end_date
            })
            userAccountdata.push({
                category_name:response[x].category_name,
                csr:response[x].csr,
                account_name:response[x].account_name,
                account_type:response[x].account_type,
                zip:response[x].zip
            })
        }
        await userModel.insertMany(userdata)
        await agentModel.insertMany(agentdata)
        await policyModel.insertMany(policydata)
        await userAccountModel.insertMany(userAccountdata)
    })
    return res.status(200).send({status:true,message:"csv imported"})
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}
module.exports={importData}