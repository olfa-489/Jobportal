import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Upload, Loader } from 'lucide-react';
import { useJobStore } from '../stores/useJobStore';

const categories = [
  'Engineering',
  'Construction',
  'Healthcare',
  'Finance',
  'Education',
  'Graphic Design',
  'Architecture',
  'Industry',
];

const CreateJobForm = () => {
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    category: '',
    company: '',
    image: '',
    status: '',
    isFeatured: false,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const { createJob, loading } = useJobStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob(newJob);
      setSuccessMessage('Job posted successfully!');
      setNewJob({
        title: '',
        description: '',
        location: '',
        salary: '',
        category: '',
        company: '',
        image: '',
        status: '',
        isFeatured: false,
      });
    } catch {
      console.log('Error creating job listing');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewJob({ ...newJob, image: reader.result });
      };
      reader.readAsDataURL(file); // base64
    }
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-blue-500">
        Post a New Job
      </h2>

      {successMessage && (
        <div className="mb-4 text-green-600 font-medium">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-800"
          >
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-800"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newJob.description}
            onChange={(e) =>
              setNewJob({ ...newJob, description: e.target.value })
            }
            rows="3"
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-800"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="salary"
            className="block text-sm font-medium text-gray-800"
          >
            Salary
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={newJob.salary}
            onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
            step="0.01"
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-800"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newJob.category}
            onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-800"
          >
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-800"
          >
            Status
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={newJob.status}
            onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-100 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Company Logo
          </label>
          {newJob.image && (
            <span className="ml-3 text-sm text-gray-500">Logo uploaded</span>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isFeatured"
            checked={newJob.isFeatured}
            onChange={(e) =>
              setNewJob({ ...newJob, isFeatured: e.target.checked })
            }
            className="mr-2"
          />
          <label
            htmlFor="isFeatured"
            className="text-sm font-medium text-gray-800"
          >
            Feature this job
          </label>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Post Job
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateJobForm;
