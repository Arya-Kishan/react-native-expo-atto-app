import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppConstants } from '@/AppConstants'
import { s, vs } from 'react-native-size-matters'

const TrainedProfessional = () => {
    return (
        <View style={{ paddingHorizontal: AppConstants.screenPadding }}>
            <View style={{ width: "100%", gap: vs(16), paddingHorizontal: AppConstants.screenPadding, borderColor: AppConstants.borderColor1, borderWidth: 2, padding: s(15), backgroundColor: "#FFFFFF", borderRadius: s(15) }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                    <View style={{ width: "60%", gap: vs(10) }}>
                        <Text style={{ fontSize: 20, fontWeight: "700", }}>Trained Professional</Text>
                        <Text style={{ fontSize: 15, fontWeight: "400", }}>Equipped with latest best practices to deliver top-notch services</Text>
                    </View>

                    <Image
                        source={require("@/assets/images/services/professional.png")}
                        style={{ width: s(150), height: s(150) }}
                    />

                </View>

            </View>
        </View>
    )
}

export default TrainedProfessional

const styles = StyleSheet.create({})