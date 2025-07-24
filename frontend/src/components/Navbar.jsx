const Navbar = () => {
  return (
    <nav className="navbar-vibrant px-6 py-4 bg-opacity-90 backdrop-blur-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
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
        <div className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-300 hover:text-blue-400 transition">
            How It Works
          </a>
          <a href="#" className="text-gray-300 hover:text-blue-400 transition">
            Features
          </a>
          <a href="#" className="text-gray-300 hover:text-blue-400 transition">
            Testimonials
          </a>
          <a href="#" className="text-gray-300 hover:text-blue-400 transition">
            About
          </a>
        </div>
        <div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition btn-glow">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
