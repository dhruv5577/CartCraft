import React, { useEffect, useState } from 'react'
import { useResetpasswordMutation } from '../../Redux/API/UserApii';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Metadata from '../Layout/Metadata';

export default function ResetPass() {

  const[password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const params=useParams()

  
 const [resetpassword,{isLoading,error,isSuccess}]= useResetpasswordMutation()

 const {isAuthenticate}=useSelector((st)=>st.auth)
 const navigate=useNavigate();

  useEffect(()=>{
    if(isAuthenticate){
      navigate('/');
    }
    if(error){
      toast.error(error?.data?.message);
    }
    if(isSuccess){
      toast.success('Password is set')
    }
  },[error, isAuthenticate, navigate,isSuccess])

  const submithandle=(e)=>{
    e.preventDefault();
    if(password!==confirmPassword){
      return toast.error('Password is not match')
    }
    const bodydata={password,confirmPassword};

    resetpassword({token:params.token,body:bodydata})
    // navigate('/')

  }

  return (
    <>
    <Metadata title={'Reset Password'}/>
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={submithandle}
        >
          <h2 className="mb-4">New Password</h2>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirm_password_field" className="form-label"
              >Confirm Password</label
            >
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          </div>

          <button id="new_password_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
            {isLoading ? "Submiting...":"Set Password"}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
