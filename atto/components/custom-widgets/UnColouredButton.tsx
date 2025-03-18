import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import { AppConstants } from '@/AppConstants'
import { LinearGradient } from 'expo-linear-gradient'
import { ActivityIndicator } from 'react-native-paper'

interface UnColouredButtonType {
    loading: boolean,
    text: string,
    handlePress: (value?: any) => void
}

const UnColouredButton: React.FC<UnColouredButtonType> = ({ loading, handlePress, text }) => {
    return (
        <Pressable onPress={handlePress} style={styles.colouredBtn} >
            {
                loading
                    ?
                    <ActivityIndicator size={25} color={AppConstants.loaderColorViolet} />
                    :
                    <Text style={styles.colouredBtnTxt}>{text}</Text>

            }
        </Pressable>
    )
}

export default UnColouredButton

const styles = StyleSheet.create({
    colouredBtn: {
        height: vs(40),
        width: "100%",
        paddingHorizontal: s(15),
        borderWidth: 2,
        borderColor: AppConstants.borderColor2,
        borderRadius: s(20),
        justifyContent: "center",
        alignItems: "center"
    },
    colouredBtnTxt: {
        color: AppConstants.textColor2,
        textAlign: "center",
        fontWeight: "500",
        fontSize: s(15)
    },
})