import { useEffect } from 'react';
import { useJobStore } from '../stores/useJobStore';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import JobCart from '../components/JobCart';

const CategoryPage = () => {
  const { getJobByCategory, jobs, loading, error } = useJobStore();
  const { category } = useParams();

  useEffect(() => {
    getJobByCategory(category);
  }, [getJobByCategory, category]);

  return (
    <div className="min-h-screen bg-white text-blue-600">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>

        {loading && (
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl text-blue-500">Loading jobs...</h2>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl text-blue-500">
              Error loading jobs. Please try again later.
            </h2>
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {jobs?.length === 0 && (
            <h2 className="text-3xl font-semibold text-blue-400 text-center col-span-full">
              No Jobs found
            </h2>
          )}

          {jobs?.map((job) => (
            <JobCart key={job._id} job={job} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;
