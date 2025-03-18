import { AppConstants } from '@/AppConstants';
import ColouredButton from '@/components/custom-widgets/ColouredButton';
import UnColouredButton from '@/components/custom-widgets/UnColouredButton';
import { sendIssueEmail } from '@/services/api_services/express_api_services';
import { RootState } from '@/Store/store';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

interface HelpModalType {
    setShowModal: (value: boolean) => void
}


const HelpModal: React.FC<HelpModalType> = ({ setShowModal }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const { loggedInUser } = useSelector((store: RootState) => store.auth);
    const [email, setEmail] = useState(loggedInUser?.email);
    const [problem, setProblem] = useState("");

    const sendEmail = async () => {
        setLoading(true);
        await sendIssueEmail(email!, problem);
        setLoading(false);
    }

    return (
        <Pressable onPress={() => setShowModal(false)} style={styles.modalContainer}>

            <Pressable onPress={() => { }} style={styles.modalBox}>

                <Text style={styles.headerTxt}>Need Help ?</Text>

                <View style={styles.inputContainer}>

                    {/* EMAIL */}
                    <View style={styles.inputBox}>
                        <Text style={styles.inputTxt}>Email</Text>
                        <TextInput value={email} onChangeText={setEmail} style={styles.input} />
                    </View>

                    {/* PROBLEM */}
                    <View style={styles.inputBox}>
                        <Text style={styles.inputTxt}>Your Issue</Text>
                        <TextInput multiline value={problem} onChangeText={setProblem} style={[styles.input, styles.inputIssue]} />
                    </View>

                </View>

                <ColouredButton handlePress={sendEmail} loading={loading} text='Send Email' />
                <UnColouredButton handlePress={() => { setShowModal(false) }} loading={false} text='Close' />


            </Pressable>

        </Pressable>
    )
}

export default HelpModal

const styles = StyleSheet.create({
    modalContainer: {
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        padding: s(30),
        borderRadius: s(40),
        gap: vs(30),
        backgroundColor: AppConstants.backgroundColorWhite,
        width: "85%",
        elevation: 10,
    },
    headerTxt: {
        fontSize: s(30),
        fontWeight: "bold",
        textAlign: "center"
    },
    inputContainer: {
        gap: vs(10)
    },
    inputBox: {
        gap: vs(5),
    },
    inputTxt: {
        fontWeight: "700",
        color: AppConstants.textColor2,
        fontSize: s(14),
        textTransform: "capitalize"
    },
    input: {
        borderWidth: 2,
        borderColor: AppConstants.borderColorViolet,
        borderRadius: s(6),
        padding: s(5),
        fontSize: s(14),
        textAlignVertical: "top"
    },
    inputIssue: {
        height: 100, // Adjust as needed, this is just an example
        minHeight: 60
    },

})