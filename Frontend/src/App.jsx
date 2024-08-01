import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/dashboard';
import ExpenseTracker from './components/ExpenseTracker';
import FinancialGoals from './components/FinancialGoals';
import InvestmentRecommendations from './components/InvestmentRecommendations';

const router = createBrowserRouter([
  
  {
    path:"/",
    element: <><Home/></>,
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
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/expense-tracker",
    element: <ExpenseTracker />,
  },
  {
    path: "/financial-goals",
    element: <FinancialGoals />,
  },
  {
    path: "/investment-recommendations",
    element: <InvestmentRecommendations />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
