import React from 'react'
import UserPage from '../Layout/UserPage'
import { useSelector } from 'react-redux'

export default function UserDetails() {
  const {user}=useSelector((st)=>st.auth)
  return (
    <UserPage>
      <div class="row justify-content-around mt-5 user-info">
      <div class="col-12 col-md-3">
        <figure class="avatar avatar-profile">
          <img
            class="rounded-circle img-fluid"
            src="../images/default_avatar.jpg"
            alt={user?.name}
          />
        </figure>
      </div>

      <div class="col-12 col-md-5">
        <h4>Full Name</h4>
        <p>{user?.name}</p>

        <h4>Email Address</h4>
        <p>{user?.email}</p>

        <h4>Joined On</h4>
        <p>{user?.createdAt?.substring(0,10)}</p>
      </div>
    </div>
    </UserPage>
  )
}
