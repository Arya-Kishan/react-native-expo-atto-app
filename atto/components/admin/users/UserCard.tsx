import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { userCredentialsType } from '@/AppTypes'
import { formatDateTime } from '@/utils/helper'
// import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { AppConstants } from '@/AppConstants'
import { s } from 'react-native-size-matters'

interface UserCardType {
    user: userCredentialsType
}

const UserCard: React.FC<UserCardType> = ({ user }) => {


    return (
        <View style={styles.main}>

            <Ionicons name="person-circle" size={30} />

            <View>
                <Text style={styles.txt1}> Name :  <Text style={styles.txt2}>{user.name}</Text></Text>
                <Text style={styles.txt1}> Email :  <Text style={styles.txt2}>{user.email}</Text></Text>
                <Text style={styles.txt1}> Phone :  <Text style={styles.txt2}>{"NEED TO DONE"}</Text></Text>
                <Text style={styles.txt1}> Role :  <Text style={styles.txt2}>{user.role}</Text></Text>
                <Text style={styles.txt1}> Created At :  {formatDateTime(`${user.createdAt}`)}</Text>
            </View>

        </View>
    )
}

export default UserCard

const styles = StyleSheet.create({
    main: {
        backgroundColor: AppConstants.backgroundColor1,
        padding: AppConstants.screenPadding,
        borderRadius: s(20)
    },
    txt1: {
        fontWeight: "bold",
        color: AppConstants.textColor1,
    },
    txt2: {
        fontWeight: "400",
        color: AppConstants.textColor1,
    }
})