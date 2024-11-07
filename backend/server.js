import express from "express";
import dotenv from "dotenv"
import EventRoutes from "./routes/Event.routes.js"
import AuthRoutes from './routes/User.routes.js'
import BookingRoutes from './routes/Booking.routes.js';
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from "cors"
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use('/api/auth',AuthRoutes);
app.use('/api/event',EventRoutes);
app.use('/api/booking',BookingRoutes);

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Backend runs successfully on port ${PORT}`);
});