import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { RootState } from ".."

interface FormSaveStatus {
    saved: boolean
}

const initialState: FormSaveStatus = {
    saved: false
}

export const formSaveStatusSlice = createSlice({
    name: "formSaveStatus",
    initialState,
    reducers: {
        toggleFormSaveStatus: (state) => {
            state.saved = !state.saved
        },
        trueFormSaveStatus: (state) => {
            state.saved  = true
        },
        falseFormSaveStatus: (state) => {
            state.saved  = false
        },
    }
})

export const useFormSaveStatus = () => {
    return useSelector((state: RootState) => state.formSaveStatus.saved)
}

export const { toggleFormSaveStatus, trueFormSaveStatus, falseFormSaveStatus } = formSaveStatusSlice.actions;
export default formSaveStatusSlice.reducer