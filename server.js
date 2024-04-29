const express =require('express');
const cors=require('cors');
const sequelize=require('./config/dbConfig');
const model_event=require('./models/index');
const path=require('path')
const bodyParser=require('body-parser');
const port=process.env.PORT || 5000;
const app=express()

var corOptions ={
    origin: 'http://localhost:8081'
}
app.set('view engine', 'ejs');
app.use(cors(corOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('uploads'));
// app.use(express.static('./public/Admin/Log-in'));
// app.use(express.static('./public/Admin/all-events'));
// app.use(express.static('./public/Admin/all-posts'));
// app.use(express.static('./public/Admin/Club-Page'));
// app.use(express.static('./public/Admin/create club page'));
// app.use(express.static('./public/Admin/Event details'));
// app.use(express.static('./public/Admin/event request information'));
// app.use(express.static('./public/Admin/home'));
// app.use(express.static('./public/Admin/Incoming Post Requests'));
// app.use(express.static('./public/Admin/Incoming requests'));
// app.use(express.static('./public/Admin/Log-in'));
// app.use(express.static('./public/Admin/Post details'));
// app.use(express.static('./public/Admin/post request infromation'));

// app.use(express.static('./public/Club Manager/all-events'));
// app.use(express.static('./public/Club Manager/all-events-Myclub'));
// app.use(express.static('./public/Club Manager/all-posts'));
// app.use(express.static('./public/Club Manager/all-posts-Myclub'));
// app.use(express.static('./public/Club Manager/create event page'));
// app.use(express.static('./public/Club Manager/Create post page'));
// app.use(express.static('./public/Club Manager/Event details'));
// app.use(express.static('./public/Club Manager/Event details-myclub'));
// app.use(express.static('./public/Club Manager/home'));
// app.use(express.static('./public/Club Manager/Log-in page'));


// app.use(express.static('./public/Student/all-events'));
// app.use(express.static('./public/Student/all-posts'));
// app.use(express.static('./public/Student/Club-Page'));
// app.use(express.static('./public/Student/Event details'));
// app.use(express.static('./public/Student/home'));
// app.use(express.static('public/Student/Log-in page'));
// app.use(express.static('./public/Student/home'));
// app.use(express.static('./public/Student/Post details'));
// app.use(express.static('./public/Student/weekly-events'));


//Router
const UserRouter=require('./routes/userControllerRoute.js')
app.use('/api/User',UserRouter);

const ClubRouter=require('./routes/Club-Details-Route.js');
app.use('/api/Club',ClubRouter);

const EventRouter=require('./routes/EventRouter.js');
app.use('/api/Event',EventRouter);
const PostRouter=require('./routes/PostRouter.js');
app.use('/api/Post',PostRouter);


// app.get('/',(req, res)=>{
//     res.json({message:'hello from api'})
// });
// app.use(express.static('./public/Admin/all-posts'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/Admin/home/home.html');
});
app.get('/club',(req,res)=>{
    res.sendFile(__dirname+'/public/Admin/Club-Page/Club-Page.html');
});
app.get('/createClub',(req,res)=>{
    res.sendFile(__dirname+'/public/Admin/create club page/create_club_page.html');
});
//  app.get('/set',(req,res)=>{
//    res.sendFile(__dirname+'/public/Admin/weekly-events/weekly-Events.html');
// });


app.use('/public/Admin/Log-in/Club_Manager.html',express.static(path.join(__dirname+"/public/Admin/Log-in/SKS_Admin.html")));
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
