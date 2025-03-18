import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppConstants } from '@/AppConstants'
import { s, vs } from 'react-native-size-matters'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'

const ScheduleLater = () => {
    const router = useRouter();
    return (
        <View style={styles.main}>
            <View style={styles.container}>

                <View style={styles.scheduleContainer}>
                    <View style={styles.scheduleBox1}>
                        <Text style={styles.scheduleTxt}>Schedule your slot for later</Text>
                        <Text>Guaranteed on-time service by our trusted Experts</Text>
                    </View>
                    <Ionicons name='add-circle' size={25} />
                </View>

                <TouchableOpacity onPress={() => router.push("/(booking)/prebooking")} style={styles.prebookContainer}>
                    <Text style={styles.prebookTxt}>Prebook Now</Text>
                    <Ionicons name='arrow-forward' size={20} color={AppConstants.white} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ScheduleLater

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: AppConstants.screenPadding,
    },
    container: {
        width: "100%",
        gap: vs(16),
        paddingHorizontal: AppConstants.screenPadding,
        borderColor: AppConstants.borderColor1,
        borderWidth: 2,
        padding: s(15),
        backgroundColor: "#FFFFFF",
        borderRadius: s(15)
    },
    scheduleContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    scheduleBox1: {
        width: "80%",
        gap: vs(6)
    },
    scheduleTxt: {
        fontSize: s(16),
        fontWeight: "800"
    },
    prebookContainer: {
        backgroundColor: AppConstants.buttonColor1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: s(10),
        borderRadius: AppConstants.buttonBorderRadius,
        padding: AppConstants.buttonPadding
    },
    prebookTxt: {
        fontSize: s(14),
        fontWeight: "700",
        color: AppConstants.textColor1
    },

})