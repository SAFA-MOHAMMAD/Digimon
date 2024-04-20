const db = require('../models');
const Club = db.club;
const multer = require('multer');

var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/images');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now+"_"+file.originalname);
    },
})

var upload = multer({ storage: storage });

const newClub = (upload.single('file'),async (req, res) => {
    try {
        // Log the body and file to debug
        // console.log('Request body:', req.body);
        // console.log('Uploaded file:', req.file);
        
        // if (!req.file) {
        //     // No file was uploaded, handle this case
        //     res.status(400).send('File is required.');
        //     return;
        // }
        // Extract information from the request
        let info = {
            clubID: req.body.clubID,
            clubName: req.body.clubName,
            clubPresident: req.body.clubPresident,
            clubVicePresident: req.body.clubVicePresident,
            clubOfficialEmail: req.body.clubOfficialEmail,
            clubPresidentEmail: req.body.clubPresidentEmail,
            clubVicePresidentEmail: req.body.clubVicePresidentEmail,
            clubDescription: req.body.clubDescription,
            clubActivitiesInfo: req.body.clubActivitiesInfo,
            clubLogo: req.file.filename // Use the filename from the uploaded file
        };

        // Create a new club entry in the database
        const club = await Club.create(info);

        // Send the created club information as the response
        res.status(200).send(club);
        console.log('Club created:', club);
    } catch (error) {
        console.error('Error creating club:', error);
        res.status(500).send('Internal Server Error');
    }
});

const getAllClubs = async (req, res) => {
    try {
      // Fetch all clubs from the database
    const club = await Club.findAll({}); 
      // Function to chunk the clubs array into subarrays of 3 elements each
    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
        chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };
      // Chunk the clubs array
    const chunkedClubs = chunkArray(club, 3);
      // Send the chunked array as the response
    res.json(chunkedClubs);
    } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).send('Internal Server Error');
    }
};


const deleteClub=async(req,res)=>{
    let id=req.params.id
    await Club.destroy({where:{clubID:id}});
    res.status(200).send('club is deleted')
}


const updateClub=async(req,res)=>{
    let id=req.params.id
    const club=await Club.update(req.body,{where:{clubID:id}});
    res.status(200).send(club);
}
module.exports={
    newClub,
    getAllClubs,
    deleteClub,
    updateClub
}
