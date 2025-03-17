import { PermissionsAndroid, Platform } from 'react-native';
import { getMessaging, requestPermission, getToken, onMessage, setBackgroundMessageHandler, AuthorizationStatus, onNotificationOpenedApp, getInitialNotification } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';


const messaging = getMessaging(getApp());


export const requestFCMPermission = async () => {
    if (Platform.OS === 'ios') {
        const authStatus = await requestPermission(messaging);
        return authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;
    } else if (Platform.OS === 'android' && Platform.Version >= 33) {
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        return result === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
};

export const getFCMToken = async () => {
    const token = await getToken(messaging);
    return token;
};

export const listenToForegroundNotifications = (callback: (msg: any) => void) => {
    return onMessage(messaging, callback);
};

export const listenToBackgroundNotifications = (callback: (msg: any) => void) => {
    setBackgroundMessageHandler(messaging, async (remoteMessage) => {
        callback(remoteMessage);
        return Promise.resolve(); // Explicitly return a Promise
    });
};


export const handleNotificationOpened = (callback: (msg: any) => void) => {
    onNotificationOpenedApp(messaging, callback);
};

export const handleInitialNotification = async (callback: (msg: any) => void) => {
    const remoteMessage = await getInitialNotification(messaging);
    if (remoteMessage) callback(remoteMessage);
};
