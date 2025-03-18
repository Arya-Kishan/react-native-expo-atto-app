import { apiData, bookingType, SlotsType, userAddressType, userCredentialsType } from "@/AppTypes";
import { addDoc, collection, doc, DocumentData, DocumentReference, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Alert } from "react-native";
import { firestore } from "../configs/firebaseConfig";
import { errorToast } from "@/utils/toast";

// GET ANY DATA FROM FIRESTORE AFTER ADDING IT TO FIREBASE FROM IT REFERENCE
const getDataFromFirestoreRef = async (docRef: DocumentReference<DocumentData>) => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw Error("Error in fetching from docRef");
    }
};


//  ------------------------- USERS -----------------------------
// FUNCTION TO GET USER CREDENTIALS
export const getUserCredentials = async (uuid: string): Promise<apiData> => {

    try {
        const docRef = doc(firestore, "users", uuid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { data: docSnap.data(), message: "Bookings retrieved successfully", success: true };
        } else {
            errorToast("Error", "No such user exist as document");
            return { data: null, message: "Bookings retrieved successfully", success: true };
        }
    } catch (error) {
        errorToast("Error Occured", `No such user exist as document ${error}`);
        return { data: null, message: "Bookings retrieved failure", success: true };
    }

}

// FUNCTION TO FETCH ALL USERS
export const getAllUsers = async (): Promise<apiData> => {
    try {
        const usersCollection = collection(firestore, "users");
        const snapshot = await getDocs(usersCollection);
        const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { data: usersList, message: "Users retrieved success", success: true };
    } catch (error) {
        console.error("Error fetching users:", error);
        Alert.alert("Error !", `Error in fetching all users ${error}`);
        return { data: null, message: "Users retrieved failure", success: false };
    }
};





//  ---------------- ADDRESS --------------

// Function to save address to Firestore
export const saveAddressToFirebase = async (address: userAddressType, user: userCredentialsType): Promise<apiData> => {

    if (!address.pinCode || !address.house || !address.street || !address.city || !address.state || !user || !address.phone) {
        Alert.alert("Error", "Please fill in all required fields.");
        return { data: null, message: "Address Filed Checking", success: false };
    }

    try {
        const docRef = await addDoc(collection(firestore, "addresses"), {
            uuid: user.uuid,
            pinCode: address.pinCode,
            house: address.house,
            phone: address.phone,
            street: address.street,
            landmark: address.landmark,
            city: address.city,
            state: address.state,
            type: address.type,
        });

        const newAddress = await getDataFromFirestoreRef(docRef);

        Alert.alert("Success", "Address saved successfully!");
        return { data: newAddress, message: "Address added successfully", success: true };

    } catch (error) {
        Alert.alert("Error", JSON.stringify(error));
        return { data: null, message: "Address added failure", success: false };
    }
};

// FUNCTION TO GET USERR ADDRESS
export const getUserAddress = async (uid: string): Promise<apiData> => {

    try {
        const addressRef = collection(firestore, 'addresses'); // Reference to "users" collection
        const q = query(addressRef, where('uuid', '==', uid)); // Query for age = 20

        const querySnapshot = await getDocs(q);

        // Map results to an array
        const addressList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return { data: addressList, message: "Address retrieved successfully", success: true };
        // Return the array of users
    } catch (error) {
        Alert.alert("Error fetching address", JSON.stringify(error));
        return { data: null, message: "Address retrieved failure", success: true };
    }

}


// UPDATING USER ADDRESS
export const updateUserProfile = async (userAddress: userAddressType, user: userCredentialsType) => {
    console.log("userAddress : ", userAddress)
    console.log("user : ", user)

    try {

        const addressRef = doc(firestore, 'addresses', userAddress.id!);
        await updateDoc(addressRef, { ...userAddress });
        const updatedUserAddress = await getDataFromFirestoreRef(addressRef);

        const userRef = doc(firestore, 'users', user.uuid);
        await updateDoc(userRef, { ...user });
        const updatedUser = await getDataFromFirestoreRef(userRef);


        Alert.alert("Success", "Profile updated successfully!");

        return { data: { updatedUserAddress, updatedUser }, message: "Profile updated successfully", success: true };

    } catch (error) {
        Alert.alert("Error", `Profile Failed! ${error}`);
        return { data: null, message: "Profile update failed", success: false };
    }


};




