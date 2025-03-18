import nodemailer from 'nodemailer'

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "arya12345kishan@gmail.com",
        pass: process.env.EMAIL_NODEMAILER,
    },
});


export const sendMail = async (email, text) => {

    try {
        await transporter.sendMail({
            from: 'Atto App <arya12345kishan@gmail.com>',
            to: 'arya12345kishan@gmail.com',
            subject: "Help Atto 👋",
            text: `Issue : ${text} \n userEmail : ${email} `,
        });

        return { success: true, message: "Email Sent", error: null };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Email Not Sent", error: `${error}` };
    }

}