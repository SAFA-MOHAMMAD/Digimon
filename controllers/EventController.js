const db=require('../models');
const Event=db.event

const newEvent=async(req,res)=>{
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
        eventImage:req.body.eventImage,
        eventTime:req.body.eventTime,
        eventApproval:req.body.eventApproval
    }
    const event=await Event.create(info);
    res.status(200).send(event);
    console.log(event);
}

const deleteEvent=async(req,res)=>{
    let id=req.params.id;
    await Event.destroy({where:{idclubEvent:id}});
    res.status(200).send('event is deleted')
}


const updateEevnt=async(req,res)=>{
    let id=req.params.id;
    const event=await Event.update(req.body,{where:{idclubEvent:id}});
    res.status(200).send(event);
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
module.exports={
    newEvent,
    deleteEvent,
    updateEevnt,
    getAllEvents
}
