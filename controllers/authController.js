const register=(req,res)=>{
    res.send('register')
}
const login=(req,res)=>{
    res.send('Login')
}
const updateUser=(req,res)=>{
    res.send('Update User')
}

export default {register,login,updateUser}