import  userModel from "../models/userModel.js";  
import lodash from "lodash";


const createUser= async(req,res)=>{
    // const {fname,lname,email,password}=req.body;
    try {
        
        const newUser = new userModel(lodash.pick(req.body,['fname','lname','email','password']))
        if(newUser){
         await newUser.save()
        console.log("user created");


        
        res.status(200).json({message:"new user created :",newUser:lodash.pick(newUser,['_id','fname','lname','email'])})
        }else{
            res.status(404).json({message:"no data  for the user"})
        }

    } catch (error) {
        res.status(500).json({message:"error",error:error})
    }
}

const getAllUsers= async(req,res)=>{
    try {
         const allUsers =await userModel.find();
    if(allUsers){
        res.status(200).json({message: "got all users",users:allUsers});
    }else{
        res.status(404).json({message:"no user found"})    }
    } catch (error) {
        res.status(500).json({message:"error",error:error})
    }
   
}
const getUser= async(req,res)=>{
    const id =  req.params.id;
    try {
        const user = await userModel.findById(id);
        if(user){
            res.status(200).json({message:"got user",user :user});
        }else{
            res.status(404).json({message:"no user found"})   
        }
    } catch (error) {
        res.status(500).json({message:"error",error:error})
    }
}

    const deleteUser = async(req,res)=>{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({message:"provide the id"})
        }
            try {
                const user = await userModel.findByIdAndDelete(id);
                if (user) {
                    res.status(200).json({message:"user deleted ",user:user})
                } else {
                    res.status(404).json({message:"no user found"})     
                }

            } catch (error) {
                res.status(500).json({message:"error",error:error})
            }
    }

    const updateUser = async(req,res)=>{
        const id=req.params.id;
        if(!id){
            return res.status(400).json({message:"provide the id"})    
        }
        try {
            const user = await userModel.findByIdAndUpdate(id,req.body,{new:true})
            if(user){
                res.status(200).json({message:"updated the user",user:user})
            } else{
                res.status(404).json({message:"no user found"})     
            }
        } catch (error) {
            res.status(500).json({message:"error",error:error})
        }
}

export {createUser,getAllUsers, getUser,deleteUser,updateUser}