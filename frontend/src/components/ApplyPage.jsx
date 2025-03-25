import React, { useState } from 'react';
import { useApplicationStore } from '../stores/useApplicationStore';
import toast from 'react-hot-toast';

const ApplyPage = () => {
  const { createApplication, loading } = useApplicationStore();
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    email: '',
    jobId: '',
    coverLetter: '',
    cvpath: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({ ...applicationData, [name]: value });
  };

  const handleFileChange = (e) => {
    setApplicationData({ ...applicationData, cv: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !applicationData.fullName ||
      !applicationData.email ||
      !applicationData.jobId
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('jobId', applicationData.jobId);
    formData.append('fullName', applicationData.fullName);
    formData.append('email', applicationData.email);
    formData.append('coverLetter', applicationData.coverLetter);
    formData.append('cv', applicationData.cv);

    try {
      await createApplication(formData);
      toast.success('Your candidature was sent successfully');
      setApplicationData({
        jobId: '',
        fullName: '',
        email: '',
        coverLetter: '',
        cvpath: null,
      });
    } catch (error) {
      toast.error('Failed to submit your candidature. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold text-blue-600 mb-6">
        Apply for a Job
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={applicationData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={applicationData.email}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cover Letter
          </label>
          <textarea
            name="coverLetter"
            value={applicationData.coverLetter}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            CV (PDF or DOCX)
          </label>
          <input
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default ApplyPage;
