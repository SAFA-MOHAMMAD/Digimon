const userController=require('../controllers/UserController')
const router=require('express').Router()

//create user route
router.post('/newUser',userController.newUser)

//get all route
router.get('/getallUsers',userController.getAllUsers)

//get one route
router.get('/:id',userController.getOneUser)

//update route
router.put('/:id',userController.updateUser);

//delete route
router.delete('/:id',userController.deleteUser);



module.exports=router