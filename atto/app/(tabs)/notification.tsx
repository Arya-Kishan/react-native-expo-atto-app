import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { getMessaging, getToken, onMessage, onNotificationOpenedApp, getInitialNotification, setBackgroundMessageHandler, requestPermission, AuthorizationStatus } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

const Notification = () => {
    const messaging = getMessaging(getApp());

    const requestUserPermission = async () => {
        if (Platform.OS === 'ios') {
            const authStatus = await requestPermission(messaging);
            const enabled = authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);
            }
        } else if (Platform.OS === 'android') {
            if (Platform.Version >= 33) {
                const result = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
                );
                if (result === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Android Notification permission granted.');
                } else {
                    console.log('Android Notification permission denied.');
                }
            }
        }
    };

    const getFCMToken = async () => {
        const fcmToken = await getToken(messaging);
        if (fcmToken) {
            console.log('Your Firebase Token is:', fcmToken);
        } else {
            console.log('Failed to get token');
        }
    };

    const listenToForegroundNotifications = () => {
        const unsubscribe = onMessage(messaging, async remoteMessage => {
            console.log('*A new message arrived! (FOREGROUND)', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    };

    const listenToBackgroundNotifications = () => {
        setBackgroundMessageHandler(messaging, async remoteMessage => {
            console.log('A new message arrived! (BACKGROUND)', JSON.stringify(remoteMessage));
        });
    };

    const handleOnNotificationOpenedApp = () => {
        onNotificationOpenedApp(messaging, remoteMessage => {
            console.log('Notification caused app to open from background:', remoteMessage);
        });
    };

    const handleGetInitialNotification = async () => {
        const remoteMessage = await getInitialNotification(messaging);
        if (remoteMessage) {
            console.log('App opened from quit state by notification:', remoteMessage);
        }
    };

    useEffect(() => {
        requestUserPermission();
        getFCMToken();
        listenToBackgroundNotifications();
        const unsubscribe = listenToForegroundNotifications();
        handleOnNotificationOpenedApp();
        handleGetInitialNotification();

        return () => {
            unsubscribe && unsubscribe();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text>Notification Setup Complete</Text>
        </View>
    );
};

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
