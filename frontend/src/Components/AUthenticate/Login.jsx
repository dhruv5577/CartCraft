import React, { useEffect, useState } from 'react'
import { useLoginMutation } from '../../Redux/API/AuthhApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const {isAuthenticate}=useSelector((st)=>st.auth)

  const [login,{isloading,error,data}]=useLoginMutation();

  console.log(data)

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
    const bodydata={email,password};

    login(bodydata);
    // navigate('/')

  }

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={submithandle}
        >
          <h2 className="mb-4">Login</h2>
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(event)=>setEmail(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(event)=>setPassword(event.target.value)}
            />
          </div>

          <a href="/password/forgot" className="float-end mb-4">Forgot Password?</a>

          <button id="login_button" type="submit" className="btn w-100 py-2" disabled={isloading}>
            {isloading ? "Validating":"LOGIN"}
          </button>

          <div className="my-3">
            <a href="/register" className="float-end">New User?</a>
          </div>
        </form>
      </div>
    </div>
  )
}
