const EventControllar=require('../controllers/EventController');
const router=require('express').Router();
const multer=require('multer');
const upload = multer({ dest: 'uploads/' });

//create event route
router.post('/newEvent',EventControllar.newEvent);

//get all route
router.get('/getAllEvents',EventControllar.getAllEvents);

//get one route
router.get('/:id',EventControllar.getOneEvent);


router.get('/events/club/:clubName', EventControllar.getEventsByClubName);

//update route
router.put('/:id',EventControllar.updateEevnt);

//update route
router.patch('/:id',upload.single('file'),EventControllar.updateEevnt);

//delete route
router.delete('/:id',EventControllar.deleteEvent);

module.exports=router;