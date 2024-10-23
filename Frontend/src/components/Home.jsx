import React, { useState } from 'react';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import Modal from './Modal';
import bg from '../img/bg.png';
import Dashboard from '../img/Dashboard.png'
import Expense from '../img/Expense.png'
import Income from '../img/Income.png'
import Footer from './Footer';
import { Link } from 'react-router-dom';

function Home() {
  const style = {
    backgroundImage: `url(${bg})`,
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <>
      {/* First Division */}
      <div className="relative bg-pink-50 min-h-screen flex flex-col items-center text-white px-4 md:px-8">
        <Navbar openLoginModal={openLoginModal} />

        <div className='flex flex-col lg:flex-row mt-32 lg:mt-36 w-full lg:pl-8 justify-between lg:space-x-10'>
          <div className='div-left mt-4 w-full lg:max-w-[40vw] lg:ml-24 text-center lg:text-left'>
            <h1 className='text-4xl lg:text-6xl mb-4 font-bold text-black'>Simplify Your financial life today.</h1>
            <p className='mb-8 text-base lg:text-lg font-semibold text-black'>With Financify, easily manage your Expenses, Transactions, and define your Financial Goals easily and effortlessly</p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/user/dashboard">
                <button className="w-full sm:w-auto px-8 lg:px-11 py-2 bg-pink-300 text-black rounded hover:bg-pink-400 font-bold">Get Started</button>
              </Link>
              <button className="w-full sm:w-auto px-8 lg:px-11 py-2 text-black rounded hover:bg-white hover:text-black font-bold">See how it works?</button>
            </div>
          </div>

          <div className="div-right mt-8 lg:-mt-7 w-full flex justify-center relative overflow-hidden">
            <img src={Dashboard} alt="Dashboard Preview" className="w-full h-auto lg:h-[65vh] lg:w-auto lg:max-w-[120%] lg:relative lg:right-[-5vw]" />
          </div>
        </div>
      </div>

      {/* Second Division */}
      <div className='bg-gradient-to-r from-[#4688ce] to-[#ffffff] lg:min-h-screen max-h-screen py-12 lg:py-0'>
        <div className='flex flex-col  lg:flex-row px-4 lg:pr-8 justify-between lg:space-x-10'>
          <div className="w-full mt-20 lg:mt-24 flex justify-center overflow-hidden items-center">
            <img src={Expense} alt="Dashboard Preview" className="w-full h-auto lg:h-[70vh] rounded-xl lg:rounded-r-xl lg:-left-12" />
          </div>

          <div className='mt-8 lg:mt-36 w-full lg:max-w-[40vw] px-4 lg:px-5 text-center lg:text-left'>
            <h1 className='text-3xl lg:text-5xl mb-4 font-bold text-black'>Manage your expenses in one click.</h1>
            <p className='mb-8 text-base lg:text-lg text-black'>With Financify, easily manage your Expenses, Transactions, and define your Financial Goals easily and effortlessly</p>

            <div className="flex justify-center lg:justify-start">
              <Link to="/user/expense">
                <button className="w-full sm:w-auto px-8 lg:px-11 py-2 bg-pink-300 text-black rounded hover:bg-pink-400 font-bold">Add Expense</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Third Division */}
      <div className='bg-gradient-to-r from-[#ffffff] to-[#a3e080] lg:min-h-screen max-h-screen py-12 lg:py-0'>
        <div className='flex flex-col-reverse lg:flex-row px-4 lg:px-8 justify-between lg:space-x-10'>
          <div className='mt-8 lg:mt-36 w-full lg:max-w-[40vw] px-4 lg:px-5 text-center lg:text-left'>
            <h1 className='text-3xl lg:text-5xl mb-4 font-bold text-black'>Easily Track Your Incomes.</h1>
            <p className='mb-8 text-base lg:text-lg text-black'>With Financify, easily manage your Incomes, Transactions, and define your Financial Goals easily and effortlessly</p>

            <div className="flex justify-center lg:justify-start">
              <Link to="/user/income">
                <button className="w-full sm:w-auto px-8 lg:px-11 py-2 bg-pink-300 text-black rounded hover:bg-pink-400 font-bold">Add Incomes</button>
              </Link>
            </div>
          </div>

          <div className="w-full lg:mt-24 flex justify-center overflow-hidden items-center">
            <img src={Income} alt="Dashboard Preview" className="w-full h-auto lg:h-[75vh] lg:w-auto" />
          </div>
        </div>
      </div>

      <Footer />

      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <LoginPage />
      </Modal>
    </>
  );
}

export default Home;