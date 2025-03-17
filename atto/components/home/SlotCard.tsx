import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { s, vs } from 'react-native-size-matters'
import { AppConstants } from '@/AppConstants'
import { RootState } from '@/Store/store'
import { useSelector } from 'react-redux'
import { createBooking } from '@/services/api_services/firebase_api_services'
import { SlotsType } from '@/AppTypes'
import { Timestamp } from "firebase/firestore";
import { formatTime } from '@/utils/helper'

interface SlotCardType { item: SlotsType, index: number }

const SlotCard: React.FC<SlotCardType> = ({ item, index }) => {
    const [loading, setLoading] = useState(false);
    const { loggedInUser, selectedAddress } = useSelector((state: RootState) => state.auth);

    const addBooking = async () => {
        setLoading(true);
        await createBooking({
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
            offer: item.offer
        });
        setLoading(false);
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
            <Text style={styles.availableTimeTxt1}>Avaialble at <Text style={styles.availableTimeTxt2}>{formatTime(item?.availableTime)}</Text></Text>
            {/* BOOK BUTTON */}
            <TouchableOpacity onPress={addBooking} style={styles.bookBtn}>
                {
                    loading
                        ?
                        <ActivityIndicator size={20} color={AppConstants.iconColor1} />
                        :
                        <Text style={styles.bookBtnTxt}>Book</Text>
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
})