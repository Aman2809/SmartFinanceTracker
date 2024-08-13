import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 h-[50vh] text-white py-8">
      <div className="container mt-16 mx-auto px-4">
        <div className="flex flex-wrap -mx-4 text-left">
          {/* About Us Section */}
          <div className="w-full md:w-5/12 px-4 mb-8">
            <h3 className="text-xl font-bold">About Us</h3>
            <p className="text-gray-400 mt-2">
            SmartFinancialAdvisor is a comprehensive web application designed to help users manage their finances effectively. The application offers features like income and expense tracking, financial goal setting, and transaction management.
            </p>
          </div>

          {/* Newsletter Section */}
          <div className="w-full md:w-5/12 px-4 mb-8">
            <h3 className="text-xl font-bold">Newsletter</h3>
            <p className="text-gray-400 mt-2">Stay Updated</p>
            <form className="flex mt-4">
              <input
                type="text"
                className="form-input w-full bg-gray-800 text-white px-4 py-2 focus:outline-none"
                placeholder="Email"
              />
              <button className="bg-pink-500 text-white px-4 py-2 ml-2">
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>

          {/* Follow Us Section */}
          <div className="w-full md:w-2/12 px-4">
            <h3 className="text-xl font-bold">Follow Us</h3>
            <p className="text-gray-400 mt-2">Let us be social</p>
            <div className="flex space-x-4 mt-4">
              <i className="fab fa-facebook-f text-2xl"></i>
              <i className="fab fa-instagram text-2xl"></i>
              <i className="fab fa-twitter text-2xl"></i>
              <i className="fab fa-discord text-2xl"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
