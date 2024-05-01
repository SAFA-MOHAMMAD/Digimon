const express =require('express');
const ClubControllar=require('../controllers/clubInfoControllar');
const router=require('express').Router();
const multer=require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' });


router.post('/newClub',upload.single('file'),ClubControllar.newClub);


router.get('/getAllClubs',ClubControllar.getAllClubs);


router.get('/:id',ClubControllar.getOneClub);


router.put('/:id',ClubControllar.updateClub);

router.patch('/:id',upload.single('club-logo'),ClubControllar.updateClub);

router.delete('/:id',ClubControllar.deleteClub);


module.exports=router;