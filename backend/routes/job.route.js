import express from 'express';
import {
  createJob,
  getAllJobs,
  getFeaturedJobs,
  deleteJob,
  getRecommendedJobs,
  getJobByCategory,
  toggleFeaturedJobs,
} from '../controllers/job.controller.js';
import { recruiterRoute, protectRoute } from '../middlware/auth.middlware.js';

const router = express.Router();

router.get('/', protectRoute, recruiterRoute, getAllJobs);
router.get('/featured', getFeaturedJobs);
router.get('/category/:category', getJobByCategory);
router.get('/recommandations', protectRoute, getRecommendedJobs);
router.post('/', protectRoute, recruiterRoute, createJob);
router.patch('/:id', protectRoute, recruiterRoute, toggleFeaturedJobs);
router.delete('/:id', protectRoute, recruiterRoute, deleteJob);

export default router;
