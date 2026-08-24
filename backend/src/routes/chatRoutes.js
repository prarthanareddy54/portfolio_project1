import express from 'express';
import { handleChatMessage } from '../controllers/chatController.js';

const router = express.Router();

// Chatbot endpoint
router.post('/chat', handleChatMessage);

export default router;
