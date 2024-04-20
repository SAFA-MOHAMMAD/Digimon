const userContol=require('../controllers/UserController')
const router=require('express').Router()


router.post('/newUser',userContol.newUser)
router.get('/allUsers',userContol.getAllUsers)
router.get('/:id',userContol.getOneUser)


module.exports=router