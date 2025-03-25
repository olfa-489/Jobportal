import Application from '../models/condidature.model.js';
import Job from '../models/job.model.js';
import User from '../models/user.model.js';

export const getAnalyticsData = async () => {
  const totalUsers = await User.countDocuments();
  const totalJobs = await Job.countDocuments();

  const viewData = await Application.aggregate([
    {
      $group: {
        _id: null, // Group all documents together
        totalViews: { $sum: '$views' }, // Sum up the "views" field across all orders
      },
    },
  ]);

  const { totalViews } = viewData[0] || {
    totalViews: 0,
  };

  return {
    users: totalUsers,
    products: totalJobs,
    totalViews,
  };
};

export const getDailyViewsData = async (startDate, endDate) => {
  try {
    const dailyViewsData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          views: { $sum: '$views' }, // Sum up the "views" for each day
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dateArray = getDatesInRange(startDate, endDate);

    return dateArray.map((date) => {
      const foundData = dailyViewsData.find((item) => item._id === date);

      return {
        date,
        views: foundData?.views || 0,
      };
    });
  } catch (error) {
    throw error;
  }
};

function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
