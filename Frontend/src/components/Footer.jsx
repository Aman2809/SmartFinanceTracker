import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 min-h-[50vh] text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row flex-wrap gap-8 sm:gap-4 text-center sm:text-left mt-8 lg:mt-16">
          {/* About Us Section */}
          <div className="w-full sm:w-full lg:w-5/12 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold">About Us</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              SmartFinancialAdvisor is a comprehensive web application designed to help users manage their finances effectively. The application offers features like income and expense tracking, financial goal setting, and transaction management.
            </p>
          </div>

          {/* Newsletter Section */}
          <div className="w-full sm:w-full lg:w-5/12 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold">Newsletter</h3>
            <p className="text-gray-400 text-sm sm:text-base">Stay Updated</p>
            <form className="flex flex-col sm:flex-row gap-2 sm:gap-0 max-w-md mx-auto sm:mx-0">
              <input
                type="email"
                className="flex-1 form-input w-full bg-gray-800 text-white px-4 py-2 rounded-md sm:rounded-r-none focus:outline-none text-sm sm:text-base"
                placeholder="Email"
              />
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md sm:rounded-l-none transition-colors duration-200">
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>

          {/* Follow Us Section */}
          <div className="w-full sm:w-full lg:w-2/12 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold">Follow Us</h3>
            <p className="text-gray-400 text-sm sm:text-base">Let us be social</p>
            <div className="flex justify-center sm:justify-start space-x-6 sm:space-x-4">
              <a href="#" className="hover:text-pink-500 transition-colors duration-200">
                <i className="fab fa-facebook-f text-xl sm:text-2xl"></i>
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors duration-200">
                <i className="fab fa-instagram text-xl sm:text-2xl"></i>
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors duration-200">
                <i className="fab fa-twitter text-xl sm:text-2xl"></i>
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors duration-200">
                <i className="fab fa-discord text-xl sm:text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section - Added for completeness */}
        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} SmartFinancialAdvisor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;