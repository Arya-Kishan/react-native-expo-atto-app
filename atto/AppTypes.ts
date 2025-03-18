export type loaderType = "idle" | "loading" | "success" | "error"

export interface SlotsType {
    slotId?: number,
    workingTime: number,
    price: number,
    previousPrice: number,
    availableTime: number,
    createBy?: string,
    createOn?: string,
    offer: number,
    id?: string,
    isBooked?: boolean
}

export interface userCredentialsType {
    name: string,
    email: string,
    role?: string
    uuid: string,
    createdAt?: string,
    id?: string,
    fcmToken?: string
}

export interface userAddressType {
    phone: string,
    city: string,
    state: string,
    pinCode: string,
    house: string,
    street: string,
    landmark: string,
    type: string,
    id?: string
}

export interface apiData {
    success: boolean,
    data: any,
    message: string
}

export interface bookingType {
    uuid: string,
    name: string,
    email: string,

    phone: string,
    pinCode: string,
    house: string,
    street: string,
    landmark: string,
    city: string,
    state: string,
    type: string,

    availableTime: number,
    previousPrice: number,
    price: number,
    workingTime: number,
    offer: number,
    slotId?: string

    bookingType?: "booking" | "preBooking",
    isBooked?: boolean

    createAt: string,
}

export interface preBookingType {
    uuid: string,
    name: string,
    email: string,

    phone: string,
    pinCode: string,
    house: string,
    street: string,
    landmark: string,
    city: string,
    state: string,
    type: string,

    availableTime: number,
    previousPrice: number,
    price: number,
    workingTime: number,
    offer: number,
    slotId?: string

    dateTimeOfService?: string,
    bookingType?: "booking" | "preBooking"

    createAt: string,
}