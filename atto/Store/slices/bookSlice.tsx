import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/Store/store'
import { bookingType, loaderType, SlotsType, userAddressType, userCredentialsType } from '@/AppTypes'

interface bookState {
    value: number,
    slots: SlotsType[] | null,
    bookings: bookingType[] | null,
    slotsLoader: loaderType
}

const initialState: bookState = {
    value: 0,
    bookings: null,
    slots: null,
    slotsLoader: "idle"
}

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setSlots: (state, action: PayloadAction<SlotsType[] | null>) => {
            state.slots = action.payload
        },
        setBookings: (state, action: PayloadAction<bookingType[] | null>) => {
            state.bookings = action.payload
        },
        setSlotLoader: (state, action: PayloadAction<loaderType>) => {
            state.slotsLoader = action.payload
        },
    },
})

export const { setSlots, setBookings, setSlotLoader } = bookSlice.actions

export const selectCount = (state: RootState) => state.book.value

export default bookSlice.reducer