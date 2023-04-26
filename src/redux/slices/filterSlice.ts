import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface FilterState {
    categoryID: number;
    currentPage: number;
    sort: {
        id: number;
        name: string;
        type: string;
    };
}

const initialState: FilterState = {
    categoryID: 0,
    currentPage: 1,
    sort: { id: 0, name: 'популярности', type: 'rating' }
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        handleCategoryID: (state, action) => {
            state.categoryID = action.payload;
        },
        handleSortID: (state, action) => {
            state.sort = action.payload;
        },
        handleCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { handleCategoryID, handleSortID, handleCurrentPage } =
    filterSlice.actions;
export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
