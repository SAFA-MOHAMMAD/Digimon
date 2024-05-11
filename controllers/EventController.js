const db=require('../models');
const Event=db.event
const multer = require('multer');
const { Op, where } = require('sequelize'); // Import Sequelize operators


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
    const event=await Event.findOne({where:{idclubEvent:id}});
    let info={
        idclubEvent:event.idclubEvent,
        clubName: req.body.clubName,
        eventType:req.body.eventType,
        eventName:req.body.eventName,
        eventDate:req.body.eventDate,
        eventSpeaker:req.body.eventSpeaker,
        eventContent:req.body.eventContent,
        eventPlace:req.body.eventPlace,
        eventSpecialService:req.body.eventSpecialService,
        eventImage: req.file ? req.file.path : event.eventImage,
        eventTime:req.body.eventTime,
        eventApproval:req.body.eventApproval
    }
    await Event.update(info,{where:{idclubEvent:id}});
    const updatedEvent = await Event.findOne({ where: { idclubEvent: id } });

    res.status(200).send(updatedEvent);
    }catch (error) {
        console.error('Error fetching Events:', error);
        res.status(500).send('Internal Server Error');
    }
}


const approveEvent=async(req,res)=>{
    try {
        // Get the event ID and the approval status from the request
        const eventId = req.params.id; // Event ID from URL parameters
        const { eventApproval } = req.body; // Approval status from request body

        // Find the event by its ID
        const event = await Event.findOne({ where: { idclubEvent: eventId } });

        if (!event) {
            // If the event is not found, respond with a 404 Not Found error
            return res.status(404).json({ error: 'Event not found' });
        }

        // Update the event's approval status
        event.eventApproval = eventApproval;

        // Save the changes to the database
        await event.save();

        // Respond with a success message
        res.status(200).json({ message: 'Event approval status updated successfully', event });
    } catch (error) {
        console.error('Error updating event approval:', error);
        // Respond with a 500 Internal Server Error message
        res.status(500).json({ error: 'Internal Server Error' });
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



const getAllNotAproveEvents=async(req,res)=>{
    try {
        // Fetch all Events from the database
    const events = await Event.findAll({where:{eventApproval: false}}); 
        // Function to chunk the clubs array into subarrays of 3 elements each
        res.json(events);
    } catch (error) {
    console.error('Error fetching Events:', error);
    res.status(500).send('Internal Server Error');
    }
}

const getUpcomingEvents = async (req, res) => {
    try {
        // Get the current date
        const currentDate = new Date();
        
        // Calculate the date 7 days from now
        const nextWeekDate = new Date();
        nextWeekDate.setDate(currentDate.getDate() + 7);
        // Query the database for events that will happen in the next 7 days
        const upcomingEvents = await Event.findAll({
            where: {
                eventDate: {
                    [Op.between]: [currentDate, nextWeekDate] // Filter events by date range
                }
            }
        });

        // Send the events as a JSON response
        res.json(upcomingEvents);
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


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
                eventApproval: true,
            },
        });
        // Send the events as the response
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events by club ID:', error);
        res.status(500).send('Internal Server Error');
    }
};
const getNotAprovesEventsByClubName = async (req, res) => {
    try {
        // Get the club Name from the URL parameters
        const clubName = req.params.clubName;
        // Fetch events associated with the specified club Name
        const events = await Event.findAll({
            where: {
                clubName: clubName,
                eventApproval: false,
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
    getNotAprovesEventsByClubName,
    approveEvent,
    getAllNotAproveEvents,
    getUpcomingEvents,
    getOneEvent,
    getEventsByClubName
}
