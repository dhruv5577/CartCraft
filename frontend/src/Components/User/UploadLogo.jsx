import React, { useEffect, useState } from 'react'
import UserPage from '../Layout/UserPage'
import { useNavigate } from 'react-router-dom'
import { useUploadlogoMutation } from '../../Redux/API/UserApii'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export default function UploadLogo() {

  const {user}=useSelector((st)=>st.auth)

  const [logo,setLogo]=useState('')
  const [preview,setPreview]=useState(
    user?.logo?user?.logo?.url:"/images/default_images.jpg"
  )

  const navigate=useNavigate();

  const [uploadlogo,{isLoading,error,isSuccess}]=useUploadlogoMutation();

  useEffect(()=>{
    
    if(isSuccess){
      toast.success("logo updated successfully")
      navigate("/me/profile")
    }

    if(error){
      toast.error(error?.data?.message)
    }
  },[error,isSuccess,navigate]);

  const onchange=(event)=>{

    const fileRead=new FileReader();

    fileRead.onload=()=>{
      if(fileRead.readyState===2){
        setPreview(fileRead.result);
        setLogo(fileRead.result)
      }
    }

    fileRead.readAsDataURL(event.target.files[0])
  }

  const submithandle=(e)=>{
    e.preventDefault();
    const bodydata={logo};

    uploadlogo(bodydata)
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
          <h2 className="mb-4">Upload Logo</h2>

          <div className="mb-3">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <figure className="avatar item-rtl">
                  <img src={preview} className="rounded-circle" alt="img" />
                </figure>
              </div>
              <div className="input-foam">
                <label className="form-label" htmlFor="customFile">
                  Choose Logo
                </label>
                <input
                  type="file"
                  name="avatar"
                  className="form-control"
                  id="customFile"
                  accept="images/*"
                  onChange={onchange}
                />
              </div>
            </div>
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
           {isLoading?"Uploading":"Upload"}
          </button>
        </form>
      </div>
    </div>
    </UserPage>
  )
}
