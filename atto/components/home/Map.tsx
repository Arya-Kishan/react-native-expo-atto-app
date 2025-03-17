import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppConstants } from '@/AppConstants'
import { s, vs } from 'react-native-size-matters'

const Map = () => {
    return (
        <View style={{ paddingHorizontal: AppConstants.screenPadding }}>
            <View style={{ width: "100%", gap: vs(16), paddingHorizontal: AppConstants.screenPadding, borderColor: AppConstants.borderColor1, borderWidth: 2, padding: s(15), backgroundColor: "#FFFFFF", borderRadius: s(15) }}>

                <View style={{ justifyContent: "space-between", gap: s(10) }}>

                    <Text style={{ fontSize: 15, fontWeight: "400", }}><Text style={{ color: AppConstants.textColor2 }}>2</Text> experts currently active around you</Text>

                    <Image
                        source={require("@/assets/images/services/map.png")}
                        style={{ width: "100%", height: s(150), transform: [{ rotate: "0deg" }], borderRadius: s(10) }}
                    />

                </View>

            </View>
        </View>
    )
}

export default Map

const styles = StyleSheet.create({})