import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ContactState = {
  loading: false,
  success: false,
  error: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    sendStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },

    sendSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },

    sendFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { sendStart, sendSuccess, sendFailure } =
  contactSlice.actions;

export default contactSlice.reducer;