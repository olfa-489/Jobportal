import express from 'express';
import {
  getApplication,
  createApplication,
} from '../controllers/condidature.controller.js';

const router = express.Router();

// Route to submit a new application
router.post('/', createApplication);

// Route to get an application by ID or all applications
router.get('/applications/:applicationId?', getApplication);

export default router;
