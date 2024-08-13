import React, { useState } from 'react';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import Modal from './Modal';
import bg from '../img/bg.png';
import Dashboard from '../img/Dashboard.png'
import Expense from '../img/Expense.png'
import Income from '../img/Income.png'
import Footer from './Footer';

function Home() {

  const style = {
    backgroundImage: `url(${bg})`,
  };


  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <>

      {/* <--------------------First Division----------------------> */}

      <div className="relative bg-pink-50 h-[100vh] flex flex-col items-center text-white">
        <Navbar openLoginModal={openLoginModal} />

        <div className='flex flex-col lg:flex-row mt-36 pl-8 justify-between space-x-10'>
          <div className='div-left mt-4 max-w-[40vw] ml-24 '>
            <h1 className='text-6xl mb-4 font-bold text-black'>Simplify Your financial life today.</h1>
            <p className='mb-8 text-lg font-semibold text-black'>With Financify, easily manage your Expenses, Transactions, and define your Financial Goals easily and effortlessly</p>

            <div className="flex justify-center lg:justify-start space-x-4">
              <button className="px-11 py-2 bg-pink-300 text-black rounded hover:bg-pink-400 font-bold">Get Started</button>
              <button className="px-11 py-2 text-black rounded hover:bg-white hover:text-black font-bold">See how it works?</button>
            </div>
          </div>

          <div className="div-right mt-11 lg:-mt-5 lg:w-full flex justify-center relative overflow-hidden">
            <img src={Dashboard} alt="Dashboard Preview" className="w-[150%] h-[65vh] lg:w-auto  relative right-[-5vw] max-w-[120%]" />
          </div>
        </div>
      </div>

      {/* <--------------------First Division----------------------> */}



      {/* //<--------------------Second Division----------------------> */}


      <div className='bg-gradient-to-r from-[#4688ce] to-[#ffffff] h-[100vh]'>
        <div className='flex flex-col lg:flex-row pr-8 justify-between space-x-10'>
          <div className="lg:mt-24 lg:w-full flex justify-center overflow-hidden items-center">
            <img src={Expense} alt="Dashboard Preview" className="w-full h-[70vh] rounded-r-xl -left-12 lg:w-auto max-w-full" />
          </div>

          <div className='mt-36 max-w-[40vw] ml-1 px-5'>
            <h1 className='text-5xl mb-4 font-bold text-black'>Manage your expenses in one click.</h1>
            <p className='mb-8 text-lg text-black'>With Financify, easily manage your Expenses, Transactions, and define your Financial Goals easily and effortlessly</p>

            <div className="flex justify-center lg:justify-start space-x-4">
              <button className="px-11 py-2 bg-pink-300 text-black rounded hover:bg-pink-400 font-bold">Get Started</button>
              <button className="px-11 py-2 text-black rounded hover:bg-white hover:text-black font-bold">See how it works?</button>
            </div>
          </div>
        </div>
      </div>
      {/* //<--------------------Second Division----------------------> */}



      {/* <--------------------Third Division----------------------> */}

      <div className='bg-gradient-to-r from-[#ffffff] to-[#a3e080]  h-[100vh]'>
        <div className='flex flex-col lg:flex-row px-8 justify-between space-x-10'>


          <div className='mt-36 max-w-[40vw] ml-1 px-5'>
            <h1 className='text-5xl mb-4 font-bold text-black'>Easily Track Your Incomes.</h1>
            <p className='mb-8 text-lg text-black'>With Financify, easily manage your Incomes, Transactions, and define your Financial Goals easily and effortlessly</p>

            <div className="flex justify-center lg:justify-start space-x-4">
              <button className="px-11 py-2 bg-pink-300 text-black rounded hover:bg-pink-400 font-bold">Get Started</button>
              <button className="px-11 py-2 text-black rounded hover:bg-white hover:text-black font-bold">See how it works?</button>
            </div>
          </div>

          <div className="lg:mt-24 lg:w-full flex justify-center overflow-hidden items-center" style={{ marginRight: '-2rem' }}>
            <img src={Income} alt="Dashboard Preview" className="w-full h-[75vh] lg:w-auto max-w-full" />
          </div>


        </div>
      </div>


      {/* <--------------------Third Division----------------------> */}

      <Footer/>

      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <LoginPage />
      </Modal>
    </>
  );
}

export default Home;
