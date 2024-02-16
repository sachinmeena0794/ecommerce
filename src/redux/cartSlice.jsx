import { createSlice,current } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
      addToCart(state, action) {
        const newItem = action.payload;
        const existingItemIndex = state.findIndex(item => item._id === newItem._id);
      
        if (existingItemIndex !== -1) {
          // If item already exists, update its quantity
          state[existingItemIndex] = {
            ...state[existingItemIndex],
            quantity: state[existingItemIndex].quantity + newItem.quantity
          };
        } else {
          // If item does not exist, add it to the cart
          state.push(newItem);
        }
      }
      ,
      deleteFromCart(state, action) {
        return current(state).filter(item => item._id !== action.payload.id._id);
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