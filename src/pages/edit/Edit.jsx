import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

export default function Edit() {
    const {userId}=useParams();
    console.log(userId);
    const navigate=useNavigate();
    const {register,handleSubmit,setValue}=useForm();
      const[error,setError]=useState("");
      const[loading,setLoading]=useState(true);
    const getDetails = async()=>{
       
        try{
            const {data} =await axios.get(`${import.meta.env.VITE_BURL}/users/${userId}`);
            setValue("userName",data.user.userName);
            setValue("email",data.user.email);
            setValue("phone",data.user.phone);
          }
      
          catch(e){
            if(e.status==404){
              setError("Page not found");
              console.log("Page not found");
            }
          }
          finally{
            setLoading(false);
          }
      }
    
      useEffect(()=>{
        getDetails();
      },[])

    const EditForm= async (value)=>{
     const {data} =await axios.put(`${import.meta.env.VITE_BURL}/users/${userId}`,{userName:value.userName});
     navigate('/');
     
    }
   if(loading){
     return <Loader/>
   }
 
   if(error){
     return <div className='text-danger'>{error}</div>
   }
  
  return (
    <>
    <h2>Edit user</h2>
    <form onSubmit={handleSubmit(EditForm)}>

    <div className="form-floating mb-3">
        <input {...register("userName")} type="text" className="form-control" id="floatingName" placeholder="" />
        <label htmlFor="floatingName">User Name</label>
      </div>
      <div className="form-floating mb-3">
        <input {...register("email")} type="email" className="form-control" id="floatingEmail" placeholder="" disabled/>
        <label htmlFor="floatingEmail">Email</label>
      </div>

      <div className="form-floating mb-3">
        <input {...register("phone")} type="text" className="form-control" id="floatingPhone" placeholder="" disabled/>
        <label htmlFor="floatingPhone">Phone</label>
      </div>

      <button className='btn btn-outline-info' type="submit">Edit</button>

    </form>
    </>
  )
}
