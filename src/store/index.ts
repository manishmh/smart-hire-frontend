import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user-slice';
import sidebarReducer from './dashboard/sidebar-slice'
import backButtonReducer from './dashboard/dashboard-back-button-slice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        sidebar: sidebarReducer,
        backButton: backButtonReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;