import express from 'express';
import { CreateEvent, DeleteEvent, GetAllEvents, GetEventById, GetEventsByUserId, UpdateEvent } from '../controller/EventController.js';

const router = express.Router();

router.get('/get/:eventId',GetEventById);
router.get('/getAll',GetAllEvents);
router.post('/create/:userId',CreateEvent);
router.put('/update/:eventId',UpdateEvent);
router.delete('/delete/:eventId',DeleteEvent);
router.get('/getByUser/:userId',GetEventsByUserId);

export default router;