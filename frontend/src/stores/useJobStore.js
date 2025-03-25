import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

export const useJobStore = create((set) => ({
  jobs: [],
  loading: false,

  setjobs: (jobs) => set({ jobs }),
  createJob: async (jobData) => {
    set({ loading: true });
    try {
      const res = await axios.post('/jobs', jobData);
      set((prevState) => ({
        jobs: [...prevState.jobs, res.data],
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },
  getAllJobs: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('/jobs');
      set({ jobs: response.data.jobs, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch jobs', loading: false });
      toast.error(error.response.data.error || 'Failed to fetch jobs');
    }
  },
  getJobByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/jobs/category/${category}`);
      set({ jobs: response.data.jobs, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch jobs', loading: false });
      toast.error(error.response.data.error || 'Failed to fetch jobs');
    }
  },
  deleteJob: async (jobId) => {
    set({ loading: true });
    try {
      await axios.delete(`/jobs/${jobId}`);
      set((prevjobs) => ({
        jobs: prevjobs.jobs.filter((job) => job._id !== jobId),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || 'Failed to delete job');
    }
  },
}));
