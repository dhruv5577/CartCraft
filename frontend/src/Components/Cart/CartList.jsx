import React from 'react'
import Metadata from '../Layout/Metadata'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeCartItem, setCartItm } from '../../Redux/Actions/CartSlice'

export default function CartList() {


  const {cartItems}=useSelector((st)=>st.cart)
  const dispatch=useDispatch();
  const insquan=(item,quantity)=>{
    const newQty=quantity+1;
    if(newQty>item?.stock) return;
    setCartsItm(item,newQty)
  }

  const descquan=(item,quantity)=>{
    const newQty=quantity-1;
    if(newQty<=0) return;
    setCartsItm(item,newQty)
  }

  const setCartsItm=(item,newQty)=>{
      const cartItm={
        product:item?.product,
        name:item?.name,
        price:item?.price,
        image:'/images/default_images.png',
        stock:item?.stock,
        quan:newQty
      };
      dispatch(setCartItm(cartItm))
      
  }

  const rmvcartitm=(id)=>{
    dispatch(removeCartItem(id))
  }


  return (
    <>
    <Metadata title={"Cart Summery"}/>
    {cartItems?.length===0?(
      <h2 className="mt-5"> Your Cart Is Empty</h2>
    ):(
      <>
      <h2 className="mt-5"> Your Cart : <b> ${cartItems.length} Items </b></h2>
      <div className="row d-flex justify-content-between">
      <div className="col-12 col-lg-8">
        {cartItems?.map((itm)=>(
          <>
              <hr />
        <div className="cart-item" data-key="product1">
          <div className="row">
            <div className="col-4 col-lg-3">
              <img
                src="../images/product.jpg"
                alt="Laptop"
                height="90"
                width="115"
              />
            </div>
            <div className="col-5 col-lg-3">
              <Link href={`/products/${itm?.product}`}> {itm?.name} </Link>
            </div>
            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
              <p id="card_item_price">  ₹{itm?.price} </p>
            </div>
            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={()=> descquan(itm,itm.quan)}> - </span>
                <input
                  type="number"
                  className="form-control count d-inline"
                  value={itm?.quan}
                  readonly
                />
                <span className="btn btn-primary plus" onClick={()=> insquan(itm,itm.quan)}> + </span>
              </div>
            </div>
            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
              <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=>rmvcartitm(itm?.product)}></i>
            </div>
          </div>
        </div>
        <hr />
          </>
        ))}
        
      </div>
      <div className="col-12 col-lg-3 my-4">
        <div id="order_summary">
          <h4>Order Summary</h4>
          <hr />
          <p>Item Quantity: <span className="order-summary-values">{cartItems?.reduce((acc,item)=>acc+item?.quan,0)} (Units)</span></p>
          <p>Est. total: <span className="order-summary-values">₹ {cartItems?.reduce((acc,item)=>acc+item?.quan * item?.price,0).toFixed(2)} </span></p>
          <hr />
          <button id="checkout_btn" className="btn btn-primary w-100">
            Check out
          </button>
        </div>  
      </div>
    </div>
    </>
    )}


    
    </>
  )
}
