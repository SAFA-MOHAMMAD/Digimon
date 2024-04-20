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
app.use(express.static('Frontend pages'));
app.use(express.static('uploads'));
// app.use(express.static('./Frontend pages/Admin/Log-in'));
// app.use(express.static('./Frontend pages/Admin/all-events'));
// app.use(express.static('./Frontend pages/Admin/all-posts'));
// app.use(express.static('./Frontend pages/Admin/Club-Page'));
// app.use(express.static('./Frontend pages/Admin/create club page'));
// app.use(express.static('./Frontend pages/Admin/Event details'));
// app.use(express.static('./Frontend pages/Admin/event request information'));
// app.use(express.static('./Frontend pages/Admin/home'));
// app.use(express.static('./Frontend pages/Admin/Incoming Post Requests'));
// app.use(express.static('./Frontend pages/Admin/Incoming requests'));
// app.use(express.static('./Frontend pages/Admin/Log-in'));
// app.use(express.static('./Frontend pages/Admin/Post details'));
// app.use(express.static('./Frontend pages/Admin/post request infromation'));

// app.use(express.static('./Frontend pages/Club Manager/all-events'));
// app.use(express.static('./Frontend pages/Club Manager/all-events-Myclub'));
// app.use(express.static('./Frontend pages/Club Manager/all-posts'));
// app.use(express.static('./Frontend pages/Club Manager/all-posts-Myclub'));
// app.use(express.static('./Frontend pages/Club Manager/create event page'));
// app.use(express.static('./Frontend pages/Club Manager/Create post page'));
// app.use(express.static('./Frontend pages/Club Manager/Event details'));
// app.use(express.static('./Frontend pages/Club Manager/Event details-myclub'));
// app.use(express.static('./Frontend pages/Club Manager/home'));
// app.use(express.static('./Frontend pages/Club Manager/Log-in page'));


// app.use(express.static('./Frontend pages/Student/all-events'));
// app.use(express.static('./Frontend pages/Student/all-posts'));
// app.use(express.static('./Frontend pages/Student/Club-Page'));
// app.use(express.static('./Frontend pages/Student/Event details'));
// app.use(express.static('./Frontend pages/Student/home'));
app.use(express.static('./Frontend pages/Student/Log-in page'));
// app.use(express.static('./Frontend pages/Student/home'));
// app.use(express.static('./Frontend pages/Student/Post details'));
// app.use(express.static('./Frontend pages/Student/weekly-events'));


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
app.use(express.static('./Frontend pages/Admin/all-posts'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/Frontend pages/Admin/all-posts/allPosts.html');
});
// // app.use('/userk',expresconsole.log(path.join(__dirname, '/Frontend pages/Student/home/home.html'));
// s.static(path.join(__dirname+'/Frontend pages/SKS_Admin.html')));
app.use('/Frontend pages/Student/home/home.html',express.static(path.join(__dirname+'/Frontend pages/Student/home/home.html')));
app.use('/Frontend pages/Admin/Log-in/Club_Manager.html',express.static(path.join(__dirname+"/Frontend pages/Admin/Log-in/SKS_Admin.html")));
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
