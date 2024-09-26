import React, { useEffect, useState } from 'react'
import { useRegistrationMutation } from '../../Redux/API/AuthhApi'
import toast from 'react-hot-toast';


export default function Register() {

  const [userdata,setUserData]=useState({
    name:"",
    email:"",
    password:""
  })

  const {name,password,email}=userdata


  const [registration,{isLoading,error}]=useRegistrationMutation()


  useEffect(()=>{
    if(error){
      toast.error(error?.data?.message);
    }
  },[error])

  const submithandle=(e)=>{
    e.preventDefault();
    const bodydata={name,email,password};

    registration(bodydata)

  }


  const changefunc=(event)=>{
    setUserData({...userdata,[event.target.name]:event.target.value})
  }

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body" onSubmit={submithandle}
        >
          <h2 className="mb-4">Register</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={changefunc}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={changefunc}
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
              onChange={changefunc}
            />
          </div>

          <button id="register_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
            {isLoading? "creating user":"REGISTER"}
          </button>
        </form>
      </div>
    </div>
  )
}
