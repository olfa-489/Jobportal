import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from './stores/useUserStore';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import RecruiterPage from './pages/RecruiterPage';
import CategoryPage from './pages/CategoryPage';
import SuccessPage from './pages/SuccessPage';
import ApplyPage from './components/ApplyPage';
import Navbar from './components/Navbar';
import DashboardEmp from './pages/DashboardEmp';

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  // Ensure authentication state is checked on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <div>Loading...</div>; // Display a loading state while checking authentication
  }

  return (
    <div className="min-h-screen bg-white text-blue-900 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.3)_0%,rgba(37,99,235,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>

      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/signup"
            element={
              !user ? (
                <SignUpPage />
              ) : (
                <Navigate
                  to={
                    user.role === 'Recruiter' ? '/recruiterpage' : '/dashboard'
                  }
                />
              )
            }
          />
          <Route
            path="/login"
            element={
              !user ? (
                <LoginPage />
              ) : (
                <Navigate
                  to={
                    user.role === 'Recruiter' ? '/recruiterpage' : '/dashboard'
                  }
                />
              )
            }
          />

          <Route
            path="/recruiterpage"
            element={
              user?.role === 'Recruiter' ? (
                <RecruiterPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              user?.role === 'Employee' ? (
                <DashboardEmp />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/success"
            element={user ? <SuccessPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/applypage"
            element={user ? <ApplyPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
