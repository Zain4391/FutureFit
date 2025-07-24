import React from "react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <svg
                className="h-8 w-8 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              <span className="ml-2 text-xl font-bold text-white">
                Future<span className="text-blue-400">Fit</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-md">
              AI-powered career analysis and skill development for the future of
              work.
            </p>
          </div>

          {/* Links */}
          <div className="flex space-x-8">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2023 Future Fit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
