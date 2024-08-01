import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUserAlt } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa6";

const RegisterPage = ({ toggleForm, onClose }) => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  const onSubmit = (values) => {
    console.log('Form data', values);
  };

  return (
    <div className="">
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl"
        >
          &times;
        </button>
        <h1 className="text-4xl text-white text-center font-bold mb-6">Register</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form action=''>
            <div className="relative my-4">
              <Field
                type="text"
                name="username"
                placeholder=" "
                className="block w-72 px-0 py-2.3 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer my-8"
              />
              <label className="absolute text-base text-white duration-300 transform -translate-y-6 scale-75 -top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
              <FaUserAlt className="text-white absolute -top-2 right-4" />
            </div>
            <div className="relative my-4">
              <Field
                type="email"
                name="email"
                placeholder=" "
                className="block w-72 px-0 py-2.3 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer my-8"
              />
              <label className="absolute text-base text-white duration-300 transform -translate-y-6 scale-75 -top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
              <FaUserAlt className="text-white absolute -top-2 right-4" />
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
            <button type="submit" className="bg-white w-full mb-4 mt-6 text-[18px] rounded-full text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-75">Register</button>
            <div>
              <span className='m-4 text-white'>Already have an account? <button type="button" className="text-blue-500" onClick={toggleForm}>Login</button></span>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
