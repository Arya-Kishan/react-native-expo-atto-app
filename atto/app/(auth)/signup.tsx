import { AppConstants } from '@/AppConstants'
import ColouredButton from '@/components/custom-widgets/ColouredButton'
import useAuth from '@/hooks/useAuth'
import { setUserState } from '@/Store/slices/authSlice'
import { AppDispatch } from '@/Store/store'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { s, vs } from 'react-native-size-matters'
import { useDispatch } from 'react-redux'
import GoogleSignin from './google-signin'

const Signup = () => {

    const { googleEmail, googleName, googlePassword } = useLocalSearchParams();

    const [email, setEmail] = useState(googleEmail as string ?? "");
    const [password, setPassword] = useState(googlePassword as string ?? "");
    const [confirmPassword, setConfirmPassword] = useState(googlePassword as string ?? "");
    const [name, setName] = useState(googleName as string ?? "");
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { handleSignUp, authLoading } = useAuth();

    const signUp = () => {
        handleSignUp(name, email, password);
    }

    useEffect(() => {
        dispatch(setUserState('login'));
    }, [])

    return (
        <ScrollView>
            <LinearGradient colors={[AppConstants.linearGradient[0],AppConstants.linearGradient[1],AppConstants.linearGradient[2]]} style={styles.mainLinearGradient}>

                {/* CREATE TEXT */}
                <View style={styles.createBox}>
                    <Text style={styles.createBoxTxt}>Create Your Account</Text>
                </View>

                {/* CREATE FORM */}
                <View style={styles.createFormBox}>

                    <View style={styles.inputBox}>
                        <Text style={styles.inputTxt}>Name</Text>
                        <TextInput placeholder='' value={name} onChangeText={setName} style={styles.input} />
                    </View>

                    <View style={styles.inputBox}>
                        <Text style={styles.inputTxt}>Email</Text>
                        <TextInput placeholder='' keyboardType='email-address' value={email} onChangeText={setEmail} style={styles.input} />
                    </View>

                    <View style={styles.inputBox}>
                        <Text style={styles.inputTxt}>Password</Text>
                        <TextInput placeholder='' value={password} onChangeText={setPassword} style={styles.input} />
                    </View>

                    <View style={styles.inputBox}>
                        <Text style={styles.inputTxt}>Confirm Password</Text>
                        <TextInput placeholder='' value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} />
                    </View>

                    {/* SIGN UP BUTTON */}
                    <ColouredButton handlePress={signUp} loading={authLoading} text='SIGN UP' />

                    {/* DON'T HAVE ACCOUNT */}
                    <Text style={styles.alreadyTxt}>Already Have an account? <Text onPress={() => router.push("/signin")} style={styles.loginTxt}>Login</Text></Text>



                </View>


                <View style={styles.iconBox}>
                    <GoogleSignin loginState={"signup"} />
                    {/* <Ionicons name="logo-apple" size={30} style={styles.icon} /> */}
                </View>



            </LinearGradient>
        </ScrollView>
    )
}

export default Signup

const styles = StyleSheet.create({
    mainLinearGradient: {
        flex: 1,
        width: "100%",
        height: AppConstants.screenHeight,
        justifyContent: "flex-end",
    },
    createBox: {
        paddingHorizontal: AppConstants.screenPadding + s(15),
        paddingTop: vs(50),
        height: vs(200),
    },
    createBoxTxt: {
        fontSize: 35,
        fontWeight: "700",
        color: AppConstants.textColor1
    },
    createFormBox: {
        flex: 1,
        borderTopLeftRadius: s(40),
        borderTopRightRadius: s(40),
        gap: vs(10),
        backgroundColor: AppConstants.backgroundColorWhite,
        padding: AppConstants.screenPadding + s(15),
    },
    inputBox: {
        gap: vs(4),
    },
    inputTxt: {
        fontWeight: "700",
        color: AppConstants.textColor2,
        fontSize: s(16)
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: AppConstants.borderColor1
    },
    colouredBtn: {
        height: vs(40),
        width: "100%",
        paddingHorizontal: s(15),
        paddingVertical: vs(10),
        borderWidth: 2,
        borderColor: AppConstants.borderColor1,
        borderRadius: s(20),
        marginTop: vs(30),
    },
    colouredBtnTxt: {
        color: AppConstants.textColor1,
        textAlign: "center",
        fontWeight: "500"
    },
    alreadyTxt: {
        color: "#A9A9A9FF",
        textAlign: "center"
    },
    loginTxt: {
        color: AppConstants.textColor2,
        fontWeight: "bold"
    },
    iconBox: {
        position: "absolute",
        bottom: vs(50),
        flexDirection: "row",
        gap: s(20),
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
    },
    icon: {
        backgroundColor: AppConstants.iconColor2,
        padding: s(6),
        borderRadius: s(20)
    },
})