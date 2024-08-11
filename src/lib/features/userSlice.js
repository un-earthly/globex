import { createSlice } from '@reduxjs/toolkit';
import { generateUser } from '../faker';

const initialState = {
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCurrentUser, setLoading, setError, logout } = userSlice.actions;

export default userSlice.reducer;