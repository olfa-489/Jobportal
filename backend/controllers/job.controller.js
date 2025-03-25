import redis from '../lib/redis.js';
import cloudinary from '../lib/cloudinary.js';
import Job from '../models/job.model.js';

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}); // find all products
    res.json({ jobs });
  } catch (error) {
    console.log('Error in getAllJobs controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getFeaturedJobs = async (req, res) => {
  try {
    let featuredJobs = await redis.get('featured_jobs');
    if (featuredJobs) {
      return res.json(JSON.parse(featuredJobs));
    }

    // if not in redis, fetch from mongodb
    // .lean() is gonna return a plain javascript object instead of a mongodb document
    // which is good for performance
    featuredJobs = await Jobs.find({ isFeatured: true }).lean();

    if (!featuredJobs) {
      return res.status(404).json({ message: 'No featured jobs found' });
    }

    // store in redis for future quick access

    await redis.set('featured_jobs', JSON.stringify(featuredJobs));

    res.json(featuredJobs);
  } catch (error) {
    console.log('Error in getFeaturedJobs controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      category,
      company,
      date,
      status,
      image,
    } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: 'jobs',
      });
    }

    const job = await Job.create({
      title,
      description,
      location,
      salary,
      category,
      company,
      date,
      status,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : '',
    });

    res.status(201).json(job);
  } catch (error) {
    console.log('Error in createJob controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.image) {
      const publicId = job.image.split('/').pop().split('.')[0];
      try {
        await cloudinary.uploader.destroy(`jobs/${publicId}`);
        console.log('deleted image from cloudinary');
      } catch (error) {
        console.log('error deleting image from cloudinary', error);
      }
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.log('Error in deleteJob controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getRecommendedJobs = async (req, res) => {
  try {
    const jobs = await Job.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          image: 1,
          salary: 1,
        },
      },
    ]);

    res.json(jobs);
  } catch (error) {
    console.log('Error in getRecommendedJobs controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getJobByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const jobs = await Job.find({ category });
    res.json({ jobs });
  } catch (error) {
    console.log('Error in getJobsByCategory controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const toggleFeaturedJobs = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job) {
      job.isFeatured = !job.isFeatured;
      const updatedJob = await job.save();
      await updateFeaturedJobsCache();
      res.json(updatedJob);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.log('Error in toggleFeaturedJob controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

async function updateFeaturedJobsCache() {
  try {
    // The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

    const featuredJobs = await Job.find({ isFeatured: true }).lean();
    await redis.set('featured_jobs', JSON.stringify(featuredJobs));
  } catch (error) {
    console.log('error in update cache function');
  }
}