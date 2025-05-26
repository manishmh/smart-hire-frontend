import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";
import { Form } from "@/schema/form-schema-type";

interface incompletedFormsProps {
  form: Form[];
}

const initialState: incompletedFormsProps = {
  form: [],
};

export const incompletedFormsSlice = createSlice({
  name: "incompletedForms",
  initialState,
  reducers: {
    handleIncompletedForm: (state, action: PayloadAction<Form[]>) => {
      state.form = action.payload; 
    },
    clearIncompletedForm: (state) => {
      state.form = [];
    },
  },
});

export const useIncompletedForms = () => {
  return useSelector((state: RootState) => state.incompletedForms.form);
};

export const { handleIncompletedForm, clearIncompletedForm } =
  incompletedFormsSlice.actions;
export default incompletedFormsSlice.reducer;
