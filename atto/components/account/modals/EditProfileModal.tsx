import { AppConstants } from '@/AppConstants';
import { userAddressType, userCredentialsType } from '@/AppTypes';
import ColouredButton from '@/components/custom-widgets/ColouredButton';
import UnColouredButton from '@/components/custom-widgets/UnColouredButton';
import { updateUserProfile } from '@/services/api_services/firebase_api_services';
import { setUserAddressToAsyncStorage, setUserCredentialsToAsyncStorage } from '@/services/async_storage/async_storage_service';
import { setSelectedAddress, setUserCredential } from '@/Store/slices/authSlice';
import { AppDispatch, RootState } from '@/Store/store';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

interface EditProfileModalType {
    setShowModal: (value: boolean) => void
}


const EditProfileModal: React.FC<EditProfileModalType> = ({ setShowModal }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const { loggedInUser, selectedAddress } = useSelector((store: RootState) => store.auth);
    const [email, setEmail] = useState(loggedInUser?.email);
    const [name, setName] = useState(loggedInUser?.name);
    const [pinCode, setPinCode] = useState(selectedAddress?.pinCode);
    const [house, setHouse] = useState(selectedAddress?.house);
    const [street, setStreet] = useState(selectedAddress?.street);
    const [phone, setPhone] = useState(selectedAddress?.phone);
    const [landmark, setLandmark] = useState(selectedAddress?.landmark);
    const [city, setCity] = useState(selectedAddress?.city);
    const [state, setState] = useState(selectedAddress?.state);
    const dispatch = useDispatch<AppDispatch>();


    const updateProfile = async () => {
        setLoading(true);
        const updatedUserAddress: userAddressType = {
            city: city!,
            house: house!,
            landmark: landmark!,
            pinCode: pinCode!,
            state: state!,
            street: street!,
            type: selectedAddress?.type!,
            phone: phone!,
            id: selectedAddress?.id
        }
        const updatedUser: userCredentialsType = {
            email: email!,
            name: name!,
            role: loggedInUser?.role,
            uuid: loggedInUser?.uuid!,
        }
        const { data, success } = await updateUserProfile(updatedUserAddress, updatedUser);
        console.log(success)
        console.log("data : ", data)

        // STORING USER CREDENTAIL TO REDUX STORE
        dispatch(setUserCredential(data?.updatedUser as userCredentialsType));

        // STORING USER CREDENTAIL TO ASYNC STORAGE
        await setUserCredentialsToAsyncStorage(data?.updatedUser as userCredentialsType);

        // ADDING ADDRESS TO REDUX STORE
        dispatch(setSelectedAddress(data?.updatedUserAddress as userAddressType));

        // ADDING ADDRESS TO ASYNC STORAGE
        await setUserAddressToAsyncStorage(data?.updatedUserAddress as userAddressType);

        setLoading(false);
    }

    return (
        <Pressable onPress={() => setShowModal(false)} style={styles.modalContainer}>

            <Pressable onPress={() => { }} style={styles.createFormBox}>

                {/* NAME */}
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>Name</Text>
                    <TextInput value={name} onChangeText={setName} style={styles.input} />
                </View>

                {/* EMAIL */}
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>Email</Text>
                    <TextInput keyboardType='number-pad' value={email} onChangeText={setEmail} style={styles.input} />
                </View>

                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>Pin Code</Text>
                    <TextInput keyboardType="numeric" value={pinCode} onChangeText={setPinCode} style={styles.input} />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>house</Text>
                    <TextInput value={house} onChangeText={setHouse} style={styles.input} />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>street</Text>
                    <TextInput value={street} onChangeText={setStreet} style={styles.input} />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>landmark (optional)</Text>
                    <TextInput value={landmark} onChangeText={setLandmark} style={styles.input} />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>city</Text>
                    <TextInput value={city} onChangeText={setCity} style={styles.input} />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>phone</Text>
                    <TextInput value={phone} onChangeText={setPhone} style={styles.input} />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputTxt}>state</Text>
                    <TextInput value={state} onChangeText={setState} style={styles.input} />
                </View>

                <View style={styles.btnBox}>
                    {/* SIGN UP BUTTON */}
                    <ColouredButton handlePress={updateProfile} loading={loading} text='UPDATE' />

                    {/* HIDE MODAL BUTTON */}
                    <UnColouredButton handlePress={() => setShowModal(false)} loading={false} text='CANCEL' />
                </View>

            </Pressable>

        </Pressable>
    )
}

export default EditProfileModal

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
        fontSize: s(14)
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