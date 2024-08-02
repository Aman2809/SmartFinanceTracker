import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl"
        >
          <FaTimes size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
