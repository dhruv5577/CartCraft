import React, { useEffect }  from 'react'
import Metadata from './Layout/Metadata'
import { useGetProductsQuery } from '../Redux/API/ProductApi'
import ProductItem from './Product/ProductItem';
import Loader from './Layout/Loader';
import toast from 'react-hot-toast';

function Display() {

  const {data,isLoading,error,isError} =useGetProductsQuery();


  useEffect(()=>{
    if(isError){
      toast.error(error?.data?.message)
    }
  },[error,isError])

  

  //useEffect

  //console.log(data)
  if(isLoading) return <Loader/>

  

  return (
    <>
    <Metadata title={"Best Buy Products Online"}/>
      <div className="row">
        <div className="col-12 col-sm-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">Latest Products</h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product)=>(
                <ProductItem product={product}/>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Display
