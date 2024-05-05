const db=require('../models');
const Event=db.event
const multer = require('multer');


const newEvent=async(req,res)=>{
    try {
    console.log(req.body);
    let info={
        idclubEvent:req.body.idclubEvent,
        clubName: req.body.clubName,
        eventType:req.body.eventType,
        eventName:req.body.eventName,
        eventDate:req.body.eventDate,
        eventSpeaker:req.body.eventSpeaker,
        eventContent:req.body.eventContent,
        eventPlace:req.body.eventPlace,
        eventSpecialService:req.body.eventSpecialService,
        eventImage: req.file ? req.file.path : null,
        eventTime:req.body.eventTime,
        eventApproval:req.body.eventApproval
    }
    const event=await Event.create(info);
    res.status(200).send(event);
    console.log(event);
}
catch (error) {
    console.error('Error fetching Events:', error);
    res.status(500).send('Internal Server Error');
}
}



const deleteEvent=async(req,res)=>{
    try {
    let id=req.params.id;
    await Event.destroy({where:{idclubEvent:id}});
    res.status(200).send('event is deleted')
    }
    catch (error) {
        console.error('Error fetching Events:', error);
        res.status(500).send('Internal Server Error');
    }
}




const updateEevnt=async(req,res)=>{
    try {
    let id=req.params.id;
    const event=await Event.update(req.body,{where:{idclubEvent:id}});
    res.status(200).send(event);
    }catch (error) {
        console.error('Error fetching Events:', error);
        res.status(500).send('Internal Server Error');
    }
}



const getAllEvents=async(req,res)=>{
    try {
        // Fetch all Events from the database
    const event = await Event.findAll({}); 
        // Function to chunk the clubs array into subarrays of 3 elements each
    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
        chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };
        // Chunk the clubs array
    const chunkedEvents = chunkArray(event, 3);
        // Send the chunked array as the response
    res.json(chunkedEvents);
    } catch (error) {
    console.error('Error fetching Events:', error);
    res.status(500).send('Internal Server Error');
    }
}




const getOneEvent=async(req,res)=>{
    try {
    let id=req.params.id
    const event=await Event.findOne({where:{idclubEvent:id}});
    res.status(200).send(event);
}catch (error) {
    console.error('Error fetching Events:', error);
    res.status(500).send('Internal Server Error');
    }
}


// Function to fetch events by club Name
const getEventsByClubName = async (req, res) => {
    try {
        // Get the club Name from the URL parameters
        const clubName = req.params.clubName;
        // Fetch events associated with the specified club Name
        const events = await Event.findAll({
            where: {
                clubName: clubName,
            },
        });
        // Send the events as the response
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events by club ID:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports={
    newEvent,
    deleteEvent,
    updateEevnt,
    getAllEvents,
    getOneEvent,
    getEventsByClubName
}
