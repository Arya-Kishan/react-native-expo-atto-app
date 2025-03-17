import { AppConstants } from '@/AppConstants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';

const TabLayout = () => {

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: vs(60),
                },
                tabBarItemStyle: {
                    paddingTop: s(6)
                },
                tabBarActiveTintColor: AppConstants.primaryColor, // Active icon color
                tabBarInactiveTintColor: 'gray'
            }}
        >
            <Tabs.Screen name='index' options={{
                title: "Home",
                tabBarIcon: ({ color }) => <Ionicons size={24} name="home-outline" color={color} />
            }} />
            <Tabs.Screen name='bookings' options={{
                title: "Bookings",
                tabBarIcon: ({ color }) => <Ionicons name='search' size={24} color={color} />
            }} />
            <Tabs.Screen name='account' options={{
                title: "Account",
                tabBarIcon: ({ color }) => <Ionicons name='person-outline' size={24} color={color} />
            }} />
            <Tabs.Screen name='notification' options={{
                title: "Notification",
                tabBarIcon: ({ color }) => <Ionicons name='notifications' size={24} color={color} />
            }} />
        </Tabs>
    )
}

export default TabLayout

const styles = StyleSheet.create({})