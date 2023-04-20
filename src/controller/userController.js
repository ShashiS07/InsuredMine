const userModel = require('../model/userModel')

// ===================================user creation==========================================
const createUser = async (req, res) => {
    try {
        let data = req.body
        if (!Object.keys(data).length) return res.status(400).send({ status: false, message: "Please Provide information about user" })

        let { userType, email, firstname, city, address, phone, state, dob } = data
        // check fields are present or not.
        if (!userType) return res.status(400).send({ status: false, message: "userType is missing" })
        if (!email) return res.status(400).send({ status: false, message: "Please provide Email" })
        if (!firstname) return res.status(400).send({ status: false, message: "Please provide firstname" })
        if (!city) return res.status(400).send({ status: false, message: "Please provide city" })
        if (!address) return res.status(400).send({ status: false, message: "address is mandatory" })
        if (!phone) return res.status(400).send({ status: false, message: "phone is mandatory" })
        if (!state) return res.status(400).send({ status: false, message: "state is mandatory" })
        if (!dob) return res.status(400).send({ status: false, message: "dob is mandatory" })

        // if all fields are present insert document in collection

        let userdata = await userModel.create(data)
        return res.status(201).send({ status: true, message: "Success", user: userdata })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// =======================get users==================================================

const getusers=async (req,res)=>{
try{
    let allUsers=await userModel.find({isDeleted:false})
    if(!allUsers.length) return res.status(404).send({status:false,message:"User Collection is empty"})

    return res.status(200).send({status:true,message:"Success",users:allUsers})
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}

// ===========================update user===========================================

const updateUser=async (req,res)=>{
try{
    let id=req.params.id
    let dataForUpdate=req.body

    if(!Object.keys(dataForUpdate).length) return res.status(400).send({status:false,message:"Please provide data for update"})

    let updatedData=await userModel.findByIdAndUpdate({_id:id},{$set:dataForUpdate},{new:true})
    if(!updatedData) return res.status(404).send({status:false,message:"User Not Found"})
    return res.status(200).send({status:true,message:"Updated",user:updatedData})
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}

// =====================delete user==========================================================

const deleteUser=async (req,res)=>{
try{
    let id=req.params.id
    let deletedUser=await userModel.findByIdAndUpdate({_id:id},{$set:{isDeleted:true}},{new:true})
    if(!deletedUser) return res.status(404).send({status:false,message:"User Not Found or Already deleted"})
    return res.status(200).send({status:true,message:"User Deletion Successful"})
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}

// ==========================================================================================
module.exports = { createUser, getusers,updateUser,deleteUser }