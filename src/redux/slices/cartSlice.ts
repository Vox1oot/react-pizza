import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type itemType = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
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

const incerementPriceAndCount = (state: cartState) => {
    state.totalPrice = state.items.reduce((acc: number, item: itemType) => {
        const newPrice = acc + item.price * item.count;
        return newPrice;
    }, 0);
    state.totalCount += 1;
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, { payload }: PayloadAction<itemType>) => {
            for (let i = 0; i < state.items.length; i += 1) {
                const currentItem = state.items[i];

                if (
                    currentItem.id === payload.id &&
                    currentItem.size === payload.size
                ) {
                    currentItem.count += 1;
                    incerementPriceAndCount(state);
                    return;
                }
            }

            state.items.push(payload);
            incerementPriceAndCount(state);
        },
        removeItem: (state, action) => {
            const { id, size } = action.payload;
            const itemIndex = state.items.findIndex(
                (item) => item.id === id && item.size === size
            );

            if (itemIndex >= 0) {
                const currentItem = state.items[itemIndex];

                console.log(current(currentItem));

                if (currentItem.count > 1) {
                    currentItem.count -= 1;
                } else {
                    state.items.splice(itemIndex, 1);
                }
                state.totalCount -= 1;
                state.totalPrice -= currentItem.price;
            }
        },
        clearCard: (state, action) => {
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
export const { addItem, clearCard, clearItems, removeItem } = cartSlice.actions;
export const selectCard = (state: RootState) => state.cart;

export default cartSlice.reducer;
