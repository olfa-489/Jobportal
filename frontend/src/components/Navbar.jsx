import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Lock,
  Briefcase,
  Bell,
  UserPlus,
  LogIn,
  LogOut,
  Search,
} from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isRecruiter = user?.role === 'Recruiter';
  const isEmployee = user?.role === 'Employee';
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-40 border-b border-blue-500">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 flex items-center space-x-2"
        >
          Choufli-Khedma
        </Link>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-80 px-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button className="absolute right-3 top-2 text-gray-600">
            <Search size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className={`px-4 py-2 rounded-md font-medium transition duration-300 ease-in-out ${
              location.pathname === '/'
                ? 'text-blue-500 font-semibold'
                : 'text-gray-800 hover:text-blue-500'
            }`}
          >
            Home
          </Link>

          {isRecruiter && (
            <Link
              to="/dashboard"
              className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium flex items-center transition duration-300 ease-in-out hover:bg-blue-600"
            >
              <Briefcase className="mr-2" size={20} />
              <span className="hidden sm:inline">Recruiter Dashboard</span>
            </Link>
          )}

          {isEmployee && (
            <Link
              to="/dashboard"
              className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium flex items-center transition duration-300 ease-in-out hover:bg-blue-600"
            >
              <Bell className="mr-2" size={20} />
              <span className="hidden sm:inline">Employee Dashboard</span>
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center transition duration-300 ease-in-out"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline ml-2">Log Out</span>
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <UserPlus className="mr-2" size={20} />
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <LogIn className="mr-2" size={20} />
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
