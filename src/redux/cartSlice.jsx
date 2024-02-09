import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id !== action.payload.id);
        },
        clearCart: (state) => {
            return [];
        },
        updateCartItemQuantity(state, action) {
            const { id, quantity } = action.payload;
            // Find the index of the item to be updated
            const itemIndex = state.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                // Create a new array with the updated item
                const updatedItems = state.map((item, index) => {
                    if (index === itemIndex) {
                        return { ...item, quantity }; // Update quantity of the item
                    }
                    return item;
                });
                return updatedItems;
            }
            return state; // Return the original state if item not found
        }
    }
});

export const { addToCart, deleteFromCart, clearCart, updateCartItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
