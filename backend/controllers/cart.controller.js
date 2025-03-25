import Job from '../models/job.model.js';

export const getCartJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ _id: { $in: req.user.cartItems } });

    // add quantity for each product
    const cartItems = jobs.map((job) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id === job.id
      );
      return { ...job.toJSON(), quantity: item.quantity };
    });

    res.json(cartItems);
  } catch (error) {
    console.log('Error in getCartJobs controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { jobId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id === jobId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(jobId);
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log('Error in addToCart controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { jobId } = req.body;
    const user = req.user;
    if (!jobId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== jobId);
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateNbPosts = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const { NbPosts } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id === jobId);

    if (existingItem) {
      if (NbPosts === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== jobId);
        await user.save();
        return res.json(user.cartItems);
      }

      existingItem.NbPosts = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.log('Error in updateNbPosts controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
