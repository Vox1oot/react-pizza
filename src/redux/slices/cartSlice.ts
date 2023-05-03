import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type itemType = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
};

interface cartState {
    totalPrice: number;
    totalCount: number;
    items: Array<itemType>;
}

const initialState: cartState = {
    totalPrice: 0,
    totalCount: 0,
    items: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, { payload }: PayloadAction<itemType>) => {
            state.items.push(payload);
            state.totalPrice = state.items.reduce((acc, item) => {
                const newPrice = acc + item.price;
                return newPrice;
            }, 0);
            state.totalCount += 1;
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
            );
            state.totalCount -= 1;
            state.totalPrice -= action.payload.price;
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalCount = 0;
        }
    }
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems } = cartSlice.actions;
export const selectCard = (state: RootState) => state.cart;

export default cartSlice.reducer;
