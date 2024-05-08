const db = require('../models');
const Notification=db.notification
const multer = require('multer');

//const Notification = require('../models/Notification');

const  createNotification= async (req, res) => {
    console.log('Received file:', req.file); // Debugging line
    console.log(req.body);
        // If file is uploaded, use the path; otherwise, set to null
        try {
            let info={
                message:req.body.message,
                Title:req.body.Title,
                Image:req.body.Image
            }
            const newNotification = await Notification.create(info);
            res.status(201).json({ message: 'Notification created successfully', notification: newNotification });
        } catch (error) {
            console.error('Error creating notification:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    const getNotifications= async (req, res) => {
        try {
            const notifications = await Notification.findAll({});
            res.status(200).json(notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


module.exports={
    createNotification,
    getNotifications
}
