import React from 'react'
import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom';    

// the role of this component is to revert back to landing page in case there is no user logged in.

export default function ProtectedRoute({children}) {

  const {user} = useAppContext() ; 
  if(!user){
    return <Navigate to='landing' /> 
  }
  return children;
}
