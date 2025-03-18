import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Alice_400Regular, useFonts } from "@expo-google-fonts/alice";
import { AppConstants } from '@/AppConstants';


const CustomText = () => {
    const [fontsLoaded] = useFonts({
        Alice_400Regular
    });

    if (!fontsLoaded) {
        return null; // Or a loading spinner
    }


    return (
        <Text style={styles.logoTxt}>Atto</Text>
    )
}

export default CustomText

const styles = StyleSheet.create({
    logoTxt: {
        fontSize: 80,
        // fontWeight: "800",
        color: AppConstants.textColor1,
        fontFamily: "Alice_400Regular"
    },
})