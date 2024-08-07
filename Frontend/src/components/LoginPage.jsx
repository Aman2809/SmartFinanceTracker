import React, { useState } from 'react';
import { Formik,Form,Field } from 'formik';
import { FaUnlock } from 'react-icons/fa';
import RegisterPage from './RegisterPage';
import { IoIosMail } from "react-icons/io";
import { toast } from 'react-toastify';
import { loginUser } from '../services/user-service';
import { doLogin } from '../jwtAuth/auth';
// import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onClose }) => {
  
  const [isRegister, setIsRegister] = useState(false);
  // const navigate = useNavigate(); // Use the useNavigate hook

  const [data, setData] = useState({

    username: '',
    password: '',
  })

  const handleChange=(e,field)=>{
    setData({...data,[field]:e.target.value})
    console.log(data)

  };






  const onSubmit = (event) => {
    event.preventDefault()
    console.log('Form data', data);

    if(data.username.trim()=="" || data.password.trim==""){
      toast.error("Username or Password is required")
      return;
    }

    //Submitting the data to server to generate token
    loginUser(data).then((jwtTokenData)=>{

      console.log("User Token : ")
      console.log(jwtTokenData)


      //Save the Data to the Local Storage.....

      doLogin(jwtTokenData,()=>{
        console.log("Login Details is saved to Local Storage ")

        //Redirect to user Dashboard Page
        toast.success("Login Success!!");
        
        // navigate('/user/dashboard'); // Redirect to the dashboard
        
      })


      // toast.success("Login Success !! ")
    }).catch(error=>{
      console.log(error)
      toast.error("Something went wrong on server")
    })

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
          <Formik >
            <Form onSubmit={onSubmit} >
              <div className="relative my-4">
                <Field
                  type="email"
                  name="email"
                  placeholder=" "
                  value={data.username}
                  onChange={(e)=>handleChange(e,"username")}
                  
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
                  value={data.password}
                  onChange={(e)=>handleChange(e,"password")}
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
