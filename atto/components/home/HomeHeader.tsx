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
        <View style={{ width: "100%", backgroundColor: AppConstants.backgroundColor1, height: vs(150), borderBottomRightRadius: 30, borderBottomLeftRadius: 30, paddingTop: AppConstants.statusBarHeight, padding: AppConstants.screenPadding }} >

            {/* ADDRESS,SUB ADDRESS AND LOGO */}
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {/* ADDRESS */}
                <View>
                    <Text style={{ color: "white", fontSize: s(18), fontWeight: "bold" }} >Address</Text>
                    <Text style={{ color: "white", fontSize: s(11), }} >  <Text>{selectedAddress?.house},{selectedAddress?.street},{selectedAddress?.city}{selectedAddress?.state}{selectedAddress?.pinCode}</Text></Text>
                </View>
                <Pressable onPress={handleAdminRoute}>
                    <Image source={require("@/assets/images/icons/logo.png")} style={{ width: 25, height: 25 }} />
                </Pressable>
            </View>

            {/* APP FEATUES TITLE AND ICON */}
            <View style={{ flex: 1, flexDirection: "row", gap: s(5), justifyContent: "space-around", alignItems: "center" }}>
                {/* service */}
                {
                    features.map((item, index) => (
                        <View key={index} style={{ flexDirection: "row", gap: s(5), justifyContent: "center", alignItems: "center" }}>
                            {item.icon}
                            <View>
                                <Text style={{ color: "white", fontSize: 13 }}>{item.title}</Text>
                                <Text style={{ color: "white", fontSize: 10 }}>{item.subTitle}</Text>
                            </View>
                        </View>
                    ))
                }

            </View>

        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({})