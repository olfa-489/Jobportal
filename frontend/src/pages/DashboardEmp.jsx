import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Briefcase } from 'lucide-react';

const DashboardEmp = () => {
  const appliedJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Corp',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'Design Studio',
      status: 'Accepted',
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'Dev Solutions',
      status: 'Rejected',
    },
  ];

  const notifications = [
    {
      id: 1,
      message: 'Your application for Frontend Developer is under review.',
      time: '2 hours ago',
    },
    {
      id: 2,
      message: 'You have been accepted for the UI/UX Designer role!',
      time: '1 day ago',
    },
    {
      id: 3,
      message: 'Your application for Backend Developer was rejected.',
      time: '3 days ago',
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        className="bg-white shadow rounded-lg p-6 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Employee Dashboard
        </h1>
      </motion.div>

      {/* Applied Jobs Section */}
      <motion.div
        className="bg-white shadow rounded-lg p-6 flex flex-col"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <Briefcase className="w-6 h-6 mr-2 text-blue-600" /> Jobs You've
          Applied For
        </h2>
        <div className="space-y-4">
          {appliedJobs.length > 0 ? (
            appliedJobs.map((job) => (
              <div key={job.id} className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600">Company: {job.company}</p>
                <p
                  className={`text-sm font-semibold ${
                    job.status === 'Accepted'
                      ? 'text-green-600'
                      : job.status === 'Rejected'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  Status: {job.status}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              You haven't applied for any jobs yet.
            </p>
          )}
        </div>
      </motion.div>

      {/* Notifications Section */}
      <motion.div
        className="bg-white shadow rounded-lg p-6 flex flex-col"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <Bell className="w-6 h-6 mr-2 text-blue-600" /> Notifications
        </h2>
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="border-b pb-4">
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">You have no notifications.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardEmp;
