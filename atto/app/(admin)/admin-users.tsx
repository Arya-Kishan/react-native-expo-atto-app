import { AppConstants } from '@/AppConstants';
import { bookingType, userCredentialsType } from '@/AppTypes';
import UserCard from '@/components/admin/users/UserCard';
import { getAllUsers } from '@/services/api_services/firebase_api_services';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';

const AdminUsers = () => {

    const [users, setUsers] = useState<bookingType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchAllUsers = async () => {
        setLoading(true);
        const users = await getAllUsers();
        console.log("users : ", users.data);
        setUsers(users.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])


    return (
        <View style={{ height: AppConstants.screenHeight }}>

            {/* BOOKING BUTTON ALL AND USER */}
            <View style={styles.header}>
                <Text style={styles.bookingText}>All USERS</Text>
            </View>

            {/* ALL BOOKINGS */}
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {
                    loading
                        ?
                        <ActivityIndicator size={40} color={AppConstants.textColor2} />
                        :
                        users.length == 0
                            ?
                            <Text>NO USERS</Text>
                            :
                            <View style={{ width: "100%", flex: 1 }}>
                                <FlatList
                                    data={users}
                                    keyExtractor={(item) => (`${item.createdAt}`)}
                                    renderItem={({ item }: { item: userCredentialsType }) => (<UserCard user={item} />)}
                                    contentContainerStyle={{ width: "100%", gap: s(15), paddingVertical: vs(15), paddingHorizontal: AppConstants.screenPadding }}
                                />
                            </View>
                }
            </View>

        </View>
    )
}

export default AdminUsers

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: vs(100),
        backgroundColor: AppConstants.backgroundColor1,
        borderBottomLeftRadius: s(30),
        borderBottomRightRadius: s(30),
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    selectedBooking: {
        borderColor: "#FFFFFF",
        borderWidth: 2,
        backgroundColor: AppConstants.buttonColor1,
    },
    bookingText: {
        color: AppConstants.textColor1,
        textAlign: "center",
        fontSize: s(25),
        fontWeight: "800"
    },
    yourBooking: {
        width: "45%",
        backgroundColor: AppConstants.white,
        borderRadius: AppConstants.buttonBorderRadius,
        paddingHorizontal: s(15),
        paddingVertical: s(10)
    },
    allBooking: {
        width: "45%",
        backgroundColor: AppConstants.white,
        borderRadius: AppConstants.buttonBorderRadius,
        paddingHorizontal: s(15),
        paddingVertical: s(10)
    },
})