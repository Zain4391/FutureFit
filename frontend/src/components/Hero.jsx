import React from "react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 w-full max-w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-lg">
              Is Your Career{" "}
            </span>
            <span className="text-blue-400 drop-shadow-lg">Future Fit?</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Upload your resume and let AI predict your automation risk.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 hover:text-white text-white px-8 py-4 rounded-lg text-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                ></path>
              </svg>
              Upload & Analyze Resume
            </button>
            <button className="border border-blue-400 text-white hover:bg-blue-400 hover:text-white px-8 py-4 rounded-lg text-lg font-medium transition-all">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl border border-blue-400 shadow-lg shadow-blue-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="text-blue-400 font-bold">AI Risk Analysis</div>
                <div className="text-xs text-gray-400">Scanning...</div>
              </div>
              <div className="space-y-3">
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-400 h-full rounded-full animate-pulse"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-400 h-full rounded-full animate-pulse"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-400 h-full rounded-full animate-pulse"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-gray-300">
                Career Automation Risk:{" "}
                <span className="text-blue-400 font-bold">42%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
