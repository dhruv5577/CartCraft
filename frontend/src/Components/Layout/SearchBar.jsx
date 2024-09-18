import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {

  const  [searchWord,setSearchWord]=useState("")
  const navigate=useNavigate()

  const submithandle=(event)=>{
    event.preventDefault();

    if(searchWord?.trim()){
      navigate(`/?keyword=${searchWord}`)
    }
    else{
      navigate('/')
    }
  }

  return (
    <form onSubmit={submithandle} action="your_search_action_url_here" method="get">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              aria-describedby="search_btn"
              className="form-control"
              placeholder="Enter Product Name ..."
              name="keyword"
              value={searchWord}
              onChange={(event)=>setSearchWord(event.target.value)}
            />
            <button id="search_btn" className="btn" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>
  )
}
