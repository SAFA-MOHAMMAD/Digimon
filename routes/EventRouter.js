const EventControllar=require('../controllers/EventController');
const router=require('express').Router();

router.post('/newEvent',EventControllar.newEvent);

router.get('/getAllEvents',EventControllar.getAllEvents)

router.put('/:id',EventControllar.updateEevnt);

router.delete('/:id',EventControllar.deleteEvent);

module.exports=router;