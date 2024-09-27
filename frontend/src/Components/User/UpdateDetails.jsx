import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUpdateuserMutation } from '../../Redux/API/UserApii';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import UserPage from '../Layout/UserPage';

export default function UpdateDetails() {

  const [email,setEmail]=useState("");
  const [name,setName]=useState("");

  const {user}=useSelector((st)=>st.auth)

  const navigate=useNavigate();

  const [updateuser,{isSuccess,error,isLoading}] = useUpdateuserMutation()

  useEffect(()=>{
    if(user){
      setName(user.name);
      setEmail(user.email)
    }

    if(isSuccess){
      toast.success("User Details updated successfully")
      navigate("/me/profile")
    }

    if(error){
      toast.error(error?.data?.message)
    }

    

  },[user,error,isSuccess,navigate])

  const submithandle=(e)=>{
    e.preventDefault();
    const bodydata={email,name};

    updateuser(bodydata)
    // navigate('/')

  }


  return (
    <UserPage>
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form
          className="shadow rounded bg-body"
          onSubmit={submithandle}
        >
          <h2 className="mb-4">Update Profile</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label"> Name </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label"> Email </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn update-btn w-100" disabled={isLoading}> {isLoading?"Updatinggg...":"Update"} </button>
        </form>
      </div>
    </div>
    </UserPage> 
  )
}
