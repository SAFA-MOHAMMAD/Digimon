const express =require('express');
const cors=require('cors');
const sequelize=require('./config/dbConfig');
const model_event=require('./models/index');
const path=require('path')
const bodyParser=require('body-parser');
const multer=require('multer');
const port=process.env.PORT || 5000;
const app=express()

var corOptions ={
    origin: 'http://localhost:8081'
}

//middlewares
app.set('view engine', 'ejs');
app.use(cors(corOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('uploads'));

//Routers
const UserRouter=require('./routes/UserRoute.js')
app.use('/api/User',UserRouter);


const ClubRouter=require('./routes/ClubRoute.js');
app.use('/api/Club',ClubRouter);


const EventRouter=require('./routes/EventRouter.js');
app.use('/api/Event',EventRouter);


const PostRouter=require('./routes/PostRouter.js');
app.use('/api/Post',PostRouter);



app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/Admin_Log_in.html');
});

app.get('/club',(req,res)=>{
    res.sendFile(__dirname+'/public/Admin_Club-Page.html');
});

app.get('/createClub',(req,res)=>{
    res.sendFile(__dirname+'/public/Admin/create club page/create_club_page.html');
});



//for images
app.get('/uploads/Imagenum1.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads/Imagenum1.jpg');
});
app.get('/uploads/Imagenum2.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads/Imagenum2.jpg');
});
app.get('/uploads/Imagenum3.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads/Imagenum3.jpg');
});
app.get('/uploads/Imagenum4.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads/Imagenum4.jpg');
});
app.get('/uploads/Imagenum5.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads/Imagenum5.png');
});
app.get('/uploads/Imagenum6.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads/Imagenum6.jpg');
});
app.get('/uploads/Imagenum7.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads/Imagenum7.jpg');
});
app.get('/uploads/Imagenum8.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads/Imagenum8.jpg');
});
app.get('/uploads/Imagenum9.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads/Imagenum9.png');
});
app.get('/uploads/Imagenum10.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads//Imagenum10.jpg');
});
app.get('/uploads/Imagenum11.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads/Imagenum11.jpg');
});
app.get('/uploads/Imagenum12.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads/Imagenum12.jpg');
});

app.get('/set',(req,res)=>{
res.sendFile(__dirname+'/public/Admin/weekly-events/weekly-Events.html');
});




app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
