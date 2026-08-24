import express from 'express';
import { handleContactSubmission, checkHealth } from '../controllers/contactController.js';

const router = express.Router();

// Health check endpoint
router.get('/health', checkHealth);

// Contact form endpoint
router.post('/contact', handleContactSubmission);

export default router;
