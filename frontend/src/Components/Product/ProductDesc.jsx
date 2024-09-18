import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useGetProductDescQuery } from '../../Redux/API/ProductApi'
import Loader from '../Layout/Loader';
import StarRatings from 'react-star-ratings';

export default function ProductDesc() {

  const params=useParams()

  const {data,isError,error,isLoading}= useGetProductDescQuery(params.id)
  const product=data?.product;

  const [currImg,setCurrImg]=useState('');

  useEffect(()=>{
    setCurrImg(product?.images[0]?product?.images[0]?.url: '/images/default_images.png')
  },[product])

  useEffect(()=>{
    if(isError){
      toast.error(error?.data?.message)
    }
  },[error,isError])

  

  //useEffect

  //console.log(data)
  if(isLoading) return <Loader/>
  



  return (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            src={currImg}
            alt=""
            width="340"
            height="390"
          />
        </div>
        <div className="row justify-content-start mt-5">
          {product?.images?.map((i)=>(
              <div className="col-2 ms-4 mt-2">
              {/* <a role="button"/> */}
                <img
                  className={`d-block border rounded p-3 cursor-pointer ${i.url===currImg ? "border-warning": "" } `}
                  height="100"
                  width="100"
                  src={i?.url}
                  alt={i?.url}
                  onClick={(event)=>setCurrImg(i.url)}
                />
              </div>
          ))}
          
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">Product # {product?._id}</p>

        <hr />

        <div className="d-flex">
        <StarRatings
          rating={product?.rating}
          starRatedColor="blue"
          numberOfStars={5}
          name='rating'
          starSpacing='1px'
        starDimension='30px'/>
          <span id="no-of-reviews" className="pt-1 ps-2"> ({product?.totalreviews} Reviews) </span>
        </div>
        <hr />

        <p id="product_price">₹{product?.price}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus">-</span>
          <input
            type="number"
            className="form-control count d-inline"
            value="1"
            readonly
          />
          <span className="btn btn-primary plus">+</span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled=""
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status: <span id="stock_status" className={product?.stock>0 ? 'greenColor': "redColor"} > {product?.stock>0 ? 'In Stock': "Out Of Stock"} </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p> {product?.description} </p>
        <hr />
        <p id="product_seller mb-3">Sold by: <strong> {product?.seller} </strong></p>

        <div className="alert alert-danger my-5" type="alert">
          Login to post your review.
        </div>
      </div>
    </div>
  )
}
