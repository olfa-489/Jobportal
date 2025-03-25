import React, { useState, useEffect } from 'react';
import { BarChart, PlusCircle, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

import AnalyticsTab from '../components/AnalyticsTab';
import CreateJobForm from '../components/CreateJobForm';
import JobsList from '../components/JobsList';
import { useJobStore } from '../stores/useJobStore';

const tabs = [
  { id: 'create', label: 'Create Job Offer', icon: PlusCircle },
  { id: 'jobs', label: 'Jobs', icon: Briefcase },
  { id: 'analytics', label: 'Analytics', icon: BarChart },
];

function RecruiterPage() {
  const [activeTab, setActiveTab] = useState('create');
  const { getAllJobs } = useJobStore();

  useEffect(() => {
    getAllJobs();
  }, [getAllJobs]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-300 text-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 py-16 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 rounded-lg shadow-lg">
        <motion.h1
          className="text-4xl font-extrabold text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Recruiter Dashboard
        </motion.h1>

        <div className="flex justify-center mb-8 space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-500 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-400 text-gray-200 hover:bg-blue-500'
              }`}
            >
              <tab.icon className="mr-3 h-5 w-5" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          {activeTab === 'create' && <CreateJobForm />}
          {activeTab === 'jobs' && <JobsList />}
          {activeTab === 'analytics' && <AnalyticsTab />}
        </div>
      </div>
    </div>
  );
}

export default RecruiterPage;
