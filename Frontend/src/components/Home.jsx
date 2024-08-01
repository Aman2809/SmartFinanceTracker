import React, { useState } from 'react';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import Modal from './Modal';

function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <>
      <div className="relative bg-gradient-to-r from-[#f7f1f1] to-[#faced5] h-[90vh] flex flex-col items-center text-white">
        <Navbar openLoginModal={openLoginModal} />

        <div className='flex flex-col lg:flex-row mt-32 px-8 justify-between space-x-10'>
          <div className='div-left mt-5 max-w-[40vw] ml-1 px-5'>
            <h1 className='text-5xl mb-4 font-bold text-black'>Simplify Your financial life today.</h1>
            <p className='mb-8 text-lg text-black'>With Financify, easily manage your Expenses, Transactions, and define your Financial Goals easily and effortlessly</p>

            <div className="flex justify-center lg:justify-start space-x-4">
              <button className="px-11 py-2 bg-pink-300 text-black rounded hover:bg-pink-400 font-bold">Get Started</button>
              <button className="px-11 py-2 text-black rounded hover:bg-white hover:text-black font-bold">See how it works?</button>
            </div>
          </div>

          <div className="div-right mt-11 lg:mt-0 lg:w-1/2 flex justify-center">
            <img src="./photo.jpg" alt="Dashboard Preview" className="w-full h-[60vh] lg:w-auto max-w-md" />
          </div>
        </div>
      </div>

      <div className='bg-gradient-to-r from-[#4688ce] to-[#ffffff] h-[70vh]'>
        <div className='flex flex-col lg:flex-row px-8 justify-between space-x-10'>
          <div className="lg:mt-10 lg:w-1/2 flex justify-center items-center">
            <img src="./photo.jpg" alt="Dashboard Preview" className="w-full h-[60vh] lg:w-auto max-w-md" />
          </div>

          <div className='mt-16 max-w-[40vw] ml-1 px-5'>
            <h1 className='text-5xl mb-4 font-bold text-black'>Manage your expenses in one click.</h1>
            <p className='mb-8 text-lg text-black'>With Financify, easily manage your Expenses, Transactions, and define your Financial Goals easily and effortlessly</p>

            <div className="flex justify-center lg:justify-start space-x-4">
              <button className="px-11 py-2 bg-pink-300 text-black rounded hover:bg-pink-400 font-bold">Get Started</button>
              <button className="px-11 py-2 text-black rounded hover:bg-white hover:text-black font-bold">See how it works?</button>
            </div>
          </div>
        </div>
      </div>

      <div className='HomeBottom bg-red-100 h-[70vh]'>
        <h1>Third is the third Box</h1>
      </div>

      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <LoginPage />
      </Modal>
    </>
  );
}

export default Home;
