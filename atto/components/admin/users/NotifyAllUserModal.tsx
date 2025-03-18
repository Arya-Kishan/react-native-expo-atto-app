import { AppConstants } from '@/AppConstants';
import ColouredButton from '@/components/custom-widgets/ColouredButton';
import UnColouredButton from '@/components/custom-widgets/UnColouredButton';
import { sendNotificationToAllUsers } from '@/services/api_services/express_api_services';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';

interface NotifyAllUserModalType {
    setShowModal: (value: boolean) => void
}


const NotifyAllUserModal: React.FC<NotifyAllUserModalType> = ({ setShowModal }) => {

    const [loading, setLoading] = useState<boolean>(false);

    const sendNotification = async () => {
        setLoading(true);
        await sendNotificationToAllUsers(title, description);
        setLoading(false);
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <View style={styles.modalContainer}>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.createFormBox}>

                {/* PRICE */}
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>Title</Text>
                    <TextInput placeholder='' value={title} onChangeText={setTitle} style={styles.input} />
                </View>

                {/* PREVIOUS PRICE */}
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>Description</Text>
                    <TextInput placeholder='' value={description} onChangeText={setDescription} style={styles.input} />
                </View>

                <View style={styles.btnBox}>
                    {/* SEND UP BUTTON */}
                    <ColouredButton handlePress={sendNotification} loading={loading} text='SEND NOTIFICATION' />

                    {/* HIDE MODAL BUTTON */}
                    <UnColouredButton handlePress={() => setShowModal(false)} loading={false} text='CLOSE' />
                </View>

            </KeyboardAvoidingView>

        </View>
    )
}

export default NotifyAllUserModal

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
        borderColor: AppConstants.borderColorViolet,
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