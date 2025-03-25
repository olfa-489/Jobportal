import express from 'express';
import {
  getAnalyticsData,
  getDailyViewsData,
} from '../controllers/analytics.controller.js';

const router = express.Router();

router.get('/analytics', async (req, res) => {
  try {
    const data = await getAnalyticsData();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching analytics data', error: error.message });
  }
});

router.get('/daily-views', async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const data = await getDailyViewsData(
      new Date(startDate),
      new Date(endDate)
    );
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Error fetching daily views data',
        error: error.message,
      });
  }
});

export default router;
