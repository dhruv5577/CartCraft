import { createSlice } from "@reduxjs/toolkit"

const initialState={
  cartItems:localStorage.getItem('CartItems') ? JSON.parse(localStorage.getItem('CartItems')):[]

}

const CartSlice=createSlice({
  initialState,
  name:"CartSlice",
  reducers:{
    setCartItm:(state,action)=>{
      const item=action.payload;

      // console.log(item);
      const isexicts=state.cartItems.find((itm)=>itm.product===item.product);

      if(isexicts){
        state.cartItems=state.cartItems.map((itm)=>itm.product===isexicts.product?item:itm)
      }
      else{
        state.cartItems=[...state.cartItems,item]
      }

      localStorage.setItem("CartItems",JSON.stringify(state.cartItems))
    },

    removeCartItem:(state,action)=>{
      state.cartItems=state?.cartItems?.filter(
        (itm)=>itm.product!==action.payload
      );

      localStorage.setItem("CartItems",JSON.stringify(state.cartItems))      
    }
  }
})

export default CartSlice.reducer;

export const {setCartItm,removeCartItem}=CartSlice.actions