import React from "react";

const Features = () => {
  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced <span className="text-blue-400">Features</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our AI-powered platform provides comprehensive career insights and
            actionable recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="bg-blue-500 bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">AI Risk Assessment</h3>
            <p className="text-gray-400">
              Get a detailed analysis of how likely your current role is to be
              automated in the next decade.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="bg-blue-500 bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-400"
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
            <h3 className="text-xl font-bold mb-2">Skill Gap Analysis</h3>
            <p className="text-gray-400">
              Identify which skills you need to develop to stay competitive in
              an AI-driven job market.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="bg-blue-500 bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">
              Personalized Learning Path
            </h3>
            <p className="text-gray-400">
              Get customized recommendations for courses, certifications, and
              resources to future-proof your career.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="bg-blue-500 bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Industry Trends</h3>
            <p className="text-gray-400">
              Stay informed about emerging technologies and trends affecting
              your industry and profession.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="bg-blue-500 bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Career Pivot Options</h3>
            <p className="text-gray-400">
              Explore alternative career paths that leverage your existing
              skills but have lower automation risk.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="bg-blue-500 bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Timeline Projections</h3>
            <p className="text-gray-400">
              View estimated timelines for when automation might impact your
              role and plan accordingly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
