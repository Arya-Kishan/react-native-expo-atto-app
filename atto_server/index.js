import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import { sendNotificationFCM, sendNotificationsToAllUsers } from './firebaseFCM.js'

const server = express();


server.use(express.json({ limit: '50kb' }));
server.use(cors({
    exposedHeaders: ["x-webbook-jwt-routes", "x-total-count"],
}));


server.get("/", (req, res) => {
    res.send("asss");
})

server.get("/send", (req, res) => {
    sendNotificationFCM("eulU9_boQWeignEA7HRlTa:APA91bFhQQcGPw-hYx2qxBCArPaUV4-iVRGzAztXTv4G7J7iFtga6q8LJ1UvZUvm5KrFdHCnIRJ2Xgev-IIXeC8NtYWjsYEYUvGhP0EUS6kMSWROh7_j3Pg", "Vishwamohini", "Vishwamohini is good biy");
    res.send("asss");
})

server.get("/send-all", (req, res) => {

   sendNotificationsToAllUsers();

    // sendNotificationFCM("Vishwamohini", "Vishwamohini is good biy");
    res.send("asss");
})


server.listen(8000, () => {
    console.log("SERVER LISTENED AT 8000");
})