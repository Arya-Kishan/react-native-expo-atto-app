import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/Store/store'
import { userAddressType, userCredentialsType } from '@/AppTypes'

interface authState {
    value: number,
    loggedInUser: null | userCredentialsType,
    selectedAddress: null | userAddressType,
    userState: "login" | "signup" | null
}

const initialState: authState = {
    value: 0,
    loggedInUser: null,
    selectedAddress: null,
    userState: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserCredential: (state, action: PayloadAction<userCredentialsType | null>) => {
            state.loggedInUser = action.payload
        },
        setSelectedAddress: (state, action: PayloadAction<userAddressType>) => {
            state.selectedAddress = action.payload
        },
        setUserState: (state, action: PayloadAction<"login" | "signup" | null>) => {
            state.userState = action.payload
        },
    },
})

export const { setUserCredential, setSelectedAddress, setUserState } = authSlice.actions

export const selectCount = (state: RootState) => state.auth.value

export default authSlice.reducer