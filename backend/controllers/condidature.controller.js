import Application from '../models/condidature.model.js';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Set up storage for CV attachments
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  },
});

// File filter to allow only PDF or DOCX files
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and DOCX files are allowed'), false);
  }
};

// Initialize multer with storage and file type filtering
const upload = multer({ storage, fileFilter }).single('cv');

// Controller function to handle job application submission
export const createApplication = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: err.message || 'File upload failed' });
    }

    try {
      const { fullName, email, jobId, coverLetter } = req.body;

      if (!fullName || !email || !jobId || !req.file) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }

      const newApplication = new Application({
        jobId,
        fullName,
        email,
        coverLetter,
        cvPath: req.file.path,
      });

      await newApplication.save();

      res.status(200).json({
        message: 'Your candidature was sent successfully',
        applicationId: newApplication._id,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
};
// Get a specific application by ID or all applications if no ID is specified
export const getApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    if (applicationId) {
      // Fetch a single application by ID
      const application = await Application.findById(applicationId);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.status(200).json(application);
    } else {
      // Fetch all applications
      const applications = await Application.find();
      res.status(200).json(applications);
    }
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
