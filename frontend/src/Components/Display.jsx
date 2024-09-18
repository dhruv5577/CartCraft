import React, { useEffect }  from 'react'
import Metadata from './Layout/Metadata'
import { useGetProductsQuery } from '../Redux/API/ProductApi'
import ProductItem from './Product/ProductItem';
import Loader from './Layout/Loader';
import toast from 'react-hot-toast';
import PageOutlet from './Layout/PageOutlet';
import { useSearchParams } from 'react-router-dom';
import Sidebar from './Layout/Sidebar';

function Display() {

  let [searchParams]=useSearchParams();
  const page=searchParams.get('page')||1
  const keyword=searchParams.get('keyword')||""
  const min=searchParams.get('min')
  const max=searchParams.get('max')
  const category=searchParams.get('category')
  const ratings=searchParams.get('ratings')

  const params={page,keyword}

  if(min!=null){
    params.min=min
  }
  if(max!=null){
    params.max=max
  }
  if(category!=null){
    params.category=category
  }
  if(ratings!=null){
    params.ratings=ratings
  }

  const {data,isLoading,error,isError} =useGetProductsQuery(params);


  const colsize=keyword?4:3;

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
        {keyword && (
          <div className='col-6 col-md-3 mt-5 '>
            <Sidebar/>
          </div>
        )}
        <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary">Latest Products</h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product)=>(
                <ProductItem product={product} colsize={colsize}/>
              ))}
            </div>
          </section>
          <PageOutlet pagenum={data?.pagenum} filtercount={data?.filtercount}/>
        </div>
      </div>
    </>
  )
}

export default Display
