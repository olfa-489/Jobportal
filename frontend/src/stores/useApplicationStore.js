import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

export const useApplicationStore = create((set) => ({
  applications: [], // Array to store application data
  loading: false, // Loading state

  // Set applications directly
  setApplications: (applications) => set({ applications }),

  // Fetch all applications
  getAllApplications: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('/applications');
      set({ applications: response.data.applications, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.error || 'Failed to fetch applications'
      );
    }
  },

  // Create a new application
  createApplication: async (applicationData) => {
    set({ loading: true });
    try {
      const response = await axios.post('/applications', applicationData);
      set((prevState) => ({
        applications: [...prevState.applications, response.data],
        loading: false,
      }));
      toast.success('Application created successfully!');
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.error || 'Failed to create application'
      );
    }
  },

  // Delete an application
  deleteApplication: async (applicationId) => {
    set({ loading: true });
    try {
      await axios.delete(`/applications/${applicationId}`);
      set((prevState) => ({
        applications: prevState.applications.filter(
          (app) => app._id !== applicationId
        ),
        loading: false,
      }));
      toast.success('Application deleted successfully!');
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.error || 'Failed to delete application'
      );
    }
  },

  // Update an existing application
  updateApplication: async (applicationId, updatedData) => {
    set({ loading: true });
    try {
      const response = await axios.put(
        `/applications/${applicationId}`,
        updatedData
      );
      set((prevState) => ({
        applications: prevState.applications.map((app) =>
          app._id === applicationId ? response.data : app
        ),
        loading: false,
      }));
      toast.success('Application updated successfully!');
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.error || 'Failed to update application'
      );
    }
  },
}));
