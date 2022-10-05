const register= async (req,res)=>{
    res.send('register user')
}
const login= async (req,res)=>{
    res.send('Login user')
}
const updateUser = async (req,res)=>{
    res.send('Update User')
}

export {register,login,updateUser}