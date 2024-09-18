import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'

export default function PageOutlet({pagenum,filtercount}) {

  const [currPage,setCurrPage]=useState();
  let [searchParams]=useSearchParams();
  const navigate=useNavigate()

  const page=Number(searchParams.get('page'))|| 1;

  useEffect(()=>{
    setCurrPage(page);
  },[page])

  const setCurrPageNo=(pageNum)=>{
    setCurrPage(pageNum);

    if(searchParams.has("page")){
      searchParams.set("page",pageNum)
    }else{
      searchParams.append("page",pageNum)
    }

    const path=window.location.pathname + "?" + searchParams.toString();
    navigate(path)
  }

  return (
    <div className='d-flex justify-content-center my-6'>
      {filtercount>pagenum && (
        <Pagination
        activePage={currPage}
        itemsCountPerPage={pagenum}
        totalItemsCount={filtercount}
        onChange={setCurrPageNo}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        firstPageText={"First"}
        lastPageText={"Last"}
        itemClass='page-item'
        linkClass='page-link'
      />
        
        )}      
    </div>
  )
}
