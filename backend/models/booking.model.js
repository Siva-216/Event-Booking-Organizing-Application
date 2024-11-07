import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    EventId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Event',
        required : true
    },
    UserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    NoOfTickets :{
        type : Number,
        require : true
    },
    TotalAmount : {
        type : Number,
        required : true
    },
    Status : {
        type : String,
        enum : ['Pending','Confirmed', 'Cancelled'],
        default : 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
     updatedAt: {
        type: Date,
        default: Date.now
      }
});

export default mongoose.model('Booking', BookingSchema);