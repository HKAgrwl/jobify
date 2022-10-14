import User from "../models/User.js"
import { StatusCodes } from "http-status-codes";
import {BadRequestError,NotFoundError} from "../errors/index.js";


const register= async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        throw new BadRequestError('please provide all values')
    }

    const user = await User.create({name,email,password});
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user : {email : user.email,lastName : user.lastName,location : user.location,name : user.name},token})
}
const login= async (req,res)=>{
    res.send('Login user')
}
const updateUser = async (req,res)=>{
    res.send('Update User')
}

export {register,login,updateUser}