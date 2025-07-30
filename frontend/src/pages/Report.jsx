import React, { useState } from 'react';
import { processResume, getQuotaStatus } from '../service/gemini';

const Report = () => {
    const [resume, setResume] = useState(null);
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [quotaStatus, setQuotaStatus] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResume(file);
            setError(null);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === 'application/pdf') {
                setResume(file);
                setError(null);
            } else {
                setError('Please upload a PDF file only.');
            }
        }
    };

    const handleProcessResume = async () => {
        if (!resume) {
            setError('Please upload a resume first.');
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const result = await processResume(resume);
            setReport(result);
            
            // Update quota status
            setQuotaStatus(getQuotaStatus());
            
            // Show warning if using mock data
            if (result._isMockData) {
                setError(`Demo Mode: ${result._error || 'Using sample data due to API limitations'}`);
            }
        } catch (err) {
            const errorMessage = err.message || 'Failed to process resume. Please try again.';
            setError(errorMessage);
            setReport(null);
            
            // If it's a quota error, try to provide helpful information
            if (errorMessage.includes('quota')) {
                setQuotaStatus(getQuotaStatus());
            }
        } finally {
            setLoading(false);
        }
    };

    const formatPredictedYear = (year) => {
        const currentYear = new Date().getFullYear();
        const yearsUntil = year - currentYear;
        
        if (yearsUntil <= 5) return { color: 'text-red-400', bg: 'bg-red-900/20', label: 'High Risk' };
        if (yearsUntil <= 15) return { color: 'text-yellow-400', bg: 'bg-yellow-900/20', label: 'Medium Risk' };
        return { color: 'text-green-400', bg: 'bg-green-900/20', label: 'Low Risk' };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12 mt-20">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-4">
                        AI Resume Analyzer
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Upload your resume and get instant insights about your career prospects, skills, and AI impact assessment
                    </p>
                </div>

                {/* Upload Section */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                            dragActive 
                                ? 'border-indigo-400 bg-indigo-900/20' 
                                : 'border-gray-600 hover:border-indigo-400 hover:bg-gray-800/50'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div className="space-y-4">
                            <div className="mx-auto w-16 h-16 bg-indigo-900/30 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-lg font-medium text-gray-200">
                                    {resume ? resume.name : 'Drop your resume here, or'}
                                </p>
                                <label className="inline-block mt-2 px-6 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors">
                                    Browse Files
                                    <input 
                                        type="file" 
                                        accept=".pdf"
                                        onChange={handleFileChange} 
                                        className="hidden" 
                                    />
                                </label>
                                <p className="text-sm text-gray-400 mt-2">PDF files only, max 20MB</p>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className={`mt-4 p-4 border rounded-lg ${
                            error.includes('Demo Mode') 
                                ? 'bg-yellow-900/20 border-yellow-600/30 text-yellow-200' 
                                : 'bg-red-900/20 border-red-600/30 text-red-200'
                        }`}>
                            <div className="flex items-start">
                                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="font-medium">
                                        {error.includes('Demo Mode') ? 'Demo Mode Active' : 'Processing Error'}
                                    </p>
                                    <p className="text-sm mt-1">{error}</p>
                                    {quotaStatus && (
                                        <p className="text-xs mt-2 text-gray-400">
                                            Daily requests remaining: {quotaStatus.daily} | 
                                            Resets at: {quotaStatus.resetTime.toLocaleTimeString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <button 
                            onClick={handleProcessResume}
                            disabled={!resume || loading}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg 
                                     hover:from-blue-700 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed
                                     transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analyzing Resume...
                                </div>
                            ) : (
                                'Analyze Resume'
                            )}
                        </button>
                    </div>
                </div>

                {/* Loading Animation */}
                {loading && (
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-6 py-3 bg-gray-800/80 rounded-full shadow-lg backdrop-blur-sm border border-gray-700">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
                                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span className="ml-3 text-gray-200 font-medium">Processing your resume...</span>
                        </div>
                    </div>
                )}

                {/* Report Display */}
                {report && (
                    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
                        {/* Demo Mode Warning */}
                        {report._isMockData && (
                            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-600/30 rounded-2xl p-6 backdrop-blur-sm">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-yellow-900/40 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-yellow-200">Demo Mode</h3>
                                        <p className="text-sm text-yellow-300/80 mt-1">
                                            This is sample data due to API quota limitations. The analysis structure and format are accurate, but the content is for demonstration purposes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Header Card */}
                        <div className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-sm">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-white mb-4">Analysis Complete!</h2>
                                <div className="inline-flex items-center px-4 py-2 bg-green-900/30 text-green-400 rounded-full border border-green-600/30">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Resume Successfully Analyzed
                                </div>
                            </div>
                        </div>

                        {/* Overview Cards */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Professional Summary */}
                            <div className="bg-gray-800/50 rounded-2xl shadow-lg p-6 border border-gray-700 hover:shadow-xl transition-shadow backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <div className="w-8 h-8 bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    Professional Summary
                                </h3>
                                <p className="text-gray-300 leading-relaxed">{report.description}</p>
                                <div className="mt-4 px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm inline-block border border-blue-600/30">
                                    {report.field}
                                </div>
                            </div>

                            {/* AI Impact Assessment */}
                            <div className="bg-gray-800/50 rounded-2xl shadow-lg p-6 border border-gray-700 hover:shadow-xl transition-shadow backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <div className="w-8 h-8 bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    AI Impact Assessment
                                </h3>
                                {(() => {
                                    const riskInfo = formatPredictedYear(report.predictedYear);
                                    return (
                                        <div className={`p-4 rounded-xl ${riskInfo.bg} border border-opacity-20`}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-2xl font-bold text-white">{report.predictedYear}+</p>
                                                    <p className="text-sm text-gray-400">Predicted displacement year</p>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${riskInfo.color} bg-gray-800/50`}>
                                                    {riskInfo.label}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>

                        {/* Skills and Keywords */}
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Skills */}
                            <div className="bg-gray-800/50 rounded-2xl shadow-lg p-6 border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                                    <div className="w-8 h-8 bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                    Skills ({report.skills?.length || 0})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {report.skills?.map((skill, index) => (
                                        <span key={index} className="px-3 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium hover:bg-green-900/50 transition-colors border border-green-600/30">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Keywords */}
                            <div className="bg-gray-800/50 rounded-2xl shadow-lg p-6 border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                                    <div className="w-8 h-8 bg-orange-900/30 rounded-lg flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                    Keywords ({report.keywords?.length || 0})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {report.keywords?.map((keyword, index) => (
                                        <span key={index} className="px-3 py-2 bg-orange-900/30 text-orange-300 rounded-lg text-sm font-medium hover:bg-orange-900/50 transition-colors border border-orange-600/30">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Certifications */}
                            <div className="bg-gray-800/50 rounded-2xl shadow-lg p-6 border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                    <div className="w-6 h-6 bg-indigo-900/30 rounded flex items-center justify-center mr-2">
                                        <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                    Suggested Certifications
                                </h3>
                                <ul className="space-y-2">
                                    {report.suggestedCertifications?.map((cert, index) => (
                                        <li key={index} className="text-sm text-gray-300 border-l-2 border-indigo-600/30 pl-3 py-1">
                                            {cert}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Degree Programs */}
                            <div className="bg-gray-800/50 rounded-2xl shadow-lg p-6 border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                    <div className="w-6 h-6 bg-purple-900/30 rounded flex items-center justify-center mr-2">
                                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        </svg>
                                    </div>
                                    Degree Programs
                                </h3>
                                <ul className="space-y-2">
                                    {report.degreePrograms?.map((program, index) => (
                                        <li key={index} className="text-sm text-gray-300 border-l-2 border-purple-600/30 pl-3 py-1">
                                            {program}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* AI Tools */}
                            <div className="bg-gray-800/50 rounded-2xl shadow-lg p-6 border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                    <div className="w-6 h-6 bg-pink-900/30 rounded flex items-center justify-center mr-2">
                                        <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    AI Tools to Learn
                                </h3>
                                <ul className="space-y-2">
                                    {report.aiTools?.map((tool, index) => (
                                        <li key={index} className="text-sm text-gray-300 border-l-2 border-pink-600/30 pl-3 py-1">
                                            {tool}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Report;