import React from 'react'
import UserMenu from './UserMenu.jsx'

export default function UserPage({children}) {
  return (
    <div>
      <div className='mt-2 mb-4 py-4'>
          <h2 className="text-center fw-folder" >Settings</h2>
      </div>

      <div className="container">
        <div className="row justify-content-around">
          <div className='col-12 col-lg-3'>
            <UserMenu/>
          </div>
          <div className="col-12 col-lg-8 user-dashboard">
            {children}
          </div>
        </div>
      </div>

    </div>
  )
}
