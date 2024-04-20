const express =require("express")
const router=express.Router()

router.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/Student/Log-in page/SKS_Admin.html');
});

module.exports=router