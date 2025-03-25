import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CategoryItem from '../components/CategoryItem';
import { useJobStore } from '../stores/useJobStore';

const categories = [
  { href: '/Engineering', name: 'Engineering', imageUrl: '/engineer.jpg' },
  {
    href: '/construction',
    name: 'construction',
    imageUrl: '/construction.jpg',
  },
  {
    href: '/web development',
    name: 'web development',
    imageUrl: '/webdevelopment.jpg',
  },
  { href: '/Healthcare', name: 'Healthcare', imageUrl: '/sante.jpg' },
  { href: '/finance', name: 'Finance', imageUrl: '/commerce.jpg' },
  { href: '/education', name: 'Education', imageUrl: '/education.jpg' },
  { href: '/marketing', name: 'Marketing', imageUrl: '/bg.jpg' },
  { href: '/Industry', name: 'Industry', imageUrl: '/industrie.jpg' },
  { href: '/Architecture', name: 'Architecture', imageUrl: '/archi.jpg' },
  { href: '/Graphic Design', name: 'Graphic Design', imageUrl: '/design.jpg' },
];

const forums = [
  {
    title: 'Latest Engineering Discussions',
    link: '/forums/engineering',
    imageUrl: '/forums/engineer.jpg',
  },
  {
    title: 'Web Development Trends',
    link: '/forums/web-development',
    imageUrl: '/forums/webdev.jpg',
  },
  {
    title: 'Healthcare Advancements',
    link: '/forums/healthcare',
    imageUrl: '/forums/healthcare.jpg',
  },
];

const news = [
  {
    title: 'Breaking: New Technology for Finance',
    link: '/news/finance',
    imageUrl: '/news/finance.jpg',
  },
  {
    title: 'Construction Industry Growth in 2025',
    link: '/news/construction',
    imageUrl: '/news/construction.jpg',
  },
  {
    title: 'New Trends in Marketing for 2025',
    link: '/news/marketing',
    imageUrl: '/news/marketing.jpg',
  },
];

function HomePage() {
  const { jobs, isLoading } = useJobStore();
  const [showForums, setShowForums] = useState(false);
  const [showNews, setShowNews] = useState(false);

  useEffect(() => {
    setShowForums(true);
    setShowNews(true);
  }, []);

  return (
    <div className="relative min-h-screen text-blue-800 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-blue-500 mb-4">
          Explore New Opportunities
        </h1>
        <p className="text-center text-xl text-blue-400 mb-12">
          A world of opportunities, a career for you.
        </p>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {/* Forums Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: showForums ? 1 : 0, x: showForums ? 0 : -100 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold text-blue-500 mb-4">Forums</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {forums.map((forum) => (
              <motion.div
                key={forum.title}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <a href={forum.link}>
                  <img
                    src={forum.imageUrl}
                    alt={forum.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-blue-700">
                      {forum.title}
                    </h3>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* News Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: showNews ? 1 : 0, x: showNews ? 0 : -100 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold text-blue-500 mb-4">News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((newsItem) => (
              <motion.div
                key={newsItem.title}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <a href={newsItem.link}>
                  <img
                    src={newsItem.imageUrl}
                    alt={newsItem.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-blue-700">
                      {newsItem.title}
                    </h3>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Job Listings */}
        {!isLoading && jobs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-blue-500 mb-4">
              Latest Job Listings
            </h2>
            <div className="space-y-4">
              {/* Map over jobs and display them */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
