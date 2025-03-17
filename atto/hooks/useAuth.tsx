import { userCredentialsType } from '@/AppTypes'
import { setSelectedAddress, setUserCredential, setUserState } from '@/Store/slices/authSlice'
import { AppDispatch } from '@/Store/store'
import { getUserAddress, getUserCredentials } from '@/services/api_services/firebase_api_services'
import { setUserAddressToAsyncStorage, setUserCredentialsToAsyncStorage } from '@/services/async_storage/async_storage_service'
import { auth, firestore } from "@/services/configs/firebaseConfig"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin as GoogleAuth, GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from "@react-native-google-signin/google-signin"
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Alert, Platform } from "react-native"
import { useDispatch } from 'react-redux'

const useAuth = () => {

    const [authLoading, setAuthLoading] = useState<boolean>(false);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // --------------GOOGLE SIGN START --------------------

    const configureGoogleSignIn = () => {
        if (Platform.OS === "ios") {
            GoogleAuth.configure({
                iosClientId: "378876956779-l8bi28rfjf4th6aots5gim9tb4plk860.apps.googleusercontent.com"
            });
        } else {
            GoogleAuth.configure({
                webClientId: "378876956779-g0le5skt7gj0cb773pjudl863g4pt9gm.apps.googleusercontent.com"
            });
        }
    }

    const handleGoogleSignIn = async (loginState: "signin" | "signup") => {

        try {
            setAuthLoading(true);
            await GoogleAuth.hasPlayServices();
            const response = await GoogleAuth.signIn();
            if (isSuccessResponse(response)) {
                const { idToken, user } = response.data;
                const { email, name, id, photo } = user;
                if (loginState == "signin") {
                    handleSignIn(email, `${email}@12`);
                } else {
                    handleSignUp(name ?? email, email, `${email}@12`);
                }
            } else {
                Alert.alert("Denied", "Google Sign Denied By User")
            }
        } catch (error) {
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        Alert.alert("IN Progress", `Google sign in progress : ${error}`);
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        Alert.alert("Not Available", `Play Service not available : ${error}`);
                        break;
                    default:
                        Alert.alert("Not Available", `${error.code} : ${error}`);
                }
            } else {
                Alert.alert("Error Occured", ` Error : ${error}`);
            }
            setAuthLoading(false);
        }

    }


    useEffect(() => {
        configureGoogleSignIn();
    }, [])

    // --------------GOOGLE SIGN END --------------------







    // --------------FIREBASE SIGN START --------------------

    const getFirebaseErrorMessage = (errorCode: string) => {
        const errorMessages: { [key: string]: string } = {
            'auth/invalid-email': 'The email address is not valid.',
            'auth/invalid-credential': 'The credentials is not valid or user not exist.',
            'auth/user-not-found': 'No account found with this email.',
            'auth/wrong-password': 'Incorrect password. Try again.',
            'auth/email-already-in-use': 'This email is already in use.',
            'auth/weak-password': 'Password should be at least 6 characters.',
            'auth/network-request-failed': 'Network error. Check your internet connection.',
            'auth/too-many-requests': 'Too many failed attempts. Try again later.',
            'auth/requires-recent-login': 'Please log in again before performing this action.',
        };

        return errorMessages[errorCode] || 'An unknown error occurred. Please try again.';
    };


    const handleSignIn = async (email: string, password: string) => {
        setAuthLoading(true);
        try {
            dispatch(setUserState("login"));
            const userCredentails = await signInWithEmailAndPassword(auth, email, password);
            const { displayName, email: userEmail, uid } = userCredentails.user;

            // GET USER FROM FIRESTORE AND SAVE TO ASYNCSTORAGE
            const { data: userData } = await getUserCredentials(uid);

            // GET ADDRESSES AND SAVE TO ASYNCSTORAGE
            const { data: addressesList } = await getUserAddress(uid);

            const newUserCredential: userCredentialsType = {
                name: displayName!,
                email: userEmail!,
                role: userData.role,
                uuid: uid,
                createdAt: userData.createAt
            }

            // STORING USER CREDENTAIL TO REDUX STORE
            dispatch(setUserCredential(newUserCredential));

            // STORING USER CREDENTAIL TO ASYNC STORAGE
            await setUserCredentialsToAsyncStorage(newUserCredential);

            // RIDIRECT USER TO ADD ADRESS SCREEN IF THERE IS NO ADDRESS ADDED
            if (addressesList.length == 0) {
                router.push("/add-address");
                return;
            }

            // ADDING ADDRESS TO REDUX STORE
            dispatch(setSelectedAddress(addressesList[0]));

            // ADDING ADDRESS TO ASYNC STORAGE
            await setUserAddressToAsyncStorage(addressesList[0]);
            router.replace("/(tabs)");
        } catch (error: any) {
            // IF USER SIGNED WITH GOOGLE BUT NOT EXIST IN FIREBASE
            handleLogOut();
            Alert.alert("Error !", `${getFirebaseErrorMessage(error?.code) ?? error}`);
        } finally {
            setAuthLoading(false);
        }
    }

    const handleSignUp = async (name: string, email: string, password: string) => {
        try {
            setAuthLoading(true);
            dispatch(setUserState("signup"));
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            // UPDATING PROFILE NAME
            await updateProfile(user, {
                displayName: name,
            })

            const newUserCredential: userCredentialsType = {
                name: name,
                email: email,
                role: "user",
                uuid: user.uid,
                createdAt: (new Date()).toString()
            }

            // Store additional fields in Firestore
            await setDoc(doc(firestore, "users", user.uid), newUserCredential);

            // STORING TO REDUX STORE
            dispatch(setUserCredential(newUserCredential))

            // STORING TO ASYNC STORAGE
            await setUserCredentialsToAsyncStorage(newUserCredential);

            setAuthLoading(false);
            router.replace("/add-address");
        } catch (error: any) {

            const errorMessage = error?.message || "Unknown error";
            const match = errorMessage.match(/\(auth\/([^\)]+)\)/);
            const errorCode = match ? `auth/${match[1]}` : "unknown_error";

            if (errorCode === "auth/email-already-in-use") {
                Alert.alert("Error Occured", "This email is already registered. Try logging in instead.");
            } else if (errorCode === "auth/invalid-email") {
                Alert.alert("Error Occured", "Invalid email format. Please enter a valid email.");
            } else {
                Alert.alert("Error Occured", `Authentication error: ${errorCode}`);
            }
            setAuthLoading(false);
        }
    }


    // --------------FIREBASE SIGN END --------------------











    //  --------------- SINGOUT START FOR BOTH GOOGLE AND FIREBASE ------------

    const handleLogOut = async () => {
        try {

            const firebaseUser = auth.currentUser;
            const googleSignedIn = GoogleSignin.getCurrentUser();

            if (firebaseUser && googleSignedIn) {
                await signOut(auth);
                await GoogleSignin.signOut();
            } else if (firebaseUser) {
                await signOut(auth);
            } else if (googleSignedIn) {
                await GoogleSignin.signOut();
            } else {
                // Alert.alert("User : ", `No user is signed in:`);
                console.log("NO USER IS SIGNED IN");
            }

            await AsyncStorage.removeItem("address");
            await AsyncStorage.removeItem("user");

            dispatch(setUserCredential(null));
            dispatch(setUserState(null));
            router.push("/select-auth");

        } catch (error) {
        }
    }

    //  --------------- SINGOUT END FOR BOTH GOOGLE AND FIREBASE ------------


    console.log("authLoading ------- INSIDE USEAUTH -------- : ", authLoading)




    return { authLoading, handleSignIn, handleSignUp, handleGoogleSignIn, handleLogOut }
}

export default useAuth;