import React, { useEffect, useState } from 'react'
import { useForgotpasswordMutation } from '../../Redux/API/UserApii';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ForgotPass() {

  const [email,setEmail]=useState('');

  const [forgotpassword,{isLoading,error}]=useForgotpasswordMutation();

  const navigate=useNavigate();

  const {isAuthenticate}=useSelector((st)=>st.auth)

  useEffect(()=>{
    if(isAuthenticate){
      navigate('/');
    }
    if(error){
      toast.error(error?.data?.message);
    }
  },[error, isAuthenticate, navigate])

  const submithandle=(e)=>{
    e.preventDefault();
    

    forgotpassword({email});
    // navigate('/')

  }


  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={submithandle}
        >
          <h2 className="mb-4">Forgot Password</h2>
          <div className="mt-3">
            <label htmlFor="email_field" className="form-label">Enter Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading?"Sending mail...":"Send Mail"}
          </button>
        </form>
      </div>
    </div>

  )
}
