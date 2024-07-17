const db=require('../models');
const User=db.user

const newUser=async(req,res)=>{
    console.log('Request body:', req.body);
    try {    
        let info={
        userId:req.body.userId,
        userEmail: req.body.userEmail,
        userPassword:req.body.userPassword,
        confirmPassword:req.body.confirmPassword
        }
    if (info.userPassword===info.confirmPassword){
    const user=await User.create(info);
    res.status(200).send(user);
    console.log(user);
}
    else{
    console.log("enter the right data");
    res.status(500).send('Internal Server Error');}
} catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
}
}
const login=async(req,res)=>{
    console.log('Request body:', req.body);
    try {    
        
        const userEmail=req.body.userEmail;
        const userPassword=req.body.userPassword;
        const confirmPassword=null;
        const user = await User.findOne({ where: { userEmail } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    if (userPassword === user.userPassword){
    res.status(200).send(user);
    console.log(user);
}
    else{
    console.log("enter the right data");
    res.status(500).send('Internal Server Error');}
} catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
}
}


const getAllUsers=async(req,res)=>{
let users=await User.findAll({})
res.status(200).send(users)
}

const getOneUser=async(req,res)=>{
let id=req.params.id
let user=await User.findOne({where:{userId:id}})
res.status(200).send(user)
}



const deleteUser=async(req,res)=>{
    let id=req.params.id
    await User.destroy({where:{userId:id}});
    res.status(200).send('user is deleted')
}


const updateUser=async(req,res)=>{
    let id=req.params.id
    const user=await User.update(req.body,{where:{userId:id}});
    res.status(200).send(user);
}

module.exports={
    newUser,
    login,
    getAllUsers,
    getOneUser,
    deleteUser,
    updateUser
}