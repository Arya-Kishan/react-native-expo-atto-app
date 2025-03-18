import { AppConstants } from '@/AppConstants'
import { SlotsType } from '@/AppTypes'
import { sendNotificationToAllAdmin } from '@/services/api_services/express_api_services'
import { createBooking } from '@/services/api_services/firebase_api_services'
import { RootState } from '@/Store/store'
import { formatTime } from '@/utils/helper'
import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { s, vs } from 'react-native-size-matters'
import { useSelector } from 'react-redux'

interface SlotCardType { item: SlotsType, index: number, reFetchAllSlots: () => void }

const SlotCard: React.FC<SlotCardType> = ({ item, index, reFetchAllSlots }) => {
    const [loading, setLoading] = useState(false);
    const { loggedInUser, selectedAddress } = useSelector((state: RootState) => state.auth);

    const addBooking = async () => {
        setLoading(true);
        const result = await createBooking({
            uuid: loggedInUser!.uuid,
            name: loggedInUser!.name,
            email: loggedInUser!.email,

            phone: selectedAddress!.phone,
            pinCode: selectedAddress!.pinCode,
            house: selectedAddress!.house,
            street: selectedAddress!.street,
            landmark: selectedAddress!.landmark,
            city: selectedAddress!.city,
            state: selectedAddress!.state,
            type: selectedAddress!.type,

            availableTime: item.availableTime,
            previousPrice: item.previousPrice,
            price: item.price,
            workingTime: item.workingTime,
            offer: item.offer,
            slotId: item.id,

            bookingType: "booking",
            isBooked: false,

            createAt: (new Date()).toString(),
        });

        setLoading(false);

        // SENIDNG NOTIFICATION TO ALL ADMINS
        if (result.success) {
            reFetchAllSlots();
            // sendNotificationToAllAdmin(loggedInUser?.name!, Date.now());
        }

    }

    return (
        <View style={styles.main}>

            {/* OFFER */}
            <View style={styles.offerBox}>
                <Text style={styles.offerTxt}>{item.offer} %</Text>
            </View>
            {/* TIME IN MINS */}
            <Text style={styles.timeInMins}>{item.workingTime} mins</Text>
            {/* PRICE */}
            <Text style={styles.price}>₹{item.price} <Text style={styles.previousPrice}>₹{item.previousPrice}</Text></Text>
            {/* AVAILABLE TIMING */}
            <Text style={styles.availableTimeTxt1}>Avaialble in <Text style={styles.availableTimeTxt2}>15 mins</Text></Text>
            {/* BOOK BUTTON */}
            <TouchableOpacity onPress={() => { item.isBooked ? "" : addBooking() }} style={[styles.bookBtn, item.isBooked && styles.bookedBtn]}>
                {
                    loading
                        ?
                        <ActivityIndicator size={20} color={AppConstants.loaderColorViolet} />
                        :
                        <Text style={[styles.bookBtnTxt, item.isBooked && styles.bookedTxt]}>{item.isBooked ? "Booked" : "Book"}</Text>
                }
            </TouchableOpacity>

        </View>
    )
}

export default SlotCard

const styles = StyleSheet.create({
    main: {
        width: s(158),
        gap: vs(5),
        borderColor: AppConstants.borderColor1,
        borderWidth: 2,
        paddingHorizontal: s(15),
        paddingBottom: s(15),
        paddingTop: s(35),
        borderRadius: s(15)
    },
    timeInMins: {
        fontSize: 25,
        fontWeight: "bold"
    },
    offerBox: {
        position: "absolute",
        top: 0,
        left: "50%",
        width: "60%",
        transform: [{ translateX: "-25%" }],
        borderBottomLeftRadius: s(10),
        borderBottomRightRadius: s(10),
        backgroundColor: AppConstants.backgroundColorOffer,
        paddingHorizontal: s(10),
        paddingVertical: s(6),
    },
    offerTxt: {
        fontWeight: "bold",
        textAlign: "center",
        color: AppConstants.textColor1
    },
    price: {
        fontWeight: "800"
    },
    previousPrice: {
        textDecorationLine: "line-through"
    },
    availableTimeTxt1: {

    },
    availableTimeTxt2: {
        color: AppConstants.textColor2,
        fontWeight: "bold"
    },
    bookBtn: {
        borderColor: AppConstants.textColor2,
        borderWidth: 2,
        paddingHorizontal: s(10),
        paddingVertical: s(5),
        borderRadius: s(6),
        marginTop: vs(10)
    },
    bookBtnTxt: {
        color: AppConstants.textColor2,
        textAlign: "center",
        fontWeight: "bold"
    },
    bookedBtn: {
        borderColor: AppConstants.borderColorGray
    },
    bookedTxt: {
        color: AppConstants.textColorGray,
    },
})