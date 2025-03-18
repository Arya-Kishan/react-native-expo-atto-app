import { useEffect } from 'react';
import { requestFCMPermission, getFCMToken, listenToForegroundNotifications, listenToBackgroundNotifications, handleNotificationOpened, handleInitialNotification } from '../services/FCM_Service';
import { saveTokenToFirestore } from '@/services/api_services/firebase_api_services';
import { successToast } from '@/utils/toast';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/store';

export const useNotifications = (userId: string) => {
    const { loggedInUser } = useSelector((store: RootState) => store.auth);
    useEffect(() => {

        let unsubscribe: any;

        // Configure how notifications behave when received
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true, // <-- ensure sound plays
                shouldSetBadge: true,
            }),
        });

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                sound: 'default', // ensures sound on Android
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        const setupFCM = async () => {
            const hasPermission = await requestFCMPermission();
            if (hasPermission) {
                const token = await getFCMToken();
                if (token && userId || loggedInUser?.fcmToken !== token) {
                    await saveTokenToFirestore(userId, token);
                }
            }

            // Foreground listener
            unsubscribe = listenToForegroundNotifications((msg: any) => {
                successToast(msg?.notification?.title, msg?.notification?.body);
                console.log('Foreground Message:', msg);
            });

            // Background & quit state handlers
            listenToBackgroundNotifications((msg: any) => {
                console.log('Background Message:', msg);
            });

            handleNotificationOpened((msg: any) => {
                console.log('Opened from background:', msg);
            });

            handleInitialNotification((msg: any) => {
                console.log('Opened from quit state:', msg);
            });

            return () => {
                unsubscribe();
            };
        };

        setupFCM();

        return () => {
            if (unsubscribe) unsubscribe();
        };

    }, [userId]);
};
