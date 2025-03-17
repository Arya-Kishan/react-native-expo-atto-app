import { userAddressType, userCredentialsType } from "@/AppTypes";
import { errorToast } from "@/utils/toast";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native";

export const getUserCredentialsFromAsyncStorage = async () => {
    try {
        const data = await AsyncStorage.getItem("user");
        if (data) {
            return JSON.parse(data);
        }
        return null;
    } catch (error) {
        errorToast("Error Occured", `Error in getting user credentail from async storage: ${error}`);
        return null;
    }
}

export const setUserCredentialsToAsyncStorage = async (userCredential: userCredentialsType) => {
    try {
        const data = await AsyncStorage.setItem("user", JSON.stringify(userCredential));
        return null;
    } catch (error) {
        errorToast("Error Occured", `Error in adding user credentail to async storage: ${error}`);
        return null;
    }
}

export const getUserAddressFromAsyncStorage = async () => {
    try {
        const data = await AsyncStorage.getItem("address");
        if (data) {
            return JSON.parse(data);
        }
        return null;
    } catch (error) {
        Alert.alert("Error Occured", `rror in getting user credentail from async storage: ${error} `);
        return null;
    }
}

export const setUserAddressToAsyncStorage = async (userAddress: userAddressType) => {
    console.log("user address saving in async storage : ", userAddress);
    try {
        const data = await AsyncStorage.setItem("address", JSON.stringify(userAddress));
        return null;
    } catch (error) {
        Alert.alert("Error Occured", `Error in Saving address to Async Storage : ${error} `);
        return null;
    }
}