import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from ".";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  emailVerified: string;
  isTwoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        }
    }
})

export const useUser = () => {
    return useSelector((state: RootState) => state.user.user);
}

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;