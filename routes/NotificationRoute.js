const notificationController=require('../controllers/NotificationController')
const router=require('express').Router();
const multer=require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
// Route for creating a new notification
router.post('/notifications', upload.single('Image'),notificationController.createNotification);

// Route for fetching all notifications
router.get('/getNotifications', notificationController.getNotifications);

module.exports = router;