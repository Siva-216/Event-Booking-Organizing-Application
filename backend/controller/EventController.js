import Event from "../models/event.model.js";

export const CreateEvent = async(req,res)=>{
    try{
        const {EventName , EventType , EventDescription ,EventDate , EventVenue , EventPrice,EventPic,AvailableTickets} = req.body;
        const newEvent = new Event({
            EventName,
            EventType,
            EventDescription,
            EventDate,
            EventVenue,
            EventPrice,
            EventPic,
            AvailableTickets,
            OrganizerId : req.params.userId
        });
        if(!newEvent){
            console.error("Event creation error:", newUser);
            return res.status(500).json({ error: 'Failed to create new event' });
        }
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully!', newEvent });
    }
    catch(error){
        console.error("Event Create error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const GetAllEvents = async(req,res)=>{
    try{
        const events = await Event.find();
        res.status(200).json({ events });
    }
    catch(error){
        console.error("Event Get all error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const GetEventById = async(req,res)=>{
    try{
        const event = await Event.findById(req.params.eventId);
        if(!event){
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ event });
    }
    catch(error){
        console.error("Event GetById error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const UpdateEvent = async(req,res)=>{
    try{
        const upEvent = await Event.findByIdAndUpdate(req.params.eventId,req.body,{new : true});
        if(!upEvent){
            return res.status(404).json({message:'Event not found'});
        }
        return res.status(200).json({upEvent});
    }
    catch(error){
        console.error("Event Update error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const DeleteEvent = async(req,res)=>{
    try{
        const DelEvent = await Event.findByIdAndDelete(req.params.eventId);
        if(!DelEvent){
            return res.status(404).json({message:'Event Delete Error'});
        }
        return res.status(200).json({DelEvent});
    }
    catch(error){
        console.error("Event Delete error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const GetEventsByUserId = async(req,res)=>{
    try{
        const events = await Event.find({OrganizerId : req.params.userId});
        if(events.length === 0)
        {
            return res.status(404).json({ message: 'No Events found' });
        }
        return res.status(200).json({events});

    }
    catch(error)
    {
        console.error("Event GetByUserId error:", error);
        res.status(500).json({ error: error.message });
    }
};