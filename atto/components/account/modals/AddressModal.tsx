import { AppConstants } from '@/AppConstants';
import { RootState } from '@/Store/store';
import React from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

interface AddressModalType {
    setShowModal: (value: boolean) => void
}


const AddressModal: React.FC<AddressModalType> = ({ setShowModal }) => {

    const { loggedInUser, selectedAddress } = useSelector((store: RootState) => store.auth);

    return (
        <Pressable onPress={() => setShowModal(false)} style={styles.modalContainer}>

            <Pressable onPress={() => { }} style={styles.modalBox}>

                <Text style={styles.headerTxt}>ADDRESS</Text>

                <Text style={styles.title}>
                    city :
                    <Text style={styles.subTitle}> {selectedAddress?.city}
                    </Text>
                </Text>
                <Text style={styles.title}>
                    house :
                    <Text style={styles.subTitle}> {selectedAddress?.house}
                    </Text>
                </Text>
                <Text style={styles.title}>
                    landmark :
                    <Text style={styles.subTitle}> {selectedAddress?.landmark}
                    </Text>
                </Text>
                <Text style={styles.title}>
                    phone :
                    <Text style={styles.subTitle}> {selectedAddress?.phone}
                    </Text>
                </Text>
                <Text style={styles.title}>
                    pinCode :
                    <Text style={styles.subTitle}> {selectedAddress?.pinCode}
                    </Text>
                </Text>
                <Text style={styles.title}>
                    state :
                    <Text style={styles.subTitle}> {selectedAddress?.state}
                    </Text>
                </Text>
                <Text style={styles.title}>
                    type :
                    <Text style={styles.subTitle}> {selectedAddress?.type}
                    </Text>
                </Text>

                <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeBtn}>
                    <Text style={styles.closeBtnTxt}>CLOSE</Text>
                </TouchableOpacity>

            </Pressable>

        </Pressable>
    )
}

export default AddressModal

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
        gap: vs(10),
        backgroundColor: AppConstants.backgroundColorWhite,
        width: "85%",
        elevation: 10,
    },
    headerTxt: {
        fontSize: s(25),
        fontWeight: "bold",
        textAlign: "center",
        color: AppConstants.textColor2
    },
    title: {
        fontWeight: '500',
        fontSize: s(18),
        textTransform: "capitalize"
    },
    subTitle: {
        fontWeight: '400',
        fontSize: s(14)
    },
    closeBtn: {
        width: "100%",
        backgroundColor: AppConstants.backgroundColor1,
        padding: s(10),
        borderRadius: AppConstants.buttonBorderRadius,
        justifyContent: "center",
        alignItems: "center",
        marginTop: vs(20)
    },
    closeBtnTxt: {
        color: AppConstants.textColor1
    },

})