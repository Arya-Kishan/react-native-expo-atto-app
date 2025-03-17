import { AppConstants } from '@/AppConstants';
import { SlotsType } from '@/AppTypes';
import TimePicker from '@/components/common/TimePicker';
import ColouredButton from '@/components/custom-widgets/ColouredButton';
import UnColouredButton from '@/components/custom-widgets/UnColouredButton';
import { createSlotsFireStore } from '@/services/api_services/firebase_api_services';
import { RootState } from '@/Store/store';
import { formatTime } from '@/utils/helper';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

interface CreateSlotModalType {
    setSlots: (value: any) => void,
    slots: SlotsType[],
    setShowModal: (value: boolean) => void
}


const CreateSlotModal: React.FC<CreateSlotModalType> = ({ setSlots, slots, setShowModal }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const { loggedInUser } = useSelector((store: RootState) => store.auth);

    const createSlots = async () => {
        setLoading(true);
        const newSlot: SlotsType = {
            availableTime: Number(availableTime),
            previousPrice: Number(previousPrice),
            price: Number(price),
            workingTime: Number(workingTime),
            createBy: loggedInUser?.uuid,
            createOn: (Date.now()).toString(),
            offer: Number(offer)
        }
        const { data, success } = await createSlotsFireStore(newSlot);
        if (success) {
            setSlots((prev: any) => [...prev, data]);
            setShowModal(false);
        }
        setLoading(false);
    }

    const workingTimingInMins = [30, 60, 90, 120, 180, 240, 300];

    const [availableTime, setavailableTime] = useState("");
    const [previousPrice, setPreviousPrice] = useState("");
    const [price, setPrice] = useState("");
    const [offer, setOffer] = useState("");
    const [workingTime, setWorkingTime] = useState<string>("");

    return (
        <View style={styles.modalContainer}>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.createFormBox}>

                {/* SELECTING WORKING TIME - FOR HOW MUCH IT WILL WORK  */}
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>Working Time</Text>
                    <View style={styles.workingTimeBox}>
                        {
                            workingTimingInMins.map((item, index) => (
                                <Pressable onPress={() => setWorkingTime(item.toString())} key={index} style={[styles.workingItem, Number(workingTime) == item && styles.workingItemColoured]}>
                                    <Text style={[styles.workingTimeTxt, Number(workingTime) == item && styles.workingTimeTxtColoured]}>{item} Mins</Text>
                                </Pressable>
                            ))
                        }
                    </View>
                </View>

                {/* AVAILABLE TIME */}
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>Available Time : {formatTime(Number(availableTime))}</Text>
                    <TimePicker selectedTime={availableTime} setSelectedTime={setavailableTime} />
                </View>

                {/* PRICE */}
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>Price</Text>
                    <TextInput placeholder='' keyboardType='number-pad' value={price} onChangeText={setPrice} style={styles.input} />
                </View>

                {/* PREVIOUS PRICE */}
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>Previous Price</Text>
                    <TextInput placeholder='' keyboardType='number-pad' value={previousPrice} onChangeText={setPreviousPrice} style={styles.input} />
                </View>

                {/* OFFER */}
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>Offer</Text>
                    <TextInput placeholder='' keyboardType='number-pad' value={offer} onChangeText={setOffer} style={styles.input} />
                </View>

                <View style={styles.btnBox}>
                    {/* SIGN UP BUTTON */}
                    <ColouredButton handlePress={createSlots} loading={loading} text='CREATE' />

                    {/* HIDE MODAL BUTTON */}
                    <UnColouredButton handlePress={() => setShowModal(false)} loading={false} text='CANCEL' />
                </View>

            </KeyboardAvoidingView>

        </View>
    )
}

export default CreateSlotModal

const styles = StyleSheet.create({
    modalContainer: {
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    createFormBox: {
        padding: s(30),
        borderRadius: s(40),
        gap: vs(10),
        backgroundColor: AppConstants.backgroundColorWhite,
        width: "85%",
        elevation: 10,
    },
    workingTimeBox: {
        flexDirection: "row",
        gap: s(10),
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    workingItem: {
        width: "46%",
        paddingHorizontal: s(10),
        paddingVertical: vs(3),
        borderColor: AppConstants.borderColor1,
        borderWidth: 2,
        borderRadius: s(10)
    },
    workingItemColoured: {
        backgroundColor: AppConstants.backgroundColor1,
    },
    workingTimeTxt: {
        fontWeight: "500",
        color: AppConstants.textColor2,
        textAlign: "center"
    },
    workingTimeTxtColoured: {
        color: AppConstants.textColor1
    },
    inputBox: {
        gap: vs(10),
    },
    inputTxt: {
        fontWeight: "700",
        color: AppConstants.textColor2,
        fontSize: s(16)
    },
    input: {
        borderWidth: 2,
        borderColor: AppConstants.borderColorPrimary,
        borderRadius: s(6),
        padding: s(10),
        fontSize: s(16)
    },
    colouredBtn: {
        height: vs(40),
        width: "100%",
        paddingHorizontal: s(15),
        paddingVertical: vs(10),
        borderWidth: 2,
        borderColor: AppConstants.borderColor1,
        borderRadius: s(20),
        marginTop: vs(30),
    },
    colouredBtnTxt: {
        color: AppConstants.textColor1,
        textAlign: "center",
        fontWeight: "500"
    },
    btnBox: {
        gap: vs(10),
        paddingTop: vs(10)
    },

})