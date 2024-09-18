import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPriceParams } from '../../Utils/Checkparams';
import { PRODUCT_CAT } from '../../Utils/Products';
import StarRatings from 'react-star-ratings';

export default function Sidebar() {

  const [minVal,setMinVal]=useState(0);
  const [maxVal,setmaxVal]=useState(0);

  const navigate=useNavigate();
  let [searchParams]=useSearchParams();


  const handleclick=(category)=>{
    const checkbox=document.getElementsByName(category.name);

    checkbox.forEach((element) => {
        if(element!==category){
          element.checked=false
        }
    });

    if(category.checked===false){
      if(searchParams.has(category.name)){
        searchParams.delete(category.name)
        const path=window.location.pathname + "?" + searchParams.toString();
        navigate(path)
      }
    }else{
      if(searchParams.has(category.name)){
        searchParams.set(category.name,category.value)
      }
      else{
          searchParams.append(category.name,category.value)
      }
      const path=window.location.pathname + "?" + searchParams.toString();
        navigate(path)
    }
  }

  useEffect(()=>{
    searchParams.has("min")&&setMinVal(searchParams.get('min'))
    searchParams.has("max")&&setmaxVal(searchParams.get('max'))
  },[searchParams])

  const handle=(event)=>{
    event.preventDefault();

    searchParams=getPriceParams(searchParams,"min",minVal)
    searchParams=getPriceParams(searchParams,"max",maxVal)

    const path=window.location.pathname + "?" + searchParams.toString();
    navigate(path)
  }


  const defaultcheck=(type,categoryVal)=>{
    const value=searchParams.get(type)

    if(categoryVal===value){
      return true;
    }else{
      return false;
    }
  };

  return (
    <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form
        id="filter_form"
        className="px-2"
        onSubmit={handle}
      >
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min ($)"
              name="min"
              value={minVal}
              onChange={(evnet)=>setMinVal(evnet.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max ($)"
              name="max"
              value={maxVal}
              onChange={(evnet)=>setmaxVal(evnet.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">GO</button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Category</h5>

      {PRODUCT_CAT.map((cat)=>(
          <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id="check4"
            value={cat}
            onClick={(event)=>handleclick(event.target)}
            defaultChecked={defaultcheck("category",cat)}
          />
          <label className="form-check-label" for="check4"> {cat} </label>
        </div>
      ))}
      
      

      <hr />
      <h5 className="mb-3">Ratings</h5>
      {[5,4,3,2,1].map((rating)=>(
        <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="ratings"
          id="check7"
          value={rating}
          onClick={(event)=>handleclick(event.target)}
          defaultChecked={defaultcheck("ratings",rating)}
          
        />
        <label className="form-check-label" for="check7">
        <StarRatings
          rating={rating}
          starRatedColor="orange"
          numberOfStars={5}
          name='rating'
          starSpacing='1px'
          starDimension='25px'/>
        </label>
      </div>
      ))}
      
      
    </div>

  )
}
