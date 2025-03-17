export interface SlotsType {
    slotId?: number,
    workingTime: number,
    price: number,
    previousPrice: number,
    availableTime: number,
    createBy?: string,
    createOn?: string,
    offer: number
}

export interface userCredentialsType {
    name: string,
    email: string,
    role?: string
    uuid: string,
    createdAt?: string
}

export interface userAddressType {
    phone: string,
    city: string,
    state: string,
    pinCode: string,
    house: string,
    street: string,
    landmark: string,
    type: string
}

export interface apiData {
    success: boolean,
    data: any,
    message: string
}

export interface bookingType extends SlotsType, userAddressType, userCredentialsType { }