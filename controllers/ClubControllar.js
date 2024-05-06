const db = require('../models');
const Club = db.club;
const multer = require('multer');




const newClub = async (req, res) => {
    try {
        let info = {
            clubName: req.body.clubName,
            clubPresident: req.body.clubPresident,
            clubVicePresident: req.body.clubVicePresident,
            clubOfficialEmail: req.body.clubOfficialEmail,
            clubPresidentEmail: req.body.clubPresidentEmail,
            clubVicePresidentEmail: req.body.clubVicePresidentEmail,
            clubDescription: req.body.clubDescription,
            clubActivitiesInfo: req.body.clubActivitiesInfo,
            clubLogo: req.file ? req.file.path : null // Ensure that the 'file' is the name in your form
        };
        const club = await Club.create(info);
        res.status(200).send(club);
        console.log('Club created:', club);
    } catch (error) {
        console.error('Error creating club:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getAllClubs = async (req, res) => {
    try {
        const clubs = await Club.findAll({});
        res.json(clubs);
    } catch (error) {
        console.error('Error fetching clubs:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getOneClub = async (req, res) => {
    try {
        const club = await Club.findOne({ where: { clubID: req.params.id } });
        if (club) {
            res.status(200).send(club);
        } else {
            res.status(404).send('Club not found');
        }
    } catch (error) {
        console.error('Error fetching club:', error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteClub = async (req, res) => {
    try {
        const id = req.params.id;
        await Club.destroy({ where: { clubID: id } });
        res.status(200).send('Club is deleted');
    } catch (error) {
        console.error('Error deleting club:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateClub = async (req, res) => {
    try {
        const id = req.params.id;
        const club = await Club.update(req.body, { where: { clubID: id } });
        res.status(200).send(club);
    } catch (error) {
        console.error('Error updating club:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    newClub,
    getAllClubs,
    getOneClub,
    deleteClub,
    updateClub
};