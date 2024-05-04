const db = require('../models');
const Event = db.event;

const newEvent = async (req, res) => {
    try {
        const { clubName, eventType, eventName, eventDate, eventSpeaker, eventContent, eventPlace, eventSpecialService, eventImage, eventTime, eventApproval } = req.body;

        // Convert date and time fields appropriately
        const parsedDate = new Date(eventDate);
        const parsedTime = eventTime; // Adjust parsing method if needed

        const event = await Event.create({
            clubName,
            eventType,
            eventName,
            eventDate: parsedDate,
            eventSpeaker,
            eventContent,
            eventPlace,
            eventSpecialService,
            eventImage,
            eventTime: parsedTime,
            eventApproval
        });

        console.log('Event created:', event);
        res.status(200).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Internal Server Error');
    }
};


const deleteEvent = async (req, res) => {
    try {
        let id = req.params.id;
        await Event.destroy({ where: { idclubEvent: id } });
        res.status(200).send('Event is deleted');
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateEvent = async (req, res) => {
    try {
        let id = req.params.id;
        const event = await Event.update(req.body, { where: { idclubEvent: id } });
        res.status(200).send(event);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getAllEvents = async (req, res) => {
    try {
        // Fetch all Events from the database
        const events = await Event.findAll({});
        // Function to chunk the events array into subarrays of 3 elements each
        const chunkArray = (array, size) => {
            const chunkedArr = [];
            for (let i = 0; i < array.length; i += size) {
                chunkedArr.push(array.slice(i, i + size));
            }
            return chunkedArr;
        };
        // Chunk the events array
        const chunkedEvents = chunkArray(events, 3);
        // Send the chunked array as the response
        res.json(chunkedEvents);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getOneEvent = async (req, res) => {
    try {
        let id = req.params.id;
        const event = await Event.findOne({ where: { idclubEvent: id } });
        res.status(200).send(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    newEvent,
    deleteEvent,
    updateEvent,
    getAllEvents,
    getOneEvent
};
