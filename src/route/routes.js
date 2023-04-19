const express=require('express')
const app=express()
const router=express.Router()
const multer=require('multer')
const path=require('path')
const {importData}=require('../controller/importData')

app.use(express.static(path.resolve(__dirname,'public')));
global._basedir=__dirname
var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./src/public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
var upload=multer({storage:storage})

router.post('/importcsv',upload.single('file'),importData)

router.all('/*',function(req,res){
    return res.status(404).send("Invalid Http Request")
})

module.exports=router