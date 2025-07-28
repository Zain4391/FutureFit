import React from "react";

const DragAndDrop = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl p-8 border border-blue-500 shadow-lg shadow-blue-500/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Ready to Check Your{" "}
            <span className="text-blue-400">Career Future?</span>
          </h2>

          <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 mb-6 text-center cursor-pointer hover:border-blue-400 transition-colors duration-300">
            <svg
              className="w-16 h-16 mx-auto text-gray-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="text-gray-400 mb-2">Drag and drop your resume here</p>
            <p className="text-gray-500 text-sm">
              Supported formats: PDF, DOCX, TXT
            </p>
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-4">
              Or upload directly from your device
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25">
              Upload & Analyze Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DragAndDrop;
