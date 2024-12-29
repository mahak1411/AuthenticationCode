import React from 'react'
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { handleError , handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [loginInfo  , setloginInfo] = useState({
    email : "",
    password : ""
  });

  const navigate = useNavigate();
  const handleChange = (e)=>{
    const {name,value} = e.target;
    // console.log(name ,value);
    const copyloginInfo = {...loginInfo};
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  }

  const handleLogin = async (e)=>{
    e.preventDefault();
    const {email , password} = loginInfo;
    if(!email|| !password){
      return handleError("All fields are required");
    }try{
      const url = "http://localhost:3030/auth/login";
      const response = await fetch(url,{
        method : "POST",
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(loginInfo),
      });
      const result  = await response.json();
      const {success , message ,jwtToken,name, error} = result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token' , jwtToken);
        localStorage.setItem('loggedInUser',name)
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }else if(error){
        const details = error?.details[0].message;
        handleError(details)
      }else if(!success){
        handleError(message)
      }
    }catch(error){
        handleError(error);
    }

  }
  return (
    <div className="container p-5 border border-dark text-center">
      <h1 className="mt-3 p-3 fs-3">Login form</h1>
      <form action="" onSubmit={handleLogin}>
        <div className="mt-3 p-3 fs-4">
          <label htmlFor="email">Enter email</label>
          <input
          onChange={handleChange}
          type="email" name="email" placeholder="Enter your email"
          value={loginInfo.email}
          />
        </div>

        <div className="mt-3 p-3 fs-4">
          <label htmlFor="password">Enter Password</label>
          <input
          onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginInfo.password}
          />
        </div>

        <button type ="submit" className="btn btn-primary">Login</button>
        <span className="mt-3 p-3 fs-5">
          Doesn't have an account?
          <Link to={"/signup"}>Create here..</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
