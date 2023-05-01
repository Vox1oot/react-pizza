import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface FilterState {
    totalPrice: number;
    items: [];
}

const initialState: FilterState = {
    totalPrice: 0,
    items: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
        clearItems: (state) => {
            state.items = [];
        }
    }
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems } = cartSlice.actions;
export const selectCard = (state: RootState) => state.cart;

export default cartSlice.reducer;
