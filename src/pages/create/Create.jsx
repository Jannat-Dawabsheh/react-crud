import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

export default function Create() {
  const {register,handleSubmit}=useForm();
  const navigate=useNavigate();
    const[error,setError]=useState("");
    const[loading,setLoading]=useState(true);
  const RegisterForm= async (data)=>{
    try{
   const response=await axios.post(`${import.meta.env.VITE_BURL}/users`,data);
   toast.success('User added successfully', {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
    });
   navigate('/');
  }
  catch(e){
     if(e.status==404){
        setError("Page not found");
        console.log("Page not found");
      }
  }
  }

  return (
    <>
    <h2>Create user</h2>
    <form onSubmit={handleSubmit(RegisterForm)}>

    <div className="form-floating mb-3">
        <input {...register("userName")} type="text" className="form-control" id="floatingName" placeholder="" />
        <label htmlFor="floatingName">User Name</label>
      </div>
      <div className="form-floating mb-3">
        <input {...register("email")} type="email" className="form-control" id="floatingEmail" placeholder="" />
        <label htmlFor="floatingEmail">Email</label>
      </div>

      <div className="form-floating mb-3">
        <input {...register("password")} type="password" className="form-control" id="floatingPassword" placeholder="" />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <div className="form-floating mb-3">
        <input {...register("phone")} type="text" className="form-control" id="floatingPhone" placeholder="" />
        <label htmlFor="floatingPhone">Phone</label>
      </div>

      <button className='btn btn-outline-info' type="submit">Register</button>

    </form>
    </>
  )
}
