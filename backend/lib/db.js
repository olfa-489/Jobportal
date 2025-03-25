import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB);
    console.log('Database is connected !');
  } catch (error) {
    console.log('error connecting to monhodb', error.message);
    process.exit(1);
  }
};
