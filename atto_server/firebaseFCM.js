import admin from "firebase-admin"

const FIREBASE_ADMIN_SDK = process.env.FIREBASE_ADMIN_SDK;

var serviceAccount = JSON.parse(FIREBASE_ADMIN_SDK)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://app-1dcec-default-rtdb.firebaseio.com"
});

const db = admin.firestore();


async function sendNotificationToAllAdmin(title, description) {
    console.log("INSIDE SEND NOTIFICATION TO ALL ADMINS")
    try {
        console.log("FIREBASE FETCHING ALL USER START")
        const usersSnapshot = await db.collection('users').get();
        console.log("FIREBASE FETCHING ALL USER END")

        const tokens = [];
        usersSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.fcmToken && data.role == "admin") {
                tokens.push(data.fcmToken);
            }
        });

        console.log("tokens : ", tokens);

        if (tokens.length === 0) {
            console.log('No FCM tokens found');
            return { success: false, message: "NO FCM TOKEN FOUND", data: null, error: null };
        }

        const multicastMessage = {
            notification: {
                title: title,
                body: description
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

        console.log("SENDING NOTIFICATION TO ALL ADMINS STARTED")
        const response = await admin.messaging().sendEachForMulticast(multicastMessage);
        console.log("SENDING NOTIFICATION TO ALL ADMINS END")

        response.responses.forEach((res, idx) => {
            if (res.success) {
                console.log(`Message sent successfully to token[${idx}]: ${tokens[idx]}`);
            } else {
                console.error(`Error sending to token[${idx}]: ${tokens[idx]}`, res.error);
            }
        });

        console.log(`${response.successCount} messages were sent successfully`);
        console.log(`${response.failureCount} messages failed`);
        return { success: true, message: "NOTIFICATION SEND TO ALL USERS", data: { successCount: response.successCount, failureCount: response.failureCount }, error: null };

    } catch (error) {
        console.error('Error sending notifications:', error);
        return { success: false, message: "ERROR IN NOTIFICATION SENDING TO ALL USER", data: null, error: JSON.stringify(error) };
    }
}


async function sendNotificationsToAllUsers(title, description) {
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
                title: title,
                body: description
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
        return { success: true, message: "NOTIFICATION SEND TO ALL USERS", data: { successCount: response.successCount, failureCount: response.failureCount }, error: null };

    } catch (error) {
        console.error('Error sending notifications:', error);
        return { success: false, message: "ERROR IN NOTIFICATION SENDING TO ALL USER", data: null, error: JSON.stringify(error) };
    }
}




export { sendNotificationToAllAdmin, sendNotificationsToAllUsers };