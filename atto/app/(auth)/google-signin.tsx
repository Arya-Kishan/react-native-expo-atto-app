import { AppConstants } from "@/AppConstants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Image, Pressable, StyleSheet } from "react-native";
import { s } from "react-native-size-matters";
import useAuth from "@/hooks/useAuth";

interface GoogleSignInType {
    loginState: "signin" | "signup"
}

const GoogleSignin: React.FC<GoogleSignInType> = ({ loginState }) => {

    const { handleGoogleSignIn } = useAuth();

    return (
        <>
            <Pressable onPress={() => handleGoogleSignIn(loginState)}>
                <Image source={require("@/assets/images/icons/google.png")} style={{ width: 40, height: 40 }} />
            </Pressable>
        </>
    )
}

export default GoogleSignin

const styles = StyleSheet.create({
    icon: {
        backgroundColor: AppConstants.iconColor2,
        padding: s(6),
        borderRadius: s(20)
    },
})