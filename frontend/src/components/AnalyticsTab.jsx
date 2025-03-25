import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import { Users, Briefcase, DollarSign, FileText } from 'lucide-react'; // Icons related to jobs
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    totalHires: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailyApplicationsData, setDailyApplicationsData] = useState([]);

  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const response = await axios.get('/job-analytics'); // Adjusted API path
        setAnalyticsData(response.data.analyticsData);
        setDailyApplicationsData(response.data.dailyApplicationsData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getAnalyticsData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Jobs"
          value={analyticsData.totalJobs.toLocaleString()}
          icon={Briefcase}
          color="from-blue-300 to-blue-500"
        />
        <AnalyticsCard
          title="Total Applicants"
          value={analyticsData.totalApplicants.toLocaleString()}
          icon={Users}
          color="from-sky-400 to-blue-600"
        />
        <AnalyticsCard
          title="Total Hires"
          value={analyticsData.totalHires.toLocaleString()}
          icon={FileText}
          color="from-blue-500 to-sky-700"
        />
      </div>
      <motion.div
        className="bg-white rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailyApplicationsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#3B82F6" />
            <YAxis yAxisId="left" stroke="#3B82F6" />
            <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="applications"
              stroke="#2563EB"
              activeDot={{ r: 8 }}
              name="Applications"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="hires"
              stroke="#60A5FA"
              activeDot={{ r: 8 }}
              name="Hires"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};
export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`bg-white rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-blue-600 text-sm mb-1 font-semibold">{title}</p>
        <h3 className="text-blue-800 text-3xl font-bold">{value}</h3>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-400 opacity-20" />
    <div className="absolute -bottom-4 -right-4 text-blue-300 opacity-50">
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);
