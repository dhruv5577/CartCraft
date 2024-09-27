import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function UserMenu() {

  const Items=[
    {Name:"profile",url:"/me/profile",icon:"fas fa-user"},
    {Name:"update profile",url:"/me/update",icon:"fas fa-user"},
    {Name:"upload avatar",url:"/me/update_avr",icon:"fas fa-user-circle"},
    {Name:"update password",url:"/me/update_pass",icon:"fas fa-lock"},
  ]

  const loc=useLocation()
  const [activeitem,setActiveItem]=useState(loc.pathname)

  const handleclick=(itemurl)=>{
    setActiveItem(itemurl)
  }

  return (
    <div className="list-group mt-5 pl-4">
      {Items.map((item,idx)=>(
        <Link
        key={idx}
        to={item.url}
        className={`fw-bold list-group-item list-group-item-action ${activeitem.includes(item.url)?"active":""}`}
        onClick={()=>handleclick(item.url)}
        aria-current={activeitem.includes(item.url)?"true":"false"}
      >
        <i className={`${item.icon} fa-fw pe-2`}></i> {item.Name}
      </Link>
      ))}
      
      
    </div>
  )
}
