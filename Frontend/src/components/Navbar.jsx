import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { doLogout, getCurrentUser, isLoggedIn } from '../jwtAuth/auth';
import Financify from '../img/Financify.png'
import Financify2 from '../img/Financify2.png'

const Navbar = ({ openLoginModal }) => {
  let navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUser());
  }, [login]);

  const logout = () => {
    doLogout(() => {
      setLogin(false);
      navigate("/");
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <style>
        {`
          @media (min-width: 768px) {
            .md-show {
              display: flex !important;
            }
            .md-hide {
              display: none !important;
            }
          }
          @media (max-width: 767px) {
            .md-show {
              display: none !important;
            }
            .mobile-show {
              display: flex !important;
            }
          }
          
          /* Mobile menu animation classes */
          .mobile-menu {
            transition: transform 0.3s ease-in-out;
          }
          
          .mobile-menu.closed {
            transform: translateX(-100%);
          }
          
          .mobile-menu.open {
            transform: translateX(0);
          }

          /* Overlay animation */
          .menu-overlay {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            pointer-events: none;
          }

          .menu-overlay.open {
            opacity: 1;
            pointer-events: auto;
          }
        `}
      </style>

      <nav className="px-4 md:px-20 py-4 bg-transparent absolute top-0 left-0 w-full z-10">
        <div className="flex items-center justify-between relative">
          {/* Logo Section */}
          <div className="flex items-center space-x-1">
            <img src={Financify2} alt="Origin Logo" className="h-16 w-16" />
            <h2 className="text-2xl font-bold text-black">Financfy</h2>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-show md-hide">
            <button 
              onClick={toggleMenu}
              className="text-black z-50"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="md-show items-center justify-between flex-1 ml-8">
            {/* Navigation Links Container */}
            <div className="flex-1 flex justify-center">
              <ul className="flex space-x-8 text-black">
                <NavLink to="/" className="hover:text-lg font-bold transition-all duration-300"><li>Home</li></NavLink>
                <NavLink to="/user/dashboard" className="hover:text-lg font-bold transition-all duration-300"><li>Dashboard</li></NavLink>
                <NavLink to="/about" className="hover:text-lg font-bold transition-all duration-300"><li>About</li></NavLink>
                <NavLink to="/faq" className="hover:text-lg font-bold transition-all duration-300"><li>FAQ</li></NavLink>
              </ul>
            </div>

            {/* Auth Buttons */}
            <div className="flex space-x-2 ml-8">
              {login ? (
                <>
                  <button onClick={logout} className="px-4 py-2 text-black font-bold rounded hover:text-black">Logout</button>
                  <button className="px-4 py-2 text-black font-bold rounded bg-pink-300 hover:bg-pink-400">Get Started</button>
                </>
              ) : (
                <>
                  <button onClick={openLoginModal} className="px-4 py-2 text-black font-bold rounded hover:text-black">Log in</button>
                  <button className="px-4 py-2 text-black font-bold rounded bg-pink-300 hover:bg-pink-400">Get Started</button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu - Always rendered but transformed out of view */}
        <div 
          className={`md-hide fixed inset-0 menu-overlay ${isMenuOpen ? 'open' : ''}`}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div 
            className={`mobile-menu fixed inset-y-0 left-0 w-[80%] bg-white shadow-lg ${
              isMenuOpen ? 'open' : 'closed'
            }`}
          >
            <div className="flex flex-col p-8 pt-16">
              <div className="flex items-center space-x-1 mb-8">
                <img src={Financify2} alt="Origin Logo" className="h-16 w-16" />
                <h2 className="text-2xl font-bold text-black">Financfy</h2>
              </div>

              <ul className="flex flex-col space-y-6 text-black mb-8">
                <NavLink 
                  to="/" 
                  className="hover:text-lg font-bold transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <li>Home</li>
                </NavLink>
                <NavLink 
                  to="/user/dashboard" 
                  className="hover:text-lg font-bold transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <li>Dashboard</li>
                </NavLink>
                <NavLink 
                  to="/about" 
                  className="hover:text-lg font-bold transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <li>About</li>
                </NavLink>
                <NavLink 
                  to="/faq" 
                  className="hover:text-lg font-bold transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <li>FAQ</li>
                </NavLink>
              </ul>

              <div className="flex flex-col space-y-4">
                {login ? (
                  <>
                    <button 
                      onClick={() => { logout(); setIsMenuOpen(false); }} 
                      className="w-full px-4 py-2 text-black font-bold rounded hover:text-black"
                    >
                      Logout
                    </button>
                    <button 
                      onClick={() => setIsMenuOpen(false)} 
                      className="w-full px-4 py-2 text-black font-bold rounded bg-pink-300 hover:bg-pink-400"
                    >
                      Get Started
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => { openLoginModal(); setIsMenuOpen(false); }} 
                      className="w-full px-4 py-2 text-black font-bold rounded hover:text-black"
                    >
                      Log in
                    </button>
                    <button 
                      onClick={() => setIsMenuOpen(false)} 
                      className="w-full px-4 py-2 text-black font-bold rounded bg-pink-300 hover:bg-pink-400"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;