import { Dimensions } from "react-native";
import { s, vs } from "react-native-size-matters";
const statusbarHeight = vs(20);

export const AppConstants = {
    gapBetweenSections: s(12),
    screenWidth: Dimensions.get("screen").width,
    screenHeight: Dimensions.get("screen").height,

    // COLORS
    white: "#FFFFFF",
    primaryColor: "#6b46c1",

    // BUTTON COLORS
    buttonColor1: "#6b46c1",
    buttonColor2: "#FFFFFFFF",

    // TEXT COLORS
    textColor1: "#FFFFFF",
    textColor2: "#6b46c1",

    // BORDER COLORS
    chipColor: "#007BBEFF",
    borderColor1: "#E3E3E3FF",
    borderColorWhite: "#E3E3E3FF",
    borderColorPrimary: "#6b46c1",
    borderColor2: "#003A5AFF",

    // ICON COLORS
    iconColor1: "#E5FF00FF",
    iconColor2: "#FFFFFFFF",
    iconColorRed: "#FF0000FF",
    iconColorGreen: "#006317FF",

    // BACKGROUND COLORS
    backgroundColorWhite: "#FFFFFFFF",
    backgroundColor1: "#6b46c1",
    backgroundColorOffer: "#6b46c1",

    // ACTIVITY INDICATOR COLOR
    loaderColorWhite: "#FFFFFF",
    loaderColor1: "#00EEFFFF",

    // STATUS BAR
    statusBarHeight: statusbarHeight,

    // BORDER RADIUS
    buttonBorderRadius: s(10),
    sectionBorderRadius: s(10),
    inputBorderRadius: s(10),

    // PADDING
    screenPadding: s(15),
    buttonPadding: s(15),

    emptyProductList: [
        {
            id: 1,
            price: 1,
            rating: 1,
            title: "",
            thumbnail: "",
            description: "",
            images: [],
            tags: [],
        },
        {
            id: 2,
            price: 1,
            rating: 1,
            title: "",
            thumbnail: "",
            description: "",
            images: [],
            tags: [],
        },
        {
            id: 3,
            price: 1,
            rating: 1,
            title: "",
            thumbnail: "",
            description: "",
            images: [],
            tags: [],
        },
        {
            id: 4,
            price: 1,
            rating: 1,
            title: "",
            thumbnail: "",
            description: "",
            images: [],
            tags: [],
        },
        {
            id: 5,
            price: 1,
            rating: 1,
            title: "",
            thumbnail: "",
            description: "",
            images: [],
            tags: [],
        },
        {
            id: 6,
            price: 1,
            rating: 1,
            title: "",
            thumbnail: "",
            description: "",
            images: [],
            tags: [],
        },
    ],

}