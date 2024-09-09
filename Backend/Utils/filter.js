class filter{
  constructor(query,querystr){
    this.query=query;
    this.querystr=querystr
  }

  search(){
    const keyword=this.querystr.keyword?{
      name:{
        $regex:this.querystr.keyword,
        $options:'i'

      }
    }:{};

    this.query=this.query.find({...keyword})
    return this

  };


  filters(){
    const querycopy={...this.querystr};

    const remove=['keyword','page'];
    remove.forEach((e)=>delete querycopy[e])


    //!prices
    let str=JSON.stringify(querycopy);
    str=str.replace(/\b(gt|gte|lt|lte)\b/g,(match)=>`$${match}`)

    this.query=this.query.find(JSON.parse(str));
    return this



  };


  paginate(pagenum){
    const curpage=Number(this.querystr.page)||1;
    const jump=pagenum*(curpage-1);

    this.query=this.query.limit(pagenum).skip(jump);
    return this


  }

}

export default filter