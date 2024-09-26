import React from 'react'
import SearchBar from './SearchBar'
import { useGetUserdetailsQuery } from '../../Redux/API/UserApii'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLazyLogoutQuery } from '../../Redux/API/AuthhApi'

function Header() {

  const {isLoading}= useGetUserdetailsQuery()
  const {user} =useSelector((st)=>st.auth)
  const navigate=useNavigate();

  const [logout] =useLazyLogoutQuery();

  const handlelogout=()=>{
    logout();
    navigate(0);
  }


  return (
    <div>
      <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
            <img src="/images/shopit_logo.png" alt="ShopIT Logo" />
          </a>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <SearchBar/>
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <a href="/cart" style={{textDecoration:"none"}}>
          <span id="cart" className="ms-3"> Cart </span>
          <span className="ms-1" id="cart_count">0</span>
        </a>

        {user?(
          <div className="ms-4 dropdown">
          <button
            className="btn dropdown-toggle text-white"
            type="button"
            id="dropDownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <figure className="avatar avatar-nav">
              <img
                src="../images/default_avatar.jpg"
                alt="User Avatar"
                className="rounded-circle"
              />
            </figure>
            <span>{user?.name}</span>
          </button>
          <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">
            <Link className="dropdown-item" to="/admin/dashboard"> Dashboard </Link>

            <Link className="dropdown-item" to="/me/orders"> Orders </Link>

            <Link className="dropdown-item" to="/me/profile"> Profile </Link>

            <Link className="dropdown-item text-danger" to="/" onClick={handlelogout}> Logout </Link>
          </div>
        </div>
        ):(!isLoading && (<Link to="/login" className="btn ms-4" id="login_btn"> Login </Link>))}

        

        
      </div>
    </nav>
    </div>
  )
}

export default Header
