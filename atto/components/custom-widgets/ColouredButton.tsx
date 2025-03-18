import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import { AppConstants } from '@/AppConstants'
import { LinearGradient } from 'expo-linear-gradient'
import { ActivityIndicator } from 'react-native-paper'

interface ColouredButtonType {
    loading: boolean,
    text: string,
    handlePress: (value?: any) => void
}

const ColouredButton: React.FC<ColouredButtonType> = ({ loading, handlePress, text }) => {
    return (
        <LinearGradient colors={["#00435DFF", "#18006EFF"]} style={styles.colouredBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <TouchableOpacity onPress={handlePress} >
                {
                    loading
                        ?
                        <ActivityIndicator size={30} color={AppConstants.loaderColorWhite} />
                        :
                        <Text style={styles.colouredBtnTxt}>{text}</Text>

                }
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default ColouredButton

const styles = StyleSheet.create({
    colouredBtn: {
        height: vs(40),
        width: "100%",
        paddingHorizontal: s(15),
        borderRadius: s(20),
        justifyContent: "center",
        alignItems: "center"
    },
    colouredBtnTxt: {
        color: AppConstants.textColor1,
        textAlign: "center",
        fontWeight: "500",
        fontSize: s(15)
    },
})