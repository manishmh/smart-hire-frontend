import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

interface BackButtonState {
  history: string[];
}

const initialState: BackButtonState = {
  history: [],
};

const backButtonSlice = createSlice({
  name: "backButton",
  initialState,
  reducers: {
    addHistory(state, action: PayloadAction<string>) {
      const last = state.history[state.history.length - 1];
      if (last !== action.payload) {
        state.history.push(action.payload);
      }
    },
    removeHistory(state) {
      state.history.pop();
    },
    clearHistory(state) {
      state.history = [];
    },
  },
});

export const useHistory = () => {
    return useSelector((state: RootState) => state.backButton.history)
}

export const { addHistory, removeHistory, clearHistory } = backButtonSlice.actions;
export default backButtonSlice.reducer;

