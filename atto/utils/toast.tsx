import Toast from "react-native-toast-message";

export const successToast = (title: string, subTitle: string) => {
    Toast.show({
        type: 'success',
        text1: title,
        text2: subTitle,
        position: 'top',
        visibilityTime: 10000, // Duration in ms
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
    });
}

export const errorToast = (title: string, subTitle: string) => {
    Toast.show({
        type: "error",
        text1: title,
        text2: subTitle,
        position: 'top',
        visibilityTime: 10000, // Duration in ms
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
    });
}

export const warningToast = (title: string, subTitle: string) => {
    Toast.show({
        type: "info",
        text1: title,
        text2: subTitle,
        position: 'top',
        visibilityTime: 10000, // Duration in ms
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
    });
}