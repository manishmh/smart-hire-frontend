import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "..";

interface NewFormModalType {
    isNewFormModal: boolean
}

const initialState: NewFormModalType = {
    isNewFormModal: false 
}

export const newFormModalSlice = createSlice({
    name: "newFormModal",
    initialState,
    reducers: {
        toggleNewFormModal: (state) => {
            state.isNewFormModal = !state.isNewFormModal;
        },
        openNewFormModal: (state) => {
            state.isNewFormModal = true;
        },
        closeNewFormModal: (state) => {
            state.isNewFormModal = false;
        }
    }
})

export const useNewFormModal = () => {
    return useSelector((state: RootState) => state.newFormModal)
}

export const { toggleNewFormModal, openNewFormModal, closeNewFormModal } = newFormModalSlice.actions;
export default newFormModalSlice.reducer;