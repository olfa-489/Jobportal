import { motion } from 'framer-motion';
import { Trash, Star } from 'lucide-react';
import { useJobStore } from '../stores/useJobStore'; // Assuming you have a store for jobs

const JobsList = () => {
  const { deleteJob, jobs } = useJobStore(); // Use your job store here

  const toggleFeaturedJob = (jobId) => {
    // Handle toggling the "featured" state for the job
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full divide-y divide-blue-300">
        <thead className="bg-blue-500">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Job Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Salary
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Featured
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-blue-200">
          {jobs?.map((job) => (
            <tr
              key={job._id}
              className="hover:bg-blue-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {job.title}
                    </div>
                    <div className="text-sm text-gray-500">{job.company}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  ${job.salary.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{job.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleFeaturedJob(job._id)}
                  className={`p-1 rounded-full ${
                    job.isFeatured
                      ? 'bg-yellow-400 text-gray-900'
                      : 'bg-gray-300 text-gray-500'
                  } hover:bg-yellow-500 transition-colors duration-200`}
                >
                  <Star className="h-5 w-5" />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => deleteJob(job._id)}
                  className="text-red-600 hover:text-red-500"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default JobsList;
