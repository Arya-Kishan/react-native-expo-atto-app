import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppConstants } from '@/AppConstants'
import { s, vs } from 'react-native-size-matters'
import Ionicons from '@expo/vector-icons/Ionicons'

const ScheduleLater = () => {
    return (
        <View style={{ paddingHorizontal: AppConstants.screenPadding }}>
            <View style={{ width: "100%", gap: vs(16), paddingHorizontal: AppConstants.screenPadding, borderColor: AppConstants.borderColor1, borderWidth: 2, padding: s(15), backgroundColor: "#FFFFFF", borderRadius: s(15) }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ width: "80%", gap: vs(6) }}>
                        <Text style={{ fontSize: s(16), fontWeight: "800" }}>Schedule your slot for later</Text>
                        <Text>Guaranteed on-time service by our trusted Experts</Text>
                    </View>
                    <Ionicons name='add-circle' size={25} />
                </View>

                <TouchableOpacity style={{ backgroundColor: AppConstants.buttonColor1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: s(10), borderRadius: AppConstants.buttonBorderRadius, padding: AppConstants.buttonPadding }}>
                    <Text style={{ fontSize: s(14), fontWeight: "700", color: AppConstants.textColor1 }}>Prebook Now</Text>
                    <Ionicons name='arrow-forward' size={20} color={AppConstants.white} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ScheduleLater

const styles = StyleSheet.create({})