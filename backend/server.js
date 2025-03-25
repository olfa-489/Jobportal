import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import jobsRoutes from './routes/job.route.js';
import analyticsRoutes from './routes/analytics.route.js';
import applicationsRoutes from './routes/condidature.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); //allows us to parse body of the request

app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});
app.listen(5000, () => {
  console.log('server is running on http://localhost:' + PORT);
  connectDB();
});
