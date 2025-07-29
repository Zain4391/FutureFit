import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DragAndDrop = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
    }, 3000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
      <div className="container mx-auto">
        <motion.div 
          className="max-w-3xl mx-auto bg-gray-800 rounded-2xl p-8 border border-blue-500 shadow-lg shadow-blue-500/20"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Check Your <span className="text-blue-400">Career Future?</span>
          </motion.h2>
          
          <motion.div 
            className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center cursor-pointer transition-all duration-300 ${
              isDragOver 
                ? 'border-blue-400 bg-blue-500 bg-opacity-10 scale-105' 
                : 'border-gray-600 hover:border-blue-400'
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            whileHover={{ 
              scale: 1.02,
              borderColor: '#60a5fa',
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {isUploading ? (
                <motion.div
                  key="uploading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 border-4 border-blue-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-blue-400 mb-2 font-semibold">Uploading your resume...</p>
                  <p className="text-gray-500 text-sm">AI analysis in progress</p>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.svg 
                    className="w-16 h-16 mx-auto text-gray-500 mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ 
                      y: isDragOver ? -5 : [0, -5, 0],
                      scale: isDragOver ? 1.1 : 1
                    }}
                    transition={{ 
                      y: { duration: isDragOver ? 0.2 : 2, repeat: isDragOver ? 0 : Infinity, ease: "easeInOut" },
                      scale: { duration: 0.2 }
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </motion.svg>
                  <motion.p 
                    className="text-gray-400 mb-2"
                    animate={{ 
                      color: isDragOver ? '#60a5fa' : '#9ca3af'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDragOver ? 'Drop your resume here!' : 'Drag and drop your resume here'}
                  </motion.p>
                  <p className="text-gray-500 text-sm">Supported formats: PDF, DOCX, TXT</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 mb-4">Or upload directly from your device</p>
            <motion.button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25"
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsUploading(true);
                setTimeout(() => setIsUploading(false), 3000);
              }}
              disabled={isUploading}
            >
              {isUploading ? 'Processing...' : 'Upload & Analyze Resume'}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DragAndDrop;