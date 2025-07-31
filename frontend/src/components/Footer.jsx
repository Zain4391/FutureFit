import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Logo and Description */}
          <motion.div
            className="mb-8 md:mb-0 text-center md:text-left"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center justify-center md:justify-start mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.svg
                className="h-8 w-8 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  scale: 1.1 
                }}
                transition={{ duration: 0.5 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </motion.svg>
              <motion.span
                className="ml-2 text-xl font-bold text-white"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Future<span className="text-blue-400">Fit</span>
              </motion.span>
            </motion.div>
            <motion.p
              className="text-gray-400 max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI-powered career analysis and skill development for the future of
              work.
            </motion.p>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex space-x-8"
            variants={itemVariants}
          >
            {[
              { text: "About Us", href: "#" },
              { text: "Privacy Policy", href: "#" },
              { text: "Terms of Service", href: "#" },
            ].map((link, index) => (
              <motion.a
                key={link.text}
                href={link.href}
                className="text-gray-400 hover:text-blue-400 transition-colors relative"
                variants={linkVariants}
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                custom={index}
              >
                <motion.span
                  className="relative z-10"
                  whileHover={{
                    color: "#60a5fa",
                  }}
                >
                  {link.text}
                </motion.span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            &copy; 2025 Future Fit. All rights reserved.
          </motion.p>
          
          {/* Subtle animated decoration */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
          />
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;