import React, { useEffect, useState } from 'react'
import { useUpdatepasswordMutation } from '../../Redux/API/UserApii';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UserPage from '../Layout/UserPage';

export default function UpdatePassword() {

  const [oldpass,setOldPass]=useState('');
  const [password,setPassword]=useState('');

  const navigate=useNavigate();

  const [updatepassword,{isSuccess,error,isLoading}] = useUpdatepasswordMutation()


  useEffect(()=>{
    if(isSuccess){
      toast.success("Password is updated")
      navigate("/me/profile")
    }

    if(error){
      toast.error(error?.data?.message)
    }
  },[error,isSuccess,navigate])

  const submithandle=(e)=>{
    e.preventDefault();
    const bodydata={pass: oldpass,password:password};

    updatepassword(bodydata)
    //navigate('/')

  }
  



  return (
    <UserPage>
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form className="shadow rounded bg-body" onSubmit={submithandle}>
          <h2 className="mb-4">Update Password</h2>
          <div className="mb-3">
            <label htmlFor="old_password_field" className="form-label">
              Old Password
            </label>
            <input
              type="password"
              id="old_password_field"
              className="form-control"
              value={oldpass}
              onChange={(e)=>setOldPass(e.target.value)}
            />
            
          </div>

          <div className="mb-3">
            <label htmlFor="new_password_field" className="form-label">
              New Password
            </label>
            <input
              type="password"
              id="new_password_field"
              className="form-control"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn update-btn w-100" disabled={isLoading}>
            {isLoading ? 'Updating...':'Update'}
          </button>
        </form>
      </div>
    </div>
    </UserPage>
  )
}
