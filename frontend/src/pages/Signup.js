import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
const Signup = () => {
  const [signupInfo  , setsignupInfo] = useState({
    name : "",
    email : "",
    password : ""
  });

  const navigate = useNavigate();
  const handleChange = (e)=>{
    const {name,value} = e.target;
    // console.log(name ,value);
    const copysignupInfo = {...signupInfo};
    copysignupInfo[name] = value;
    setsignupInfo(copysignupInfo);
  }

  const handleSignUp = async (e)=>{
    e.preventDefault();
    const {name , email , password} = signupInfo;
    if(!name || !email|| !password){
      return handleError("All fields are required");
    }try{
      const url = "http://localhost:3030/auth/signup";
      const response = await fetch(url,{
        method : "POST",
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(signupInfo),
      });
      const result  = await response.json();
      const {success , message , error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
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
      <h1 className="mt-3 p-3 fs-3">Signup</h1>
      <form action="" onSubmit={handleSignUp}>
        <div className="mt-3 p-3 fs-4">
          <label htmlFor="name">Enter Name</label>
          <input
          onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name"
            value={signupInfo.name}
          />
        </div>

        <div className="mt-3 p-3 fs-4">
          <label htmlFor="email">Enter email</label>
          <input
          onChange={handleChange}
          type="email" name="email" placeholder="Enter your email"
          value={signupInfo.email}
          />
        </div>

        <div className="mt-3 p-3 fs-4">
          <label htmlFor="password">Enter Password</label>
          <input
          onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={signupInfo.password}
          />
        </div>

        <button type ="submit" className="btn btn-primary">Sign up</button>
        <span className="mt-3 p-3 fs-5">
          Already have an account?
          <Link to={"/login"}>Login here..</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
