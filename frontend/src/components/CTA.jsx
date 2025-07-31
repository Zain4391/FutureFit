import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/report");
  };
  return (
    <section className="py-20 px-6 bg-gray-900 overflow-hidden">
      <div className="container mx-auto">
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-12 text-center relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <div className="relative z-10">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to Future-Proof Your Career?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Get your personalized AI risk assessment and skill development plan
              today.
            </motion.p>
            
            <motion.button 
              className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-medium transition-all hover:shadow-lg hover:shadow-white/25 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClick}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Start Your Free Assessment</span>
            </motion.button>
            
            <motion.p 
              className="mt-6 text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              No credit card required. Get your first report free.
            </motion.p>
          </div>
          
          {/* Floating particles effect */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + (i * 12)}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-10, -30, -10],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + (i * 0.5),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;