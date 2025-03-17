import admin from "firebase-admin"

const FIREBASE_ADMIN_SDK = process.env.FIREBASE_ADMIN_SDK;

var serviceAccount = JSON.parse(FIREBASE_ADMIN_SDK)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://app-1dcec-default-rtdb.firebaseio.com"
});

const db = admin.firestore();


async function sendNotificationFCM(deviceToken, title, body) {

    const message = {
        notification: {
            title, body
        },
        android: {
            notification: {
                sound: 'default',
                icon: 'notification_icon', // <-- this will trigger the default sound on Android
            },
        },
        apns: {
            payload: {
                aps: {
                    sound: 'default', // <-- this will trigger the default sound on iOS
                },
            },
        },
        token: deviceToken
    };

    try {
        const response = await admin.messaging().send(message);
        return { success: true, result: response, message: 'notification sent' };
    } catch (error) {
        console.log(error);
        return { success: false, result: error, message: 'notification not sent' };
    }

}


async function sendNotificationsToAllUsers() {
    try {
        const usersSnapshot = await db.collection('users').get();

        const tokens = [];
        usersSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.fcmToken) {
                tokens.push(data.fcmToken);
            }
        });

        if (tokens.length === 0) {
            console.log('No FCM tokens found');
            return;
        }

        const multicastMessage = {
            notification: {
                title: 'Hello!',
                body: 'This is a broadcast message 🚀'
            },
            android: {
                notification: {
                    sound: 'default', // <-- this will trigger the default sound on Android
                    icon: 'notification_icon', // <-- this will trigger the default sound on Android

                },
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default', // <-- this will trigger the default sound on iOS
                    },
                },
            },
            tokens: tokens
        };

        console.log("tokens : ", tokens);

        const response = await admin.messaging().sendEachForMulticast(multicastMessage);

        response.responses.forEach((res, idx) => {
            if (res.success) {
                console.log(`Message sent successfully to token[${idx}]: ${tokens[idx]}`);
            } else {
                console.error(`Error sending to token[${idx}]: ${tokens[idx]}`, res.error);
            }
        });

        console.log(`${response.successCount} messages were sent successfully`);
        console.log(`${response.failureCount} messages failed`);

    } catch (error) {
        console.error('Error sending notifications:', error);
    }
}




export { sendNotificationFCM, sendNotificationsToAllUsers };