import { AppConstants } from '@/AppConstants';
import { userAddressType, userCredentialsType } from '@/AppTypes';
import ColouredButton from '@/components/custom-widgets/ColouredButton';
import UnColouredButton from '@/components/custom-widgets/UnColouredButton';
import { updateUserProfile } from '@/services/api_services/firebase_api_services';
import { setUserAddressToAsyncStorage, setUserCredentialsToAsyncStorage } from '@/services/async_storage/async_storage_service';
import { setSelectedAddress, setUserCredential } from '@/Store/slices/authSlice';
import { AppDispatch, RootState } from '@/Store/store';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

interface EditProfileType {
}


const EditProfile: React.FC<EditProfileType> = ({ }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
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

        // STORING USER CREDENTAIL TO REDUX STORE
        dispatch(setUserCredential(data?.updatedUser as userCredentialsType));

        // STORING USER CREDENTAIL TO ASYNC STORAGE
        await setUserCredentialsToAsyncStorage(data?.updatedUser as userCredentialsType);

        // ADDING ADDRESS TO REDUX STORE
        dispatch(setSelectedAddress(data?.updatedUserAddress as userAddressType));

        // ADDING ADDRESS TO ASYNC STORAGE
        await setUserAddressToAsyncStorage(data?.updatedUserAddress as userAddressType);

        if (success) {
            router.push("/(tabs)/account");
        }
        setLoading(false);
    }

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.header}>
                <Text style={styles.headerTxt}>Edit Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.createFormBox}>

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
                </View>

            </ScrollView>
        </View>

    )
}

export default EditProfile

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
    createFormBox: {
        padding: s(30),
        gap: vs(10),
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
    btnBox: {
        gap: vs(10),
        paddingTop: vs(10)
    },

})