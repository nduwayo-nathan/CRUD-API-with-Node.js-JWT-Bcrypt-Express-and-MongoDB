import  {createUser, deleteUser, getAllUsers, getUser, updateUser}  from "../controllers/userControllers.js";

import express from "express";



const   route = express.Router();

route.post('/createUser',createUser);
route.get('/getUsers',getAllUsers);
route.get('/getUser/:id',getUser);
route.put('/updateUser/:id',updateUser);
route.delete('/deleteUser/:id',deleteUser)

export default route;