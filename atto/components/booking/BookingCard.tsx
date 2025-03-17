import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { bookingType } from '@/AppTypes'
import { s, vs } from 'react-native-size-matters'
import { formatTime } from '@/utils/helper'

interface BookingCardType {
    item: bookingType
}

const BookingCard: React.FC<BookingCardType> = ({ item }) => {
    return (
        <View style={{ width: "100%", position: "relative", backgroundColor: "#FFFFFF", padding: s(10) }}>

            <View style={{ flexDirection: "row", gap: vs(4) }}>
                <MaterialIcons name='delivery-dining' size={vs(50)} />
                <View>
                    <Text>Name : {item.name}</Text>
                    <Text>Email : {item.email}</Text>
                    <Text>Phone : {item.phone}</Text>
                </View>
            </View>

            <View style={{}}>
                <Text style={{ fontWeight: "800", fontSize: s(16) }}>Address</Text>
                <Text>{item.house},{item.street},{item.city}{item.state}{item.pinCode}</Text>
                <Text>phone : {item.phone}</Text>
            </View>

            <View style={{}}>
                <Text style={{ fontWeight: "800", fontSize: s(16) }}>Slot Details</Text>
                <Text>Price : ₹{item.price}</Text>
                <Text>Working Time : {item.workingTime} Mins</Text>
                <Text>Avaialble Time : {formatTime(item.availableTime)}</Text>
                <Text>Created By : {item.createBy} Mins</Text>
            </View>

        </View>
    )
}

export default BookingCard

const styles = StyleSheet.create({})