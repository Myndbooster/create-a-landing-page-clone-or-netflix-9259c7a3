import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-800 to-black">
      <h1 className="text-5xl font-bold mb-6">Welcome to Netflix</h1>
      <div>
        <Link to="/signin" className="mr-4 btn-primary">Sign In</Link>
        <Link to="/signup" className="btn-secondary">Sign Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;