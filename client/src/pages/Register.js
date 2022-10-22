import React from 'react'
import { useState,useEffect } from 'react'
import {Logo,FormRow,Alert} from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const initialState={
  name:'',
  email:'',
  password:'',
  isMember:true,
}

export default function Register() {
  const navigate = useNavigate()
  const [values,setValues] = useState(initialState)
  const {user,isLoading,showAlert,displayAlert,registerUser} = useAppContext()

  // setting up a generalized handleChange fucntion
  const handleChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }

  const onSubmit=(e)=>{
    e.preventDefault();
    const {name,email,password,isMember} = values;
    if(!email || !password || (!isMember && !name)){
      displayAlert();
      // this function is called from the AppContext->reducer.js file. 
      return;
    }
    const currentUser = {name,email,password}
    if(isMember){
      console.log('already a member')
    }else{
      registerUser(currentUser)
    }

  }

  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        navigate('/') 
      },3000) 
    }
  },[user,navigate])

  const toggleMember=()=>{
    setValues({...values,isMember:!values.isMember})
  }

  return (
    <div>
        <Wrapper className='full-page'>
          <form className='form' onSubmit={onSubmit}>
            <Logo/>
            <h3>{values.isMember ? 'Login' : 'Register'}</h3>
            {showAlert && <Alert/>}
            {/* name input */}
            {/* passing props to the FormRow in components */}
            {!values.isMember && <FormRow type="text" name="name" value={values.name} handleChange={handleChange} />}

            {/* email input */}
            <FormRow type="email" name="email" value={values.email} handleChange={handleChange}/>

            {/* password input */}
            <FormRow type="password" name="password" value={values.password} handleChange={handleChange}/>
            {/* disable the submit button while isLoading */}
            <button type='submit' className='btn btn-lock' disabled={isLoading} >submit</button>
            <p>
              {values.isMember ? 'Not a member yet?' : 'Already a member?'}
              <button type='button' className="member-btn" onClick={toggleMember}>
                {values.isMember? 'Register' : 'Login'}
              </button>
            </p>
          </form>
        </Wrapper>
    </div>
  )
}
