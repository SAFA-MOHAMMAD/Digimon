const db=require('../models');
const User=db.user

const newUser=async(req,res)=>{
    let info={
        userId:req.body.userId,
        userEmail: req.body.userEmail,
        userPassword:req.body.userPassword,
        userImage:req.body.userImage
    }
    const user=await User.create(info);
    res.status(200).send(user);
    console.log(user);
}
const getAllUsers=async(req,res)=>{
let users=await User.findAll({})
res.status(200).send(users)
}

const getOneUser=async(req,res)=>{
let id=req.params.id
let user=await User.findOne({where:{id:id}})
res.status(200).send(user)
}

module.exports={
    newUser,
    getAllUsers,
    getOneUser
}
