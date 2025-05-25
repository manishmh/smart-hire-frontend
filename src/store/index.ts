import { configureStore } from '@reduxjs/toolkit';
import backButtonReducer from './dashboard/dashboard-back-button-slice';
import incompletedFormsReducer from './dashboard/incompleted-forms-slice';
import newFormModalReducer from './dashboard/new-form-modal-slice';
import sidebarReducer from './dashboard/sidebar-slice';
import userReducer from './user-slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        sidebar: sidebarReducer,
        backButton: backButtonReducer,
        newFormModal: newFormModalReducer,
        incompletedForms: incompletedFormsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;