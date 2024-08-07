import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/dashboard';
import ExpenseTracker from './components/Expenses/ExpenseTracker';
import FinancialGoals from './components/FinancialGoals';
import InvestmentRecommendations from './components/InvestmentRecommendations';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './components/PrivateRoutes';
import Modal from './components/Modal';
import { ModalProvider,useModal } from './context/ModalContext';
import Navigation from './components/Navigation/Navigation';
import Income from './components/Incomes/Income';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path:"/navigation",
      element:<Navigation/>
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    
    {
      path: "/user",
      element: <PrivateRoutes />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "income",
          element: <Income/>
        },
        {
          path: "expense-tracker",
          element: <ExpenseTracker />,
        },
        {
          path: "financial-goals",
          element: <FinancialGoals />,
        },
        {
          path: "investment-recommendations",
          element: <InvestmentRecommendations />,
        },
      ],
    },
  ]);

  return (
    <ModalProvider>
      <RouterProvider router={router} />
      <ModalHandler />
      <ToastContainer position="top-center" />
    </ModalProvider>
  );
};

const ModalHandler = () => {
  const { isLoginModalOpen, closeLoginModal } = useModal();

  return (
    <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
      <LoginPage onClose={closeLoginModal} />
    </Modal>
  );
};

export default App;
