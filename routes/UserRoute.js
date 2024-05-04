const userController = require('../controllers/UserController');
const router = require('express').Router();
const verifyToken = require('../middleware/authMiddleware'); // Import the verifyToken middleware

// Create user route
router.post('/newUser', userController.newUser);

// Login route
router.post('/login', userController.loginUser);

// Refresh token route
router.post('/refreshToken', userController.refreshToken);

// Get all users route (protected)
router.get('/getallUsers', verifyToken, userController.getAllUsers);

// Get one user route (protected)
router.get('/:id', verifyToken, userController.getOneUser);

// Update user route (protected)
router.put('/:id', verifyToken, userController.updateUser);

// Delete user route (protected)
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;
