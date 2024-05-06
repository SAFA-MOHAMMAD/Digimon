const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // For handling file uploads
const port = process.env.PORT || 54112;
const app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Allows your frontend to communicate with the backend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allows all CRUD operations
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Headers allowed in the requests
    credentials: true, // Allows cookies and credentials to be sent along with the request
    optionsSuccessStatus: 200 // Legacy browser support for CORS preflight responses
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enabling pre-flight for all routes

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('uploads'));

const EventController = require('./controllers/EventController');
const PostController = require('./controllers/PostController');
const UserController = require('./controllers/UserController'); 

const EventRouter = require('./routes/EventRouter');
const PostRouter = require('./routes/PostRouter');
const UserRouter = require('./routes/UserRoute');
const ClubRouter = require('./routes/ClubRoute');

app.use('/api/Event', EventRouter);
app.use('/api/Post', PostRouter);
app.use('/api/User', UserRouter); 
app.use('/api/Club', ClubRouter);


// Serve static files
app.get('/', (req, res) => res.sendFile(__dirname + '/public/Admin_Log_in.html'));
app.get('/club', (req, res) => res.sendFile(__dirname + '/public/Admin_Club-Page.html'));
app.get('/createClub', (req, res) => res.sendFile(__dirname + '/public/Admin/create club page/create_club_page.html'));

// Serve images
app.get('/uploads/Imagenum1.jpg', (req, res) => res.sendFile(__dirname + '/uploads/Imagenum1.jpg'));
app.get('/uploads/Imagenum2.jpg', (req, res) => res.sendFile(__dirname + '/uploads/Imagenum2.jpg'));
app.get('/uploads/Imagenum3.jpg', (req, res) => res.sendFile(__dirname + '/uploads/Imagenum3.jpg'));
app.get('/uploads/Imagenum4.jpg', (req, res) => res.sendFile(__dirname + '/uploads/Imagenum4.jpg'));
app.get('/uploads/Imagenum5.jpg', (req, res) => res.sendFile(__dirname + '/uploads/Imagenum5.png'));
app.get('/uploads/Imagenum6.jpg', (req, res) => res.sendFile(__dirname + '/uploads/Imagenum6.jpg'));
app.get('/uploads/Imagenum7.jpg', (req, res) => res.sendFile(__dirname + '/uploads/Imagenum7.jpg'));
app.get('/uploads/Imagenum8.jpg', (req, res) => res.sendFile(__dirname + '/uploads/Imagenum8.jpg'));
app.get('/uploads/Imagenum9.jpg', (req, res) => res.sendFile(__dirname + '/uploads/Imagenum9.png'));
app.get('/uploads/Imagenum10.jpg', (req, res) => res.sendFile(__dirname + '/uploads/Imagenum10.jpg'));
app.get('/uploads/Imagenum11.jpg', (req, res) => res.sendFile(__dirname + '/uploads/Imagenum11.jpg'));
app.get('/uploads/Imagenum12.jpg', (req, res) => res.sendFile(__dirname + '/uploads/Imagenum12.jpg'));

app.get('/set', (req, res) => res.sendFile(__dirname + '/public/Admin/weekly-events/weekly-Events.html'));
app.get('/admin_home', (req, res) => res.sendFile(__dirname + '/public/Admin_home.html'));

// Handle POST requests to /api/Event/newEvent
app.post('/api/Event/newEvent', (req, res) => {
  const formData = req.body; // Access form data from the request body

// Include EventController.js for handling form submissions
const EventController = require('./controllers/EventController');

// Handle POST requests to /api/Event/newEvent
app.post('/api/Event/newEvent', async (req, res) => {
    try {
        // Access form data from the request body
        const formData = req.body;
        // Create an Event using the EventController
        const event = await EventController.newEvent(formData);
        // Respond with the created event
        res.status(200).send(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Include PostController.js for handling post submissions
const PostController = require('./controllers/PostController');

// Handle POST requests to /api/Post/newPost
app.post('/api/Post/newPost', upload.single('file'), async (req, res) => {
    try {
        // Access form data from the request body
        const formData = req.body;
        // Create a Post using the PostController
        const post = await PostController.newPost(formData, req.file); // Pass the uploaded file to the controller
        // Respond with the created post
        res.status(200).send(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
});

  // Respond with a JSON object indicating success
  res.json({ message: 'Form data received successfully' });
});

app.get('/set', (req, res) => res.sendFile(__dirname + '/public/Admin/weekly-events/weekly-Events.html'));
app.get('/admin_home', (req, res) => res.sendFile(__dirname + '/public/Admin_home.html'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
