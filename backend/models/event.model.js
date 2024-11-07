import  mongoose  from "mongoose";

const EventSchema = mongoose.Schema({
    EventName : {
        type : String,
        required : true
    },
    EventType : {
        type : String,
        required : true
    },
    EventDescription : {
        type : String,
        required : true
    },
    EventDate : {
        type : Date,
        required : true
    },
    EventVenue : {
        type : String,
        required : true
    },
    EventPrice : {
        type : Number,
        required : true
    },
    EventPic : {
        type : String,
        required : true
    },
    AvailableTickets :{
        type : Number,
        required : true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    OrganizerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
});

export default mongoose.model('Event', EventSchema);