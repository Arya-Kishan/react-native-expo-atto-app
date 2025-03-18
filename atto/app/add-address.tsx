import { AppConstants } from "@/AppConstants";
import { setSelectedAddress } from "@/Store/slices/authSlice";
import { AppDispatch, RootState } from "@/Store/store";
import { saveAddressToFirebase } from "@/services/api_services/firebase_api_services";
import { setUserAddressToAsyncStorage } from "@/services/async_storage/async_storage_service";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, RadioButton, Text, TextInput } from "react-native-paper";
import { s, vs } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";

const AddressForm = () => {

    const [pinCode, setPinCode] = useState("");
    const [house, setHouse] = useState("");
    const [street, setStreet] = useState("");
    const [phone, setPhone] = useState("");
    const [landmark, setLandmark] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [type, setType] = useState("Home"); // Address type (Home/Office/Other)
    const router = useRouter();
    const { loggedInUser } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    // Function to save address to Firestore
    const saveAddress = async () => {
        setLoading(true);
        const { data: addressesList, success } = await saveAddressToFirebase({ city, house, landmark, pinCode, state, street, type, phone }, loggedInUser!);
        console.log("addressesList : ", addressesList)
        if (success) {
            setLoading(false);

            // ADDING ADDRESS TO REDUX STORE
            dispatch(setSelectedAddress({ ...addressesList, id: addressesList.id }));

            // ADDING ADDRESS TO ASYNC STORAGE
            await setUserAddressToAsyncStorage({ ...addressesList, id: addressesList.id });

            router.push("/(tabs)");
        }
        setLoading(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.title}>Add Delivery Address</Text>

            <TextInput label="Pin Code *" keyboardType="numeric" value={pinCode} onChangeText={setPinCode} style={styles.input} />
            <TextInput label="House/Flat No. *" value={house} onChangeText={setHouse} style={styles.input} />
            <TextInput label="Street/Road *" value={street} onChangeText={setStreet} style={styles.input} />
            <TextInput label="Landmark (Optional)" value={landmark} onChangeText={setLandmark} style={styles.input} />
            <TextInput label="City *" value={city} onChangeText={setCity} style={styles.input} />
            <TextInput label="phone *" value={phone} onChangeText={setPhone} style={styles.input} />
            <TextInput label="State *" value={state} onChangeText={setState} style={styles.input} />

            <Text style={styles.label}>Address Type:</Text>
            <RadioButton.Group onValueChange={(value) => setType(value)} value={type}>
                <View style={styles.radioContainer}>
                    <RadioButton.Item label="Home" value="Home" />
                    <RadioButton.Item label="Office" value="Office" />
                    <RadioButton.Item label="Other" value="Other" />
                </View>
            </RadioButton.Group>

            <Button mode="contained" onPress={saveAddress} style={styles.button}>
                {loading ? <ActivityIndicator size={20} color={AppConstants.iconColor2} /> : "Add Address"}
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: AppConstants.screenPadding,
    },
    title: {
        fontSize: s(22),
        fontWeight: "bold",
        marginBottom: vs(30),
        marginTop: vs(20),
    },
    input: {
        marginBottom: vs(10),
        backgroundColor: "white",
    },
    label: {
        fontSize: s(16),
        marginTop: vs(10),
    },
    radioContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    button: {
        marginTop: vs(20),
    },
});

export default AddressForm;
