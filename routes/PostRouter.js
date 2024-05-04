const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const PostController = require('../controllers/PostController');

// Create post route
router.post('/newPost', upload.single('file'), PostController.newPost);

// Get all posts route
router.get('/getAllPosts', PostController.getAllPosts);

// Get one post route
router.get('/:id', PostController.getOnePost);

// Update post route
router.put('/:id', PostController.updatePost);

// Update post route with file upload
router.patch('/:id', upload.single('file'), PostController.updatePost);

// Delete post route
router.delete('/:id', PostController.deletePost);

module.exports = router;
