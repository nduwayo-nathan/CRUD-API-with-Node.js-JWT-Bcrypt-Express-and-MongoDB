import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import "./add.css"
import { toast } from 'react-hot-toast';

const Add = () => {
    const newUser={
        fname:"",
        lname:"",
        email:"",
        password:"",
    }

    const [user,setUser] = useState(newUser);
    const navigate  = useNavigate();
       
    const inputHandler=(e)=>{
        const {name,value}=e.target
        setUser({...user,[name]:value})
       
    }
    const submition= async(e)=>{
        e.preventDefault();
        await  axios.post("http://localhost:5000/user/createUser",user)
        .then((response)=>{
            toast.success(response.data.message,{position:"top-right"})
            navigate("/")
            console.log(response)
        })
        .catch((error)=>{
            console.log("error: "+ error)
        })
    }
  return (
    <div className="add">
       <Link to={"/"}>Back</Link> 
        <h2>add new user</h2>
        <form action="">
            <input type="text" onChange={inputHandler} name="fname" placeholder='f name'/><br/>
            <input type="text" onChange={inputHandler} name="lname" placeholder='l name'/><br/>
            <input type="email" onChange={inputHandler} name="email" placeholder='email'/><br/>
            <input type="password" onChange={inputHandler} name="password" placeholder='passoword'/><br/>
            <button type="submit" onClick={submition} name="add" > add </button>
           
        </form>
    </div>
  )
}

export default Add