import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TrailerState {
    isOpen: boolean;
    trailerUrl: string | null
}

const initialState: TrailerState = {
    isOpen: false,
    trailerUrl: null
}

export const trailerSlice = createSlice({
    name: 'trailer',
    initialState,
    reducers: {
        openTrailerModal: (state, action: PayloadAction<string>) => {
            state.isOpen = true;
            state.trailerUrl = action.payload
        },
        closeTrailerModal: (state) => {
            state.isOpen = false;
            state.trailerUrl = null;
        },
    },
})

export const { openTrailerModal, closeTrailerModal } = trailerSlice.actions;
export default trailerSlice.reducer;