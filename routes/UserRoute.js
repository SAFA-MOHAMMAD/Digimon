const userController=require('../controllers/UserController')
const router=require('express').Router()
const multer=require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');

//create user route
router.post('/newUser',upload.none(),userController.newUser)

router.post('/login',upload.none(),userController.login)

//get all route
router.get('/getallUsers',userController.getAllUsers)

//get one route
router.get('/:id',userController.getOneUser)

//update route
router.put('/:id',userController.updateUser);

//delete route
router.delete('/:id',userController.deleteUser);



module.exports=router