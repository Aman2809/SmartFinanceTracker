import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { FaUnlock } from 'react-icons/fa';
import RegisterPage from './RegisterPage';
import { IoIosMail } from "react-icons/io";
import { toast } from 'react-toastify';
import { loginUser } from '../services/user-service';
import { doLogin } from '../jwtAuth/auth';

const LoginPage = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e, field) => {
    setData({ ...data, [field]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Form data', data);

    if (data.username.trim() === "" || data.password.trim() === "") {
      toast.error("Username or Password is required");
      return;
    }

    loginUser(data).then((jwtTokenData) => {
      console.log("User Token : ", jwtTokenData);
      doLogin(jwtTokenData, () => {
        console.log("Login Details is saved to Local Storage ");
        toast.success("Login Success!!");
      });
    }).catch(error => {
      console.log(error);
      toast.error("Something went wrong on server");
    });
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="relative">
      <style>
        {`
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus, 
          input:-webkit-autofill:active {
            -webkit-background-clip: text;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
            box-shadow: inset 0 0 20px 20px transparent !important;
          }
        `}
      </style>
      {isRegister ? (
        <RegisterPage toggleForm={toggleForm} onClose={onClose} />
      ) : (
        <div className="bg-slate-800 border border-slate-400 rounded-md shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative w-full max-w-md mx-auto p-4 sm:p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white text-xl"
          >
            ×
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-white text-center font-bold mb-4 md:mb-6">Login</h1>
          <Formik>
            <Form onSubmit={onSubmit}>
              <div className="relative my-4">
                <Field
                  type="email"
                  name="email"
                  placeholder=" "
                  value={data.username}
                  onChange={(e) => handleChange(e, "username")}
                  className="block w-full px-0 py-2 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer my-6 sm:my-8 text-white"
                />
                <label className="absolute text-sm sm:text-base text-white duration-300 transform -translate-y-6 scale-75 -top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                <IoIosMail className="text-white absolute -top-2 right-4"/>
              </div>
              <div className="relative my-4">
                <Field
                  type="password"
                  name="password"
                  placeholder=" "
                  value={data.password}
                  onChange={(e) => handleChange(e, "password")}
                  className="block w-full px-0 py-2 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer my-6 sm:my-8 text-white"
                />
                <label className="absolute text-sm sm:text-base text-white duration-300 transform -translate-y-6 scale-75 -top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                <FaUnlock className="text-white absolute -top-2 right-4" />
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                <div className="flex gap-2 items-center">
                  <input type="checkbox" />
                  <label className="text-sm sm:text-base text-white" htmlFor="Remember Me">Remember Me</label>
                </div>
                <button className="text-blue-500 text-sm sm:text-base">Forgot Password?</button>
              </div>
              <button type="submit" className="bg-white w-full mb-4 mt-4 sm:mt-6 text-base sm:text-lg rounded-full text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-75">Login</button>
              <div className="text-center">
                <span className="text-sm sm:text-base text-white">New Here? <button type="button" className="text-blue-500" onClick={toggleForm}>Create an Account</button></span>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default LoginPage;