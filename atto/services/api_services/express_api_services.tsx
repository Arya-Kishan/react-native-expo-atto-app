import { AppSecretsKey } from '@/AppConstants';
import axios from 'axios';
import { Alert } from 'react-native';

const BASE_URL = AppSecretsKey.EXPRESS_SERVER_BASE_URL;

export const sendNotificationToAllAdmin = async (name: string, time: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/send-all-admins`,
            {
                name: name,
                time: time
            }
            // {
            //     headers: { 'Content-Type': 'application/json' }
            // }
        );
        return { data: response.data, message: "Email Send Successfully", success: true };
    } catch (error: any) {
        Alert.alert("Error !", `Failed to Send Email to All Admins : ${error}`);
        return { data: null, message: "Email Not Send Successfully", success: false };
    }
};

export const sendNotificationToAllUsers = async (title: string, description: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/send-all-users`,
            {
                title: title,
                description: description
            }
            // {
            //     headers: { 'Content-Type': 'application/json' }
            // }
        );
        return { data: response.data, message: "Email Send Successfully", success: true };
    } catch (error: any) {
        Alert.alert("Error !", `Failed to Send Email to All Users : ${error}`);
        return { data: null, message: "Email Not Send Successfully", success: false };
    }
};

export const sendIssueEmail = async (email: string, issue: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/send-email`,
            {
                userEmail: email,
                problem: issue
            }
            // {
            //     headers: { 'Content-Type': 'application/json' }
            // }
        );
        Alert.alert("Email Sent", "Our Customer Service will contact you soon");
        return { data: response.data, message: "Email Send Successfully", success: true };
    } catch (error: any) {
        Alert.alert("Error !", `Failed to Send Email for issue - Try Later : ${error}`);
        return { data: null, message: "Email Not Send Successfully", success: false };
    }
};