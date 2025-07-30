import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-lg">
              Is Your Career{' '}
            </span>
            <span className="text-blue-400 drop-shadow-lg">Future Fit?</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8"
            variants={itemVariants}
          >
            Upload your resume and let AI predict your automation risk.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/report"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                </svg>
                Upload & Analyze Resume
              </Link>
            </motion.div>
            
            <motion.button 
              className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:bg-opacity-10 px-8 py-4 rounded-lg text-lg font-medium transition-all"
              variants={buttonVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <div className="relative">
            <motion.div 
              className="bg-gray-800 bg-opacity-80 p-6 rounded-xl border border-blue-400 shadow-lg shadow-blue-500/20"
              initial={{ scale: 0.8, rotateY: 45 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="text-blue-400 font-bold">AI Risk Analysis</div>
                <div className="text-xs text-gray-400">Scanning...</div>
              </motion.div>
              
              <div className="space-y-3">
                {[65, 40, 85].map((width, index) => (
                  <motion.div 
                    key={index}
                    className="w-full bg-gray-700 h-2 rounded-full overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.2, duration: 0.5 }}
                  >
                    <motion.div 
                      className="bg-blue-400 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${width}%` }}
                      transition={{ delay: 1.6 + index * 0.2, duration: 1, ease: "easeOut" }}
                    />
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-4 text-center text-sm text-gray-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.5 }}
              >
                Career Automation Risk: <span className="text-blue-400 font-bold">42%</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;