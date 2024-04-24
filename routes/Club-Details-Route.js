const ClubControllar=require('../controllers/clubInfoControllar');
const router=require('express').Router();
const Club=require('../models/clubCreateInfo');
const multer=require('multer');
const express =require('express');
const path = require('path');
// router.use(express.static(path.join(__dirname, 'Frontend pages')));
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/images');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now+"_"+file.originalname);
    },
})

var upload = multer({ storage: storage });

router.post('/uploadImage',upload.single('Club Logo'),(req,res)=>{
    
})
// router.get('/form',(req,res)=>{
//     res.sendFile(express.static(path.join(__dirname+'../Frontend pages/Admin/create club page/create_club_page.html')))
// })

router.post('/newClub',upload.single('image'),ClubControllar.newClub);


router.get('/getAllClubs',ClubControllar.getAllClubs);

router.get('/:id',ClubControllar.getOneClub);


router.put('/:id',ClubControllar.updateClub);

router.delete('/:id',ClubControllar.deleteClub);


module.exports=router;