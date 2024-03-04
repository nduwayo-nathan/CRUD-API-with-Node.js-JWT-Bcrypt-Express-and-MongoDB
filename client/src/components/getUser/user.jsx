import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Users = () => {
  const [users, setUser] = useState([]);


  const deleteUser=async(userId)=>{
    axios.delete(`http://localhost:5000/user/deleteUser/${userId}`)
    .then((responce)=>{
      setUser((prevUser)=>prevUser.filter((user)=>user._id !==userId));
      toast.success(responce.data.message,{position:"top-center"})
    })
    .catch((error)=>{
      console.log(error);
    })

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/user/getUsers");
        setUser(result.data.users);
        console.log(result.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[]); 
// Log the updated users state

  return (
    <div className="users">
      <Link to={"/add"}>Add user</Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>No.</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/edit/`+user._id}>Edit</Link>{" "}
                  <Link onClick={()=>deleteUser(user._id)}>Delete</Link>
                </td>
              </tr>
            ))
         }
        </tbody>
      </table>
    </div>
  );
};

export default Users;
