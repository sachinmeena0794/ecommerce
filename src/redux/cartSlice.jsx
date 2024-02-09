import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        addToCart(state, action){
            state.push(action.payload)            
        },
        deleteFromCart(state,action){
            return state.filter(item => item.id != action.payload.id);
        },
        clearCart: (state) => {
            return [];
          },
          updateCartItemQuantity(state, action) {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
              existingItem.quantity = quantity;
            }
          }
    }
})

export const {addToCart, deleteFromCart,clearCart,updateCartItemQuantity} = cartSlice.actions;

export default cartSlice.reducer;