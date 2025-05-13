import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { RootState } from ".."

interface SidebarOpen {
    isOpen: boolean
}

const initialState: SidebarOpen = {
    isOpen: true,
}

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen= !state.isOpen
        },
        openSidebar: (state) => {
            state.isOpen = true;
        },
        closeSidebar: (state) => {
            state.isOpen = false;
        }
    }
})

export const useSidebar = () => {
    return useSelector((state: RootState) => state.sidebar.isOpen)
}

export const { toggleSidebar, openSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;