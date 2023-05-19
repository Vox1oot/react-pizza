import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';

interface Ipizza {
    id: number;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

type statusType = 'LOADING' | 'SUCCESS' | 'ERROR';

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async (url: string) => {
        const { data } = await axios.get(url);
        return data;
    }
);

const initialState: { items: Array<Ipizza>; status: statusType | '' } = {
    items: [],
    status: ''
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = 'LOADING';
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'SUCCESS';
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = 'ERROR';
            state.items = [];
        });
    }
});

// Action creators are generated for each case reducer function
export const selectPizza = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
