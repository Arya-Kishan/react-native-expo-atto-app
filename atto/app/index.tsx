import { AppConstants } from "@/AppConstants";
import { getUserAddressFromAsyncStorage, getUserCredentialsFromAsyncStorage } from "@/services/async_storage/async_storage_service";
import { auth } from "@/services/configs/firebaseConfig";
import { setSelectedAddress, setUserCredential } from "@/Store/slices/authSlice";
import { AppDispatch, RootState } from "@/Store/store";
import { Redirect, SplashScreen, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { s, vs } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { useFonts, Alice_400Regular } from "@expo-google-fonts/alice"

export default function Index() {

  const [fontsLoaded] = useFonts({
    Alice_400Regular
  });

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { userState } = useSelector((state: RootState) => state.auth);

  const checkLoggedIn = async (currentUser: User | null) => {

    const userCredentails = await getUserCredentialsFromAsyncStorage();
    const userAddress = await getUserAddressFromAsyncStorage();

    console.log("userCredentails from async storage : ", userCredentails)
    console.log("userAddress from async storage : ", userAddress)

    if (currentUser && userAddress && userCredentails && userState == null) {
      setIsLoggedIn(true);
      // ADDING ADDRESS TO REDUX STORE
      dispatch(setSelectedAddress(userAddress));
      // STORING USER CREDENTAIL TO REDUX STORE
      dispatch(setUserCredential(userCredentails));
      await SplashScreen.hideAsync();
    } else if (currentUser && !userAddress) {
      router.push("/add-address");
      dispatch(setUserCredential(userCredentails));
      await SplashScreen.hideAsync();
    } else {
      setIsLoggedIn(false);
      await SplashScreen.hideAsync();
    }

  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (fontsLoaded) {
        console.log("FONTS LOADED --- ----");
        checkLoggedIn(currentUser);
      }
    });

    return () => unsubscribe();

  }, [fontsLoaded]);

  if (isLoggedIn == null) return null;

  return (
    <ScrollView>
      <StatusBar hidden={true} />

      {
        isLoggedIn
          ?
          <Redirect href={"/(tabs)"} />
          :
          <Redirect href={"/select-auth"} />
      }

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainLinearGradient: {
    flex: 1,
    width: "100%",
    height: AppConstants.screenHeight,
    paddingHorizontal: AppConstants.screenPadding + s(15),
    justifyContent: "flex-end"
  },
  main: {
    height: "100%",
    justifyContent: "space-between",
    paddingVertical: vs(50)
  },
  logoBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: s(5)
  },
  logoTxt: {
    fontSize: 25,
    fontWeight: "800",
    color: AppConstants.textColor1,
  },
  wlcmTxt: {
    fontSize: 35,
    fontWeight: "bold",
    color: AppConstants.textColor1,
    textAlign: "center"
  },
  authBtnBox: {
    gap: vs(20)
  },
  authBtnTxt: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
  },
  colouredBtn: {
    backgroundColor: "",
    width: "100%",
    paddingHorizontal: s(15),
    paddingVertical: vs(10),
    borderWidth: 2,
    borderColor: AppConstants.borderColor1,
    borderRadius: s(20),
    marginTop: vs(10),
  },
  colouredBtnTxt: {
    color: AppConstants.textColor1,
    textAlign: "center",
    fontWeight: "500"
  },
  unColouredBtnTxt: {
    color: AppConstants.textColor2,
    textAlign: "center",
    fontWeight: "500"
  },
  unColouredBtn: {
    backgroundColor: AppConstants.buttonColor2,
    width: "100%",
    paddingHorizontal: s(15),
    paddingVertical: vs(10),
    borderWidth: 2,
    borderColor: AppConstants.borderColor1,
    borderRadius: s(20)
  },
  iconBox: {
    flexDirection: "row",
    gap: s(20),
    justifyContent: "center"
  },
  icon: {
    backgroundColor: AppConstants.iconColor2,
    padding: s(6),
    borderRadius: s(20)
  },
})
