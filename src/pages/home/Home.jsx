import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

export default function Home() {

  const[error,setError]=useState("");
  const[users,setUsers]=useState([]);
  const[loading,setLoading]=useState(true);
  const getUsers = async()=>{
    try{
      const {data}= await axios.get(`${import.meta.env.VITE_BURL}/users`);
      console.log(data.users);
      setUsers(data.users);
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

  const deleteUser = async(id)=>{
   const response=await axios.delete(`${import.meta.env.VITE_BURL}/users/${id}`);
   if(response.status==200){
   toast.success('User deleted successfully', {
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
    const newUsers=users.filter(user=>user._id!=id);
    setUsers(newUsers);
  }
  }

  useEffect(()=>{
    getUsers()
  },[])

  if(loading){
    return <Loader/>
  }

  if(error){
    return <div className='text-danger'>{error}</div>
  }

  return (
    <>
    <h2>Users</h2>
    <table className="table table-striped table-bordered">
      <thead className='table-info'>
        <tr>
          <th scope="col">id</th>
          <th scope="col">name</th>
          <th scope="col">email</th>
          <th scope="col">actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user=>
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>
                <Link className='btn btn-outline-primary' to={`/details/${user._id}`}>details</Link>
                <button onClick={()=>deleteUser(user._id)} className='btn btn-outline-danger'>delete</button>
                <Link className='btn btn-outline-info' to={`/edit/${user._id}`}>edit</Link>
                </td>
            </tr>
          )
        }
        
      </tbody>
    </table>
    </>
  )
}
