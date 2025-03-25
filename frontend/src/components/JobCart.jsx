import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Briefcase } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';

const JobCart = ({ job }) => {
  const { user } = useUserStore(); // Access user authentication state
  const navigate = useNavigate(); // React Router navigation hook

  const handleApplication = () => {
    if (!user) {
      // Show a toast notification and redirect to the login page
      toast.error('Please login to apply for this job', { id: 'login' });
      navigate('/login'); // Redirect to the login page
    } else {
      // Navigate to the application page if the user is logged in
      navigate('/applypage', { state: { jobId: job.id } });
    }
  };

  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-blue-500 shadow-lg">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img className="object-cover w-full" src={job.image} alt="job image" />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {job.title}
        </h5>
        <p className="text-gray-300">{job.company}</p>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-blue-400">
              dt{job.salary}
            </span>{' '}
            / month
          </p>
        </div>
        <button
          className="flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handleApplication}
        >
          <Briefcase size={22} className="mr-2" />
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCart;
