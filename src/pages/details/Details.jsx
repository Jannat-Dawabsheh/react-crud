import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader';

export default function Details() {
  const {userId}=useParams();
  console.log(userId);
  const [user,setUser] = useState({ });
  const[error,setError]=useState("");
  const[loading,setLoading]=useState(true);
  const getDetails = async()=>{
    try{
      const {data} =await axios.get(`${import.meta.env.VITE_BURL}/users/${userId}`);
      // console.log(data.user);
      setUser(data.user);
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
  if(loading){
    return <Loader/>
  }

  if(error){
    return <div className='text-danger'>{error}</div>
  }

  return (
    <>
    <h2>User Details</h2>
    <p>name is : {user.userName}</p>
    <p>email is : {user.email}</p>
    <p>phone is : {user.phone}</p> 
    </>
  )
}
