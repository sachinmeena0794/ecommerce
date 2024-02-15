import { createSlice,current } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        addToCart(state, action){
            state.push(action.payload)            
        },
        deleteFromCart(state,action){
            return state.filter(item => {
              console.log(item,action.payload.id._id)
              item.id != action.payload.id
            });
        },
        clearCart: (state) => {
            return [];
          },
          updateCartItemQuantity(state, action) {
            const { id, quantity } = action.payload;
            return current(state).map(item => {
              if (item._id === id) {
                return { ...item, quantity: quantity };
              } else {
                return item;
              }
            });
          }
          
          
    }
})

export const {addToCart, deleteFromCart,clearCart,updateCartItemQuantity} = cartSlice.actions;

export default cartSlice.reducer;