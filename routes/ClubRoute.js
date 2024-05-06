const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const ClubController = require('../controllers/ClubControllar');

// Create club route
router.post('/newClub', upload.single('file'), ClubController.newClub);

// Get all clubs route
router.get('/getAllClubs', ClubController.getAllClubs);

// Get one club route
router.get('/:id', ClubController.getOneClub);

// Update club route
router.put('/:id', ClubController.updateClub);

// Update club with new logo route
router.patch('/:id', upload.single('club-logo'), ClubController.updateClub);

// Delete club route
router.delete('/:id', ClubController.deleteClub);

module.exports = router;
