const db = require('../models');
const Club = db.club;
const multer = require('multer');
const Sequelize=require('sequelize');
const { Op } = require('sequelize'); // Import Sequelize operators



const newClub = async (req, res) => {
    try {
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
            clubLogo:  req.file ? req.file.path : null
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
};




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



const getOneClub=async(req,res)=>{
    let id=req.params.id
    const club=await Club.findOne({where:{clubID:id}});
    res.status(200).send(club);
}



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

const searchForClub = async (req, res) => {
    try {
        // Retrieve the search query from the request's query parameters
        const query = req.params.key;
        console.log('Search query:', query);
        // if (!searchTerm) {
        //     return res.status(400).json({ error: 'Query parameter q is required' });
        // }
        // Perform a search in the database
        const results = await Club.findAll({
            where: {
                clubName: {
                    [Sequelize.Op.like]: `%${query}%`
                }
                // Add more fields to search by as needed
            }
        });
        console.log('Search results:', results);

        // Send the search results as a JSON response
        res.json(results);
    } catch (error) {
        console.error('Error handling search request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports={
    newClub,
    getAllClubs,
    getOneClub,
    deleteClub,
    updateClub,
    searchForClub
}
