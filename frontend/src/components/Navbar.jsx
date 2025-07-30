import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      window.location.href = `/#${targetId}`;
      return;
    }
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Account for fixed navbar height
        behavior: 'smooth',
      });
    }
  };

  const navItems = [
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Features', id: 'features' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'About', id: 'about' }
  ];

  return (
    <motion.nav 
      className="navbar-vibrant px-6 py-4 bg-gray-900/90 backdrop-blur-md fixed w-full z-50 border-b border-gray-800/50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link to="/" className="flex items-center">
            <motion.svg 
              className="h-8 w-8 text-blue-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </motion.svg>
            <span className="ml-2 text-xl font-bold text-white">
              Future<span className="text-blue-400">Fit</span>
            </span>
          </Link>
        </motion.div>
        
        {/* Centered Navigation Links */}
        <motion.div 
          className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200 relative group"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
              whileHover={{ y: -2 }}
            >
              {item.name}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>
        
        {/* Right Side - CTA Button */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link 
            to="/report"
            className="hidden sm:inline-block"
          >
            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Now
            </motion.button>
          </Link>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-300 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Mobile Menu - You can expand this later */}
      <motion.div 
        className="md:hidden mt-4 space-y-2"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 0, height: 0 }} // Keep hidden for now
      >
        {navItems.map((item, index) => (
          <motion.a
            key={item.name}
            href={`#${item.id}`}
            onClick={(e) => handleScroll(e, item.id)}
            className="block text-gray-300 hover:text-blue-400 transition-colors py-2"
          >
            {item.name}
          </motion.a>
        ))}
        <Link 
          to="/report"
          className="block mt-4"
        >
          <motion.button
            className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
            whileTap={{ scale: 0.95 }}
          >
            Try Now
          </motion.button>
        </Link>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;