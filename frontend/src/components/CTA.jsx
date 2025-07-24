import React from "react";

const CTA = () => {
  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Future-Proof Your Career?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Get your personalized AI risk assessment and skill development plan
            today.
          </p>
          <button className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-medium transition-all hover:shadow-lg hover:shadow-white/25">
            Start Your Free Assessment
          </button>
          <p className="mt-6 text-gray-300">
            No credit card required. Get your first report free.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
