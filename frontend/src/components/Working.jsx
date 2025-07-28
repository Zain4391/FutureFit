import React from "react";

const Working = () => {
  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-blue-400">Works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our AI-powered platform analyzes your professional profile to
            provide insights about your career's future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="bg-blue-500 bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-blue-400"
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
            </div>
            <h3 className="text-xl font-bold mb-3">1. Upload</h3>
            <p className="text-gray-400">
              Upload your resume or CV. Our system accepts PDF, DOCX, and TXT
              formats.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="bg-blue-500 bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">2. Analyze</h3>
            <p className="text-gray-400">
              Our AI scans your skills, experience, and industry to calculate
              automation risk.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="bg-blue-500 bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">3. Get Report</h3>
            <p className="text-gray-400">
              Receive a detailed report with risk assessment and personalized
              skill recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Working;
