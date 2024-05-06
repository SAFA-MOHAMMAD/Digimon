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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

app.get('/ClubManager_home.html',(req,res)=>{
    res.sendFile(__dirname+'/public/ClubManager_home.html');
});

app.get('/Student_home.html',(req,res)=>{
    res.sendFile(__dirname+'/public/Student_home.html');
});
app.get('/club',(req,res)=>{
    res.sendFile(__dirname+'/public/Admin_Club-Page.html');
});

app.get('/createClub',(req,res)=>{
    res.sendFile(__dirname+'/public/Admin/create club page/create_club_page.html');
});



//for images
app.get('/uploads/Imagenum5.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads/Imagenum5.png');
});
app.get('/uploads/Imagenum9.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads/Imagenum9.png');
});
app.get('/uploads/Imagenum7.jpg',(req,res)=>{
    res.sendFile(__dirname+'/uploads/Imagenum7.jpg');
});
app.get('/set',(req,res)=>{
res.sendFile(__dirname+'/public/Admin/weekly-events/weekly-Events.html');
});



app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
