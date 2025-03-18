import { Dimensions } from "react-native";
import { s, vs } from "react-native-size-matters";
import Constants from 'expo-constants';

const statusbarHeight = Constants.statusBarHeight;

export const AppConstants = {

    linearGradient: ["#492E87FF", "#6b46c1", "#845AE7FF"],

    gapBetweenSections: s(12),
    screenWidth: Dimensions.get("screen").width,
    screenHeight: Dimensions.get("screen").height,

    // COLORS
    white: "#FFFFFF",
    primaryColor: "#6b46c1",

    // BUTTON COLORS
    buttonColor1: "#6b46c1",
    buttonColor2: "#FFFFFFFF",
    buttonColorGray: "#E3E3E3FF",
    buttonColorViolet: "#6b46c1",
    buttonColorWhite: "#FFFFFFFF",
    buttonColorBlack: "#000000FF",

    // TEXT COLORS
    textColor1: "#FFFFFF",
    textColor2: "#6b46c1",
    textColorGray: "#E3E3E3FF",
    textColorViolet: "#6b46c1",
    textColorWhite: "#FFFFFFFF",
    textColorBlack: "#000000FF",

    // BORDER COLORS
    chipColor: "#007BBEFF",
    borderColor1: "#E3E3E3FF",
    borderColorWhite: "#E3E3E3FF",
    borderColorViolet: "#6b46c1",
    borderColorGray: "#E3E3E3FF",
    borderColor2: "#003A5AFF",

    // ICON COLORS
    iconColor1: "#E5FF00FF",
    iconColor2: "#FFFFFFFF",
    iconColorRed: "#FF0000FF",
    iconColorGreen: "#006317FF",
    iconColorGray: "#E3E3E3FF",
    iconColorViolet: "#6b46c1",
    iconColorBlack: "#000000FF",
    iconColorWhite: "#FFFFFFFF",

    // BACKGROUND COLORS
    White: "#FFFFFFFF",
    backgroundColor1: "#6b46c1",
    backgroundColorOffer: "#6b46c1",
    backgroundColorGray: "#E3E3E3FF",
    backgroundColorViolet: "#6b46c1",
    backgroundColorBlack: "#000000FF",
    backgroundColorWhite: "#FFFFFFFF",

    // ACTIVITY INDICATOR COLOR
    loaderColor1: "#00EEFFFF",
    loaderColorGray: "#E3E3E3FF",
    loaderColorViolet: "#6b46c1",
    loaderColorBlack: "#000000FF",
    loaderColorWhite: "#FFFFFFFF",

    // STATUS BAR
    statusBarHeight: statusbarHeight,

    // BORDER RADIUS
    buttonBorderRadius: s(10),
    sectionBorderRadius: s(10),
    inputBorderRadius: s(10),

    // PADDING
    screenPadding: s(15),
    buttonPadding: s(15),

}

export const AppSecretsKey = {

    GOOGLE_CLOUD_ANDROID_CLIENT_ID: "378876956779-erjp7ic1kul01m98l3duj6caes2pih7c.apps.googleusercontent.com",
    GOOGLE_CLOUD_IOS_CLIENT_ID: "378876956779-l8bi28rfjf4th6aots5gim9tb4plk860.apps.googleusercontent.com",
    GOOGLE_CLOUD_WEB_CLIENT_ID: "378876956779-g0le5skt7gj0cb773pjudl863g4pt9gm.apps.googleusercontent.com",
    EXPRESS_SERVER_BASE_URL: "http://192.168.1.2:8000"

}