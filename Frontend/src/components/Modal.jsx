import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
