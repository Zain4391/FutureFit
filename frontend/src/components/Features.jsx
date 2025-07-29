import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 80, 
      opacity: 0,
      rotateX: 45
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -90 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        bounce: 0.5
      }
    }
  };

  const features = [
    {
      title: "AI Risk Assessment",
      description: "Get a detailed analysis of how likely your current role is to be automated in the next decade.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      title: "Skill Gap Analysis", 
      description: "Identify which skills you need to develop to stay competitive in an AI-driven job market.",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    },
    {
      title: "Personalized Learning Path",
      description: "Get customized recommendations for courses, certifications, and resources to future-proof your career.",
      icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    },
    {
      title: "Industry Trends",
      description: "Stay informed about emerging technologies and trends affecting your industry and profession.",
      icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
    },
    {
      title: "Career Pivot Options",
      description: "Explore alternative career paths that leverage your existing skills but have lower automation risk.",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },
    {
      title: "Timeline Projections",
      description: "View estimated timelines for when automation might impact your role and plan accordingly.",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Advanced <span className="text-blue-400">Features</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our AI-powered platform provides comprehensive career insights and actionable recommendations.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-gray-800 rounded-xl p-6 transition-all duration-300"
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                rotateY: 5,
                shadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              <motion.div 
                className="bg-blue-500 bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mb-4"
                variants={iconVariants}
                whileHover={{ 
                  rotate: [0, -15, 15, 0],
                  scale: 1.1,
                  backgroundColor: "rgba(59, 130, 246, 0.3)",
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
              >
                <motion.svg 
                  className="w-6 h-6 text-blue-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ 
                    scale: 1.1,
                    filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))"
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}></path>
                </motion.svg>
              </motion.div>
              
              <motion.h3 
                className="text-xl font-bold mb-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {feature.description}
              </motion.p>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 pointer-events-none"
                whileHover={{
                  background: "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.1))",
                  transition: { duration: 0.3 }
                }}
                style={{ zIndex: -1 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;