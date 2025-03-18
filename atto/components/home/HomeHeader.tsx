import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { s, vs } from 'react-native-size-matters';
import { AppConstants } from '@/AppConstants';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { useRouter } from 'expo-router';

const HomeHeader = () => {
    const features = [
        {
            title: "Quick Sevice",
            subTitle: "App",
            icon: <Ionicons name='watch' size={25} color={"#FFFFFFFF"} />
        },
        {
            title: "Trusted By",
            subTitle: "185+ families",
            icon: <MaterialIcons name='security' size={25} color={"#FFFFFFFF"} />
        },
        {
            title: "One Booking",
            subTitle: "Multiple Services",
            icon: <Ionicons name='book' size={25} color={"#FFFFFFFF"} />
        },
    ];
    const { selectedAddress, loggedInUser } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    const handleAdminRoute = () => {
        loggedInUser?.role == "admin" ? router.push("/admin") : ""
    }

    return (
        <View style={{ width: "100%", backgroundColor: AppConstants.backgroundColor1, paddingTop: AppConstants.statusBarHeight, padding: AppConstants.screenPadding }} >

            {/* ADDRESS,SUB ADDRESS AND LOGO */}
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {/* ADDRESS */}
                <View style={{ width: "90%" }}>
                    <Text style={{ color: "white", fontSize: s(18), fontWeight: "bold" }} >Address</Text>
                    <Text style={{ color: "white", fontSize: s(11), }} >{selectedAddress?.house},{selectedAddress?.street},{selectedAddress?.city}{selectedAddress?.state}{selectedAddress?.pinCode}</Text>
                </View>
                <Pressable onPress={handleAdminRoute}>
                    <Image source={require("@/assets/images/icons/logo_white.png")} style={{ width: 30, height: 30 }} />
                </Pressable>
            </View>

        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({})