//  ---------------- BOOKINGS --------------

// FUNCTION TO ADD BOOKING
export const createBooking = async (data: bookingType): Promise<apiData> => {

    try {

        await addDoc(collection(firestore, "bookings"), data);
        // UPDATING SLOT IT GET BOOKED
        const slotRef = doc(firestore, 'slots', data.slotId!);
        await updateDoc(slotRef, {
            isBooked: true, // or any other field you want to update
        });

        Alert.alert("Success", "Bookings saved successfully!");
        return { data: null, message: "Booking retrieved successfully", success: true };

    } catch (error) {
        Alert.alert("Error", `Failed to save bookings : ${error}`);
        return { data: null, message: "Booking retrieved failure", success: false };
    }
};

// FUNCTION TO GET USER BOOKING
export const getUserBookings = async (loggedInUser: userCredentialsType): Promise<apiData> => {

    try {
        const bookingsRef = collection(firestore, 'bookings');
        const q = query(bookingsRef, where('uuid', '==', loggedInUser.uuid));

        const querySnapshot = await getDocs(q);

        // Map results to an array
        const bookingsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return { data: bookingsList, message: "Bookings retrieved successfully", success: true };
        // Return the array of users
    } catch (error) {
        Alert.alert("Error fetching Bookings", JSON.stringify(error));
        return { data: null, message: "Bookings retrieved failure", success: true };
    }

}

// FUNCTION TO GET ALL BOOKING
export const getAllBookings = async (): Promise<apiData> => {

    try {
        const bookingsCollection = collection(firestore, "bookings"); // Reference to "users" collection
        const snapshot = await getDocs(bookingsCollection); // Fetch all documents
        const bookingsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Convert snapshot to array
        return { data: bookingsList, message: "Bookings retrieved success", success: true }; // Return users array
    } catch (error) {
        console.error("Error fetching users:", error);
        return { data: null, message: "Bookings retrieved failure", success: false };
    }

}






//  ---------------- SLOTS --------------

// FUNCTION TO ADD SLOTS
export const createSlotsFireStore = async (data: SlotsType): Promise<apiData> => {

    if (!data.availableTime || !data.createOn || !data.createBy || !data.previousPrice || !data.price || !data.workingTime || !data.offer) {
        Alert.alert("Error", "Please fill in all required fields.");
        return { data: null, message: "Slot Field Checking", success: false };;
    }

    try {
        const docRef = await addDoc(collection(firestore, "slots"), data);
        const newBooking = await getDataFromFirestoreRef(docRef);
        return { data: newBooking, message: "Slots created successfully", success: true };
    } catch (error) {
        Alert.alert("Error", `Failed to save Slots : ${error}`);
        return { data: null, message: "Slots Creation failure", success: false };
    }
};

// FUNCTION TO FETCH ALL SLOTS
export const getAllSlots = async (): Promise<apiData> => {
    try {
        const slotsCollection = collection(firestore, "slots");
        const snapshot = await getDocs(slotsCollection);
        const slotsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { data: slotsList, message: "Slots retrieved success", success: true };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { data: null, message: "Slots retrieved failure", success: false };
    }
};

export const updateSlot = async (data: SlotsType, isBooked: boolean) => {

    console.log("UPDATING SLOT : ", isBooked)

    try {
        const slotRef = doc(firestore, 'slots', data.id!);
        await updateDoc(slotRef, {
            isBooked: isBooked, // or any other field you want to update
        });
        return { data: null, message: "Slots updated success", success: true };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { data: null, message: "Slots updated failure", success: false };
    }
}






// UPDATING FCM TOKEN IN USER FIRESTORE COLLECTION
export const saveTokenToFirestore = async (userId: string, token: string) => {
    try {
        const userRef = doc(firestore, 'users', userId);
        await updateDoc(userRef, {
            fcmToken: token, // or any other field you want to update
        });
        console.log('User token updated!');
    } catch (error) {
        console.error('Error updating user token:', error);
    }
};
