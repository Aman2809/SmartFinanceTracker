import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../jwtAuth/auth';
import { useModal } from '../context/ModalContext';

const PrivateRoutes = () => {
  const { openLoginModal } = useModal();

  useEffect(() => {
    if (!isLoggedIn()) {
      openLoginModal();
    }
  }, []);

  return isLoggedIn() ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
