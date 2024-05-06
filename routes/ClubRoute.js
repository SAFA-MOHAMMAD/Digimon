const ClubControllar=require('../controllers/ClubControllar');
const router=require('express').Router();
const multer=require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');


//create club route
router.post('/newClub',upload.single('file'),ClubControllar.newClub);

//get all route
router.get('/getAllClubs',ClubControllar.getAllClubs);

//get one route
router.get('/:id',ClubControllar.getOneClub);

router.get('/search/:key',ClubControllar.searchForClub);

//update route
router.put('/:id',ClubControllar.updateClub);

//update route
router.patch('/:id',upload.single('club-logo'),ClubControllar.updateClub);

//delete route
router.delete('/:id',ClubControllar.deleteClub);


module.exports=router;