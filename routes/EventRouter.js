const EventControllar=require('../controllers/EventController');
const router=require('express').Router();
const multer=require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
//create event route
router.post('/newEvent',upload.single('file'),EventControllar.newEvent);

//get all route
router.get('/getAllEvents',EventControllar.getAllEvents);

router.get('/getAllNotAproveEvents',EventControllar.getAllNotAproveEvents);


router.get('/getUpcomingEvents',EventControllar.getUpcomingEvents);


//get one route
router.get('/:id',EventControllar.getOneEvent);

//get all by clubname route
router.get('/events/club/:clubName', EventControllar.getEventsByClubName);

router.get('/Notevents/club/:clubName', EventControllar.getNotAprovesEventsByClubName);


router.get('/search/:Date', EventControllar.searchEventsByDate);

router.get('/search/:Date/:ClubName', EventControllar.searchEventsByDateAlleventPages);

//update route
router.put('/:id',upload.single('eventImage'),EventControllar.updateEevnt);

router.put('/approveEvent/:id',EventControllar.approveEvent);

//update route

//delete route
router.delete('/:id',EventControllar.deleteEvent);

module.exports=router;