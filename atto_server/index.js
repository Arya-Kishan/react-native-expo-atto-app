import express from 'express'
import 'dotenv/config'
import cors from 'cors'
const PORT = process.env.PORT || 8000

import { sendNotificationToAllAdmin, sendNotificationsToAllUsers } from './firebaseFCM.js'
import { formatTimestamp } from './utils/Helper.js'
import { sendMail } from './services/NodeMailer.js'

const server = express();


server.use(express.json({ limit: '50kb' }));
server.use(cors({
    exposedHeaders: ["x-webbook-jwt-routes", "x-total-count"],
}));


server.get("/", (req, res) => {
    res.send("asss");
})

server.post("/send-all-admins", async (req, res) => {
    const { name, time } = req.body;

    const data = await sendNotificationToAllAdmin("New Booking 💕", `${name} made a booking at ${formatTimestamp(time)}`);
    if (data.success) {
        res.json(data);
    } else {
        res.json(data);
    }

})

server.post("/send-all-users", async (req, res) => {

    const { title, description } = req.body;

    const data = await sendNotificationsToAllUsers(title, description);
    if (data.success) {
        res.json(data);
    } else {
        res.json(data);
    }
})

server.post("/send-email", async (req, res) => {
    const { userEmail, problem } = req.body;
    const data = await sendMail(userEmail, problem);
    res.json(data);
})


server.listen(PORT, () => {
    console.log("SERVER LISTENED AT 8000");
})