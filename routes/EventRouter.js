const EventController = require('../controllers/EventController');
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Create event route
router.post('/newEvent', EventController.newEvent);

// Get all events route
router.get('/getAllEvents', EventController.getAllEvents);

// Get one event route
router.get('/:id', EventController.getOneEvent);

// Update event route (using PUT method)
router.put('/:id', EventController.updateEvent);

// Update event route (using PATCH method for file upload)
router.patch('/:id', upload.single('file'), EventController.updateEvent);

// Delete event route
router.delete('/:id', EventController.deleteEvent);

module.exports = router;
