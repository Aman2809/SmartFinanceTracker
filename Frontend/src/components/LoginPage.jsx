import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FaUnlock } from 'react-icons/fa';
import RegisterPage from './RegisterPage';
import { IoIosMail } from "react-icons/io";

const LoginPage = ({ onClose }) => {
  
  const [isRegister, setIsRegister] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  const onSubmit = (values) => {
    console.log('Form data', values);
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="relative">
      {isRegister ? (
        <RegisterPage toggleForm={toggleForm} onClose={onClose} />
      ) : (
        <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white text-xl"
          >
            
          </button>
          <h1 className="text-4xl text-white text-center font-bold mb-6">Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="relative my-4">
                <Field
                  type="email"
                  name="email"
                  placeholder=" "
                  className="block w-72 px-0 py-2.3 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer my-8"
                />
                <label className="absolute text-base text-white duration-300 transform -translate-y-6 scale-75 -top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                <IoIosMail className="text-white absolute -top-2 right-4"/>
              </div>
              <div className="relative my-4">
                <Field
                  type="password"
                  name="password"
                  placeholder=" "
                  className="block w-72 px-0 py-2.3 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer my-8"
                />
                <label className="absolute text-base text-white duration-300 transform -translate-y-6 scale-75 -top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                <FaUnlock className="text-white absolute -top-2 right-4" />
              </div>
              <div className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                  <input type="checkbox" />
                  <label className='text-white' htmlFor="Remember Me">Remember Me</label>
                </div>
                <button className='text-blue-500'>Forgot Password?</button>
              </div>
              <button type="submit" className="bg-white w-full mb-4 mt-6 text-[18px] rounded-full text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-75">Login</button>
              <div>
                <span className='m-4 text-white'>New Here? <button type="button" className="text-blue-500" onClick={toggleForm}>Create an Account</button></span>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
