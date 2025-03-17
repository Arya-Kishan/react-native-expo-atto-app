import { AppConstants } from '@/AppConstants'
import useAuth from '@/hooks/useAuth'
import { auth } from '@/services/configs/firebaseConfig'
import { setUserCredential, setUserState } from '@/Store/slices/authSlice'
import { AppDispatch, RootState } from '@/Store/store'
import Fontisto from '@expo/vector-icons/Fontisto'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { signOut } from 'firebase/auth'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { s, vs } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'

const Account = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loggedInUser, selectedAddress } = useSelector((store: RootState) => store.auth);
  const { handleLogOut } = useAuth();

  return (
    <ScrollView>
      <View style={styles.main}>

        <StatusBar hidden />

        <View style={styles.header}>
          <Text style={styles.headerTxt}>Account</Text>
          <MaterialIcons onPress={handleLogOut} name='logout' size={30} color={AppConstants.iconColor2} />
        </View>

        <View style={styles.main2}>

          <Fontisto name='person' size={80} />

          <View>

            <View style={styles.info}>
              <Text>Name : {loggedInUser?.name}</Text>
              <Text>Email : {loggedInUser?.email}</Text>
            </View>

            {/* ADDRESS  */}
            <View style={styles.address}>
              <Text style={{ fontWeight: "800", fontSize: s(16) }}>Address</Text>
              <Text>{selectedAddress?.house},{selectedAddress?.street},{selectedAddress?.city}{selectedAddress?.state}{selectedAddress?.pinCode}</Text>
              <Text>phone : {selectedAddress?.phone}</Text>
            </View>

          </View>

        </View>

      </View>
    </ScrollView>
  )
}

export default Account

const styles = StyleSheet.create({
  main: {
    height: AppConstants.screenHeight,
  },
  header: {
    width: "100%",
    height: vs(80),
    backgroundColor: AppConstants.backgroundColor1,
    borderBottomLeftRadius: s(30),
    borderBottomRightRadius: s(30),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: AppConstants.screenPadding
  },
  headerTxt: {
    textAlign: "center",
    fontSize: s(25),
    fontWeight: "800",
    color: AppConstants.textColor1
  },
  main2: {
    flex: 1,
    alignItems: "center",
    paddingTop: vs(50)
  },
  info: {
    marginTop: vs(20),
    gap: vs(6),
  },
  address: {
    marginTop: vs(20),
    gap: vs(6)
  },
})