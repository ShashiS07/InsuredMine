const express=require('express')
const app=express()
const router=express.Router()
const multer=require('multer')
const path=require('path')
const {importData}=require('../controller/importData')
const {createUser,getusers,updateUser,deleteUser}=require('../controller/userController')
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


// =====================================routes================================================

router.post('/importcsv',upload.single('file'),importData)

// =============routes for user==================================

router.post('/createuser',createUser)
router.get('/getusers',getusers)
router.put('/updateuser/:id',updateUser)
router.delete('/deleteuser/:id',deleteUser)

router.all('/*',function(req,res){
    return res.status(404).send("Invalid Http Request")
})

module.exports=router