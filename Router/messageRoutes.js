import express from 'express';
import { getAllMessages, sendMessage, deleteMessage } from '../Controller/messageController.js';
import { isAuthenticated } from '../Middlewares/auth.js';

const router = express.Router();

router.post("/send", sendMessage); 
router.get("/getall", getAllMessages); 
router.delete("/delete/:id", isAuthenticated, deleteMessage);  //Banda Authenticated hona chahiye Delete karne ke leye

export default router;