import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../Layout/Loader';

export default function SecureRoute({children}) {
  
  const {isAuthenticate,loading}=useSelector((st)=>st.auth);

  if(loading) return <Loader/>

  if(!isAuthenticate ){
    return <Navigate to='/login' replace/>
  }
  
  return children;
}
