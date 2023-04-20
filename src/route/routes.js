const express=require('express')
const app=express()
const router=express.Router()
const multer=require('multer')
const path=require('path')
const {importData}=require('../controller/importData')
const {createUser,getusers,getuserbyId,updateUser,deleteUser}=require('../controller/userController')
const {accountCreate,getAccount,getaccountbyId,updateAccount,deleteAccount}=require('../controller/accountController')
const { createPolicy,getPolicies,getpolicybyId,updatePolicy,deletePolicy }=require('../controller/policyController')
app.use(express.static(path.resolve(__dirname,'public')));

// =====================connection for importing csv file=====================================

var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./src/public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
var upload=multer({storage:storage})


// ==============route form uploding csv file in MongoDb===============================

router.post('/importcsv',upload.single('file'),importData)

// =========================routes for user============================================

router.post('/createuser',createUser)
router.get('/getusers',getusers)
router.get('/getusers/:id',getuserbyId)
router.put('/updateuser/:id',updateUser)
router.delete('/deleteuser/:id',deleteUser)

// ==========================routes for account=======================================

router.post('/createaccount',accountCreate)
router.get('/getaccounts',getAccount)
router.get('/getaccounts/:id',getaccountbyId)
router.put('/updateaccount/:id',updateAccount)
router.delete('/deleteaccount/:id',deleteAccount)

// ===========================routes for policy=======================================

router.post('/createpolicy',createPolicy)
router.get('/getpolicies',getPolicies)
router.get('/getpolicies/:id',getpolicybyId)
router.put('/updatepolicy/:id',updatePolicy)
router.delete('/deletepolicy/:id',deletePolicy)

// ===========================route for invalid path================================

router.all('/*',function(req,res){
    return res.status(404).send("Invalid Http Request")
})

module.exports=router