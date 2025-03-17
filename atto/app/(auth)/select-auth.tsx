import { AppConstants } from "@/AppConstants";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { s, vs } from "react-native-size-matters";

const SelectAuth = () => {

    const router = useRouter();

    return (
        <LinearGradient colors={["#00435DFF", "#06001BFF", "#11004DFF"]} style={styles.mainLinearGradient}>

            <View style={styles.main}>
                {/* LOGO AND TITLE */}
                <View style={styles.logoBox}>
                    <Image source={require("@/assets/images/icons/logo.png")} style={{ width: 25, height: 25 }} />

                    <Text style={[styles.logoTxt, { fontFamily: "Alice_400Regular" }]}>Atto</Text>
                </View>

                {/* WELCOME,AUTH BUTTONS */}
                <View style={styles.authBtnBox}>

                    <Text style={[styles.wlcmTxt, { fontFamily: "Alice_400Regular" }]}>Welcome</Text>
                    <Text style={styles.wlcmTxt}>Welcome</Text>

                    <Pressable onPress={() => router.push("/(auth)/signin")} style={styles.colouredBtn}>
                        <Text style={styles.colouredBtnTxt}>SIGN IN</Text>
                    </Pressable>

                    <Pressable onPress={() => router.push("/(auth)/signup")} style={styles.colouredBtn}>
                        <Text style={styles.colouredBtnTxt}>SIGN UP</Text>
                    </Pressable>

                </View>

                <Image source={require("@/assets/images/banner.png")} style={{ width: vs(250), height: vs(250) }} />

            </View>

        </LinearGradient>
    )
}

export default SelectAuth

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
        gap: vs(20),
        paddingTop: vs(100),
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
        borderColor: AppConstants.borderColor2,
        borderRadius: s(20),
        marginTop: vs(10),
    },
    colouredBtnTxt: {
        color: AppConstants.textColor1,
        textAlign: "center",
        fontWeight: "500"
    },
})