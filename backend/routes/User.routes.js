import express from 'express';
import { getAllUser, login, logout, signup, UpdateUser } from '../controller/UserController.js';

const router = express.Router();

router.get('/login/:userName/:Password', login);
router.post('/signup',signup);
router.post('/logout',logout);
router.get('/AllUsers',getAllUser);
router.put('/Update/:userId',UpdateUser);

export default router;