import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppConstants } from '@/AppConstants'
import { LinearGradient } from 'expo-linear-gradient'
import { s, vs } from 'react-native-size-matters'
import { useRouter } from 'expo-router'

const Admin = () => {
  const router = useRouter();
  return (
    <ScrollView>

      <SafeAreaView>
        <LinearGradient colors={["#00435DFF", "#06001BFF", "#11004DFF"]} style={styles.mainLinearGradient}>
          <Text style={styles.mainTxt}>Admin</Text>
          <View style={styles.main}>
            <TouchableOpacity onPress={() => router.push("/admin-slots")} style={styles.btn}><Text style={styles.btnTxt}>Slots</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/admin-users")} style={styles.btn}><Text style={styles.btnTxt}>Users</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/admin-booking")} style={styles.btn}><Text style={styles.btnTxt}>Bookings</Text></TouchableOpacity>
          </View>

        </LinearGradient >
      </SafeAreaView>

    </ScrollView>
  )
}

export default Admin

const styles = StyleSheet.create({
  mainLinearGradient: {
    flex: 1,
    width: "100%",
    height: AppConstants.screenHeight,
    justifyContent: "flex-end",
  },
  mainTxt: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    color: AppConstants.textColor1,
    paddingVertical: vs(10)
  },
  main: {
    width: "100%",
    height: "90%",
    backgroundColor: AppConstants.backgroundColorWhite,
    borderTopLeftRadius: s(40),
    borderTopRightRadius: s(40),
    gap: AppConstants.gapBetweenSections,
    paddingHorizontal: AppConstants.screenPadding,
    paddingTop: vs(50)
  },
  btn: {
    borderWidth: 2,
    borderColor: AppConstants.borderColorPrimary,
    borderRadius: AppConstants.buttonBorderRadius,
    padding: s(10),

  },
  btnTxt: {
    color: AppConstants.textColor2,
    textAlign: "center",
    fontWeight: "bold"
  }
})