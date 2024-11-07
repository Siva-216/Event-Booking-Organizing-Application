import express from "express";
import { createBooking, deleteBooking, getAllBookings, getByEvent, getByUser} from "../controller/BookingController.js";

const router = express.Router();

router.get('/getAll',getAllBookings);
router.get('/getbyEvents/:eventId',getByEvent);
router.get('/getbyUsers/:userId',getByUser);
router.post('/create/:userId/:eventId',createBooking);
// router.put('/update/:bookId',updateBooking);
router.delete('/delete/:bookId',deleteBooking);

export default router;