import React, { useState,useEffect } from 'react'
import { Link, useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from "react-hot-toast"




const Edit = () => {
  const navigate = useNavigate();
  const user={
    fname: "",
    lname: "",
    email: "" 
  }
 const {id}=useParams();
 const [users,setUser]=useState(user);



 useEffect(()=>{
  axios.get(`http://localhost:5000/user/getUser/${id}`)
  .then((responce=>{
    setUser(responce.data.user)
    
  }))
  .catch((err)=>{
    console.log(err)
  })
 },[id])
 const inputChangeHandler=(e)=>{
  const{name,value}=e.target;
  setUser({...users,[name]:value})
  console.log(users);
 }

 const submitForm  = async(e)=>{
  e.preventDefault();
  await  axios.put(`http://localhost:5000/user/updateUser/${id}`,users)
  .then((response)=>{
      toast.success(response.data.message,{position:"top-right"})
      setUser(response.data.user);
      navigate("/")
      console.log(response)
  })
  .catch((error)=>{
      console.log("error: "+ error)
  })
 }

  return (

    <div> <Link to={"/"}>Back</Link> 
    <h2>Edit user</h2>
    <form action="" onSubmit={submitForm}>
        <input type="text" value={users.fname} name="fname" onChange={inputChangeHandler}  placeholder='f name'/>
        <input type="text"   value={users.lname} name="lname"  onChange={inputChangeHandler} placeholder='l name'/>
        <input type="email"   value={users.email} name="email"  onChange={inputChangeHandler} placeholder='email'/>
        <button type="submit"    name="add"  > Edit</button>
       
    </form></div>
  )
}

export default Edit