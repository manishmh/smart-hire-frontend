import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";
import { Form } from "@/schema/form-schema-type";

interface FormState {
    data: Form | null 
}

const initialState: FormState = {
    data: null,
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Form>) => {
      state.data = action.payload;
    },
    clearFormData: (state) => {
      state.data = null;
    },
  },
});

export const useFormData =  () => {
    return useSelector((state: RootState) => state.form.data);
}

export const { setFormData, clearFormData } = formSlice.actions;
export default formSlice.reducer;