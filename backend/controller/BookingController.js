import bookingModel from "../models/booking.model.js";
import Booking from "../models/booking.model.js";
import eventModel from "../models/event.model.js";
import userModel from "../models/user.model.js"

export const getAllBookings = async(req,res)=>{
    try{
        const bookings = await Booking.find();
        return res.status(200).json(bookings);
    }
    catch(error){
        console.error("Booking Get all error:", error);
        res.status(500).json({ error: error.message });
    }
};


export const getByEvent = async(req,res)=>{
    try{
        const bookings = await Booking.find({ EventId : req.params.eventId });
        if(bookings.length ==0 ){
            return res.status(404).json({ message: 'No Bookings found' });
        }
        return res.status(200).json({ bookings });
    }
    catch(error){
        console.error("Booking Get by Event error:", error);
        res.status(500).json({ error: error.message });
    }
};


export const getByUser = async (req, res) => {
    try {
        const bookings = await bookingModel.find({ UserId: req.params.userId });
        
        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No Bookings found' });
        }
        
        return res.status(200).json({ bookings });
    } catch (error) {
        console.error("Booking Get by User error:", error);
        res.status(500).json({ error: error.message });
    }
};



export const createBooking = async (req, res) => {
    try {
      const { NoOfTickets } = req.body;
      const { userId, eventId } = req.params;

      const event = await eventModel.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      if (event.AvailableTickets < NoOfTickets) {
        return res.status(400).json({ message: 'Not enough tickets available' });
      }
  
      const TotalAmount = NoOfTickets * event.EventPrice;

      const booking = new Booking({
        NoOfTickets,
        TotalAmount,
        EventId: eventId,
        UserId: userId,
      });
  
      await booking.save();
  
      event.AvailableTickets =event.AvailableTickets -  NoOfTickets;
      await event.save();
  
      return res.status(201).json({
        message: 'Booking created successfully',
        booking,
      });
    } catch (error) {
      console.error('Booking Create error:', error);
      return res.status(500).json({ error: error.message });
    }
  };
  

// export const updateBooking = async(req,res)=>{
//     try{
//         const booking = await Booking.findByIdAndUpdate(req.params.bookingId, req.body, { new: true });
//         if(!booking)
//             return res.status(404).json({ message: 'Booking not found' });
//         return res.status(200).json({ booking });
//     }
//     catch(error){
//         console.error("Booking Update error:", error);
//         res.status(500).json({ error: error.message });
//     }
// };


export const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookId); // Use findById instead of find
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const tickets = booking.NoOfTickets;

        // Update the event's available tickets
        const event = await eventModel.findByIdAndUpdate(
            booking.EventId,
            { $inc: { AvailableTickets: tickets } },
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Remove the booking
        await Booking.deleteOne({ _id: req.params.bookId });

        return res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error("Booking Delete error:", error);
        res.status(500).json({ error: error.message });
    }
};
