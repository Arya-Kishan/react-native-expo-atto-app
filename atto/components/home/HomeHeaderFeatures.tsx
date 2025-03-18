import { AppConstants } from '@/AppConstants';
import { RootState } from '@/Store/store';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const HomeHeaderFeatures = () => {
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
        <View style={{ width: "100%", backgroundColor: AppConstants.backgroundColor1, borderBottomRightRadius: 30, borderBottomLeftRadius: 30, paddingTop: AppConstants.statusBarHeight, padding: AppConstants.screenPadding, marginTop: -vs(10) }} >

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

export default HomeHeaderFeatures

const styles = StyleSheet.create({})