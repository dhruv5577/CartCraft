export const getPriceParams=(searchParams,key,val)=>{
  const hasVal=searchParams.has(key);

  if(val&&hasVal){
    searchParams.set(key,val);
  }else if(val){
    searchParams.append(key,val);
  }else if(hasVal){
    searchParams.delete(key);
  }

  return searchParams;

}