import { AppConstants } from "@/AppConstants";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { s, vs } from "react-native-size-matters";

const SelectAuth = () => {

    const router = useRouter();

    return (
        <LinearGradient colors={[AppConstants.linearGradient[0], AppConstants.linearGradient[1], AppConstants.linearGradient[2]]} style={styles.mainLinearGradient}>

            <View style={styles.main}>
                {/* LOGO AND TITLE */}
                <View style={styles.logoBox}>
                    <Text style={styles.logoTxt}>Atto</Text>
                </View>

                <Image source={require("@/assets/images/banner.png")} style={{ width: vs(250), height: vs(250) }} />

                {/* WELCOME,AUTH BUTTONS */}
                <View style={styles.authBtnBox}>

                    <Pressable onPress={() => router.push("/(auth)/signin")} style={styles.colouredBtn}>
                        <Text style={styles.colouredBtnTxt}>SIGN IN</Text>
                    </Pressable>

                    <Pressable onPress={() => router.push("/(auth)/signup")} style={styles.colouredBtn}>
                        <Text style={styles.colouredBtnTxt}>SIGN UP</Text>
                    </Pressable>

                </View>

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
        justifyContent: "flex-end",
    },
    main: {
        alignItems: "center",
        height: "100%",
        justifyContent: "space-between",
        paddingTop: vs(40),
        width: "100%",
    },
    logoBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: s(5)
    },
    logoTxt: {
        fontSize: 45,
        fontFamily: "Alice_400Regular",
        color: AppConstants.textColor1,
    },
    authBtnBox: {
        width: "100%",
        gap: vs(20),
        height: vs(200),
        backgroundColor: AppConstants.backgroundColorWhite,
        borderTopLeftRadius: s(40),
        borderTopRightRadius: s(40),
        paddingHorizontal: s(20),
        justifyContent: "center",
        alignItems: "center"
    },
    authBtnTxt: {
        textAlign: "center",
        fontWeight: "700",
        fontSize: 20,
    },
    colouredBtn: {
        width: "100%",
        paddingHorizontal: s(15),
        paddingVertical: vs(10),
        borderWidth: 2,
        borderColor: AppConstants.borderColorViolet,
        borderRadius: s(20),
        marginTop: vs(10),
    },
    colouredBtnTxt: {
        color: AppConstants.textColorViolet,
        textAlign: "center",
        fontWeight: "500",
        fontSize: s(14)
    },
})