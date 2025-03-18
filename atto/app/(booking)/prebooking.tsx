import { ActivityIndicator, Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { s, vs } from 'react-native-size-matters'
import { AppConstants } from '@/AppConstants'
import { convertDateTimeIntoJSDate, getNextFiveDays } from '@/utils/helper'
import { RootState } from '@/Store/store'
import { useSelector } from 'react-redux'
import { bookingType, preBookingType, SlotsType } from '@/AppTypes'
import { createBooking } from '@/services/api_services/firebase_api_services'
import { sendNotificationToAllAdmin } from '@/services/api_services/express_api_services'
import ColouredButton from '@/components/custom-widgets/ColouredButton'
import useDevice from '@/hooks/useDevice'
import { useRouter } from 'expo-router'
import { setSlots } from '@/Store/slices/bookSlice'

const timings = {
    AM: ["06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
    PM: ["12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00"],
}

type meridiemType = "AM" | "PM"
interface dateType {
    day?: string,
    date?: string,
}
interface timeType {
    time?: string,
    meridien?: string,
}

const Prebooking = () => {
    const dates = getNextFiveDays();
    const { slots } = useSelector((store: RootState) => store.book);
    const [loading, setLoading] = useState(false);
    const [meridiem, setMeridiem] = useState<meridiemType>("AM");
    const [meridiemData, setMeridiemData] = useState(timings.AM);
    const [selectedSlot, setSelectedSlot] = useState<Partial<SlotsType>>({});
    const [selectedDate, setSelectedDate] = useState<dateType>(dates[0]);
    const [selectedTime, setSelectedTime] = useState<timeType>({});
    const { bottomNotchHeight } = useDevice();
    const router = useRouter();

    const { loggedInUser, selectedAddress } = useSelector((state: RootState) => state.auth);

    const handleSelectTime = (item: string) => {
        setSelectedTime({ meridien: meridiem, time: item });
    }

    const handleSelectDate = (item: dateType) => {
        setSelectedDate(item);
    }

    const createPreBooking = async () => {

        if (!selectedDate.date || !selectedTime.time || !selectedSlot) {
            Alert.alert("Select all fields", "All Required Fileds are not selected");
            return;
        }

        const newPreBooking: preBookingType = {
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

            availableTime: selectedSlot.availableTime!,
            previousPrice: selectedSlot.previousPrice!,
            price: selectedSlot.price!,
            workingTime: selectedSlot.workingTime!,
            offer: selectedSlot.offer!,

            dateTimeOfService: convertDateTimeIntoJSDate({
                date: selectedDate.date,
                day: selectedDate.day!,
                meridian: selectedTime.meridien!,
                time: selectedTime.time
            }),
            bookingType: "preBooking",

            createAt: (new Date()).toString(),
        }

        console.log("newPreBooking : ", newPreBooking)

        setLoading(true);

        const result = await createBooking(newPreBooking);

        setLoading(false);

        // SENIDNG NOTIFICATION TO ALL ADMINS
        if (result.success) {
            sendNotificationToAllAdmin(loggedInUser?.name!, Date.now());
            router.push("/(tabs)")
        }

    }

    const handleChangeMeridiem = (meridiem: string) => {
        if (meridiem == "AM") {
            setMeridiemData(timings.AM);
            setMeridiem("AM");
        } else {
            setMeridiem("PM");
            setMeridiemData(timings.PM);
        }
    }

    useEffect(() => {
        if (slots!.length > 0) {
            setSelectedSlot(slots![0]);
        }
    }, [slots])

    return (
        <View style={{ flex: 1 }}>

            {/* HEADER  */}
            <View style={styles.header}>
                <Text style={styles.headerTxt}>Prebook</Text>
            </View>

            {
                slots && slots?.length > 0
                    ?
                    <>
                        <ScrollView contentContainerStyle={styles.scrollView}>

                            <Text style={{ fontSize: s(18), fontWeight: "600" }}>Choose service details</Text>

                            {/* SELECT DATE OF SERVICE */}
                            <View style={styles.serviceContainer}>

                                <Text style={styles.containerHeadingTxt}>Select date of service</Text>

                                <FlatList
                                    data={dates}
                                    renderItem={({ item }) => (
                                        <Pressable onPress={() => handleSelectDate(item)} style={[styles.dateCard, selectedDate.date == item.date && styles.selectedDateCard]}>
                                            <Text style={[selectedDate.date == item.date && styles.selectedText]}>{item.day}</Text>
                                            <Text style={[styles.dateTxt, selectedDate.date == item.date && styles.selectedText]}>{item.date}</Text>
                                        </Pressable>
                                    )}
                                    keyExtractor={(item, index) => (`${item.date}`)}
                                    horizontal
                                    contentContainerStyle={{ gap: s(10) }}
                                    showsHorizontalScrollIndicator={false}
                                />

                            </View>


                            {/* SELECT DURATION OF SERVICE */}
                            <View style={styles.serviceContainer}>

                                <Text style={styles.containerHeadingTxt}>Select duration of service</Text>

                                <FlatList
                                    data={slots ?? []}
                                    renderItem={({ item }) => (
                                        <Pressable onPress={() => setSelectedSlot(item)} style={[styles.durationContainer, selectedSlot.id == item.id && styles.selectedDurationContainer]}>

                                            <Text style={[styles.minTxt, selectedSlot.id == item.id && styles.selectedText]}>{item.workingTime} Mins</Text>

                                            <View style={styles.pricingBox}>
                                                <Text style={styles.previousPriceTxt}>₹{item.previousPrice}</Text>
                                                <Text style={[selectedSlot.id == item.id && styles.selectedText]}>₹{item.price}</Text>
                                            </View>

                                        </Pressable>
                                    )}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => (`${item.id}`)}
                                    contentContainerStyle={{ gap: s(10) }}
                                />
                                <View style={styles.together}>
                                    <Text style={styles.togetherTxt}>Book Hourly & avail multiple services together</Text>
                                </View>

                            </View>

                            {/* SELECT START TIME OF SERVICE */}
                            <View style={styles.serviceContainer}>

                                {/* SELECT AM PM A,D HEADING */}
                                <View style={styles.timeHeading}>
                                    <Text style={styles.containerHeadingTxt}>Select start time of service</Text>
                                    <View style={styles.meridienBox}>
                                        <Pressable onPress={() => handleChangeMeridiem("AM")} style={[styles.meridienTxtBox, meridiem == "AM" && styles.selectedMeridienTxtBox]}>
                                            <Text style={[styles.meridienTxt, meridiem == "AM" && styles.selectedText]}>AM</Text>
                                        </Pressable>
                                        <Pressable onPress={() => handleChangeMeridiem("PM")} style={[styles.meridienTxtBox, meridiem == "PM" && styles.selectedMeridienTxtBox]}>
                                            <Text style={[styles.meridienTxt, meridiem == "PM" && styles.selectedText]}>PM</Text>
                                        </Pressable>
                                    </View>
                                </View>


                                {/* ALL TIMINGS  */}
                                <View style={styles.timingContainer}>
                                    {
                                        meridiemData.map((item) => (
                                            <Pressable onPress={() => handleSelectTime(item)} key={item} style={[styles.timingBox, selectedTime.time == item && styles.selectedTimingBox]}>
                                                <Text style={[styles.timingTxt, selectedTime.time == item && styles.selectedText]}>{item}</Text>
                                            </Pressable>
                                        ))
                                    }
                                </View>

                            </View>

                        </ScrollView>

                        <View style={{ width: "100%", height: vs(60), position: "absolute", bottom: bottomNotchHeight, left: 0, backgroundColor: AppConstants.backgroundColorGray, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: s(20) }}>

                            <View style={styles.pricingBox}>
                                <Text style={{ fontSize: s(14), fontWeight: "600", textDecorationLine: "line-through" }}>₹{selectedSlot.previousPrice}</Text>
                                <Text style={{ fontSize: s(14), fontWeight: "600" }}>₹{selectedSlot.price}</Text>
                            </View>

                            <View style={{ width: "50%" }}>
                                <ColouredButton handlePress={createPreBooking} loading={loading} text='Confirm Booking' />
                            </View>

                        </View>
                    </>
                    :
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={40} color={AppConstants.primaryColor} />
                    </View>
            }

        </View>
    )
}

export default Prebooking

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: vs(80),
        backgroundColor: AppConstants.backgroundColor1,
        borderBottomLeftRadius: s(30),
        borderBottomRightRadius: s(30),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: AppConstants.screenPadding,
    },
    headerTxt: {
        textAlign: "center",
        fontSize: s(25),
        fontWeight: "800",
        color: AppConstants.textColor1
    },
    scrollView: {
        paddingHorizontal: AppConstants.screenPadding,
        gap: AppConstants.gapBetweenSections,
        paddingBottom: vs(60),
        paddingTop: vs(10)
    },
    serviceContainer: {
        borderWidth: 2,
        borderColor: AppConstants.borderColor1,
        borderRadius: s(10),
        gap: AppConstants.gapBetweenSections,
        padding: s(12)
    },
    containerHeadingTxt: {
        fontSize: s(14),
        fontWeight: "600"
    },
    dateCard: {
        width: vs(60),
        borderWidth: 2,
        borderColor: AppConstants.borderColor1,
        padding: s(10),
        borderRadius: s(10),
        justifyContent: "center",
        alignItems: "center",
        gap: vs(5)
    },
    selectedDateCard: {
        backgroundColor: AppConstants.backgroundColorViolet,
        borderWidth: 0,
    },
    dateTxt: {
        fontSize: s(16),
        fontWeight: "bold"
    },
    durationContainer: {
        width: vs(100),
        height: vs(70),
        borderWidth: 2,
        borderColor: AppConstants.borderColor1,
        padding: s(10),
        borderRadius: s(10),
        justifyContent: "center",
        alignItems: "flex-start",
        gap: vs(10)
    },
    selectedDurationContainer: {
        backgroundColor: AppConstants.backgroundColorViolet,
        borderWidth: 0,
    },
    minTxt: {
        fontSize: s(16),
        fontWeight: "800"
    },
    pricingBox: {
        flexDirection: "row",
        gap: s(10)
    },
    previousPriceTxt: {
        textDecorationLine: "line-through",
        color: "#C9C9C9FF"
    },
    together: {
        padding: s(10),
        backgroundColor: AppConstants.backgroundColorGray,
        borderRadius: AppConstants.sectionBorderRadius
    },
    togetherTxt: {
        fontWeight: '500'
    },
    timeHeading: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    meridienBox: {
        flexDirection: "row",
        backgroundColor: AppConstants.backgroundColorGray,
        borderRadius: AppConstants.buttonBorderRadius,
        padding: s(5)
    },
    meridienTxtBox: {
        paddingHorizontal: s(15),
        paddingVertical: vs(4),
        borderRadius: s(10),
        backgroundColor: AppConstants.buttonColorGray
    },
    selectedMeridienTxtBox: {
        backgroundColor: AppConstants.buttonColorViolet
    },
    meridienTxt: {
        fontSize: s(10),
        color: AppConstants.textColorBlack
    },
    timingContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: s(6)
    },
    timingBox: {
        width: "28%",
        borderWidth: 2,
        borderColor: AppConstants.borderColor1,
        padding: s(10),
        borderRadius: s(10),
        justifyContent: "center",
        alignItems: "center",
        gap: vs(5)
    },
    selectedTimingBox: {
        borderWidth: 0,
        backgroundColor: AppConstants.backgroundColorViolet
    },
    timingTxt: {
        fontSize: s(11),
        fontWeight: "500"
    },
    selectedText: {
        color: AppConstants.textColorWhite
    },
})