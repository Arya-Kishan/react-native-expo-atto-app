import { AppConstants } from "@/AppConstants";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { s, vs } from "react-native-size-matters";

const everydayCleaning = [
    {
        title: "The expert is trained to",
        features: [
            "Sweep & mop acccessible areas",
            "Dry dust/wet wipe furniture, fixtures, wardrobes",
            "Dry dust walls, fans, ceilings, windiw grills, curtains, etc",
            "Change or rearrange the bedding",
            "Dispose of wet & dry waste"
        ]
    },
    {
        title: "Service excludes",
        features: [
            "Sweeping & mopping inaccessible areas",
            "Moving heavy furniture",
            "Cleaning outside windows or areas needing a ladder",
            "Washing bed sheets, pillows covers, blankets, etc"
        ]
    },
    {
        title: "What we need from you",
        materials: [
            {
                title: "Mop & Bucket",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Surface cleaner",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Dusting cloth",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Cleaning brush",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Broom",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Dustpan",
                image: <Ionicons name="add-circle" size={40} />,
            },
        ]
    },
    {
        title: "Everyday Cleaning"
    }
]

const weeklyCleaning = [
    {
        title: "The expert is trained to",
        features: [
            "Dry dust ceiling, furniture, fixtures, and fans (if accessible)",
            "Dry dust/wet wipe walls, showpieces, vases, and frames",
            "Empty, clean, and replace contents in wardrobes/cabinets/drawers",
            "Dry dust/wet wipe windows (inside only) and window grills",
            "Dry dust curtains, curtain rods, sofas, carpets, and door mats"
        ]
    },
    {
        title: "Service excludes",
        features: [
            "wet wipe the ceiling",
            "Dust chandeliers and electrical fixtures",
            "Wet wipe/shampoo upholstery",
            "Clean windows from the outside",
            "Use an unstable or risky ladder or stool",
        ]
    },
    {
        title: "What we need from you",
        materials: [
            {
                title: "Mop & Bucket",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Surface cleaner",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Dusting cloth",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Cleaning brush",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Broom",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Dustpan",
                image: <Ionicons name="add-circle" size={40} />,
            },
        ]
    },
    {
        title: "Weekly Cleaning"
    }
]

const laundry = [
    {
        title: "The expert is trained to",
        features: [
            "Sort, wash, and dry clothes",
            "Fold and iron clothes"
        ]
    },
    {
        title: "Service excludes",
        features: [
            "Ironing clothes with rich zari, embroidery or expensive fabrics",
            "Hand wash biohazard-stained clothes",
            "Clean washing machine"
        ]
    },
    {
        title: "What we need from you",
        materials: [
            {
                title: "Washing Supplies",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Machine Instruction",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Drying rack",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Iron and Board",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Mesh bags",
                image: <Ionicons name="add-circle" size={40} />,
            },
        ]
    },
    {
        title: "Laundry"
    }
]

const dishWashing = [
    {
        title: "The expert is trained to",
        features: [
            "Clean utensils",
            "Scrub kitchen sink",
            "Clean gas stove grills, burner, & wipe stove top",
            "Ensure sink & floor are clean & dry"
        ]
    },
    {
        title: "Service excludes",
        features: [
            "Hand wash biohazard-stained utensils",
            "Drying utensils",
        ]
    },
    {
        title: "What we need from you",
        materials: [
            {
                title: "Dish soap/liquid",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Scrubber/sponge",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Dishcloth",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Dish Rack",
                image: <Ionicons name="add-circle" size={40} />,
            },
        ]
    },
    {
        title: "Dish Washing"
    }
]

const bathroomCleaning = [
    {
        title: "The expert is trained to",
        features: [
            "Wet wipe the mirror, bathtub and accessible walls",
            "Clean the WC (rim, seat, lid)",
            "Scrub the sink",
            "Clean bathroom fixtures and fittings"
        ]
    },
    {
        title: "Service excludes",
        features: [
            "Hard stain removal",
            "Cleaning the ceiling",
            "Unclogging drains or disassembling the toilet tank",
        ]
    },
    {
        title: "What we need from you",
        materials: [
            {
                title: "All-purpose cleaner",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Toilet cleaner and brush",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Mop and bucket",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Scrubber or sponge",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Microfiber cloth",
                image: <Ionicons name="add-circle" size={40} />,
            },
        ]
    },
    {
        title: "Bathroom Cleaning"
    }
]

const kitchenPrep = [
    {
        title: "The expert is trained to",
        features: [
            "Chop fruits and vegetables",
            "Clean leafy vegetables and herbs",
            "Sort fruits and vegetables",
            "Knead dough",
            "Soak rice and pulses"
        ]
    },
    {
        title: "Service excludes",
        features: [
            "Any task related to meat or seafood",
            "Cooking or baking",
            "Any other tasks that involve gas or stove",
        ]
    },
    {
        title: "What we need from you",
        materials: [
            {
                title: "Knife",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Chopping board",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Ingredients",
                image: <Ionicons name="add-circle" size={40} />,
            },
            {
                title: "Clear instruction",
                image: <Ionicons name="add-circle" size={40} />,
            }
        ]
    },
    {
        title: "Kitchen Prep"
    }
]

const headings = [
    { title: "Everyday Cleaning", item: everydayCleaning },
    { title: "Weekly Cleaning", item: weeklyCleaning },
    { title: "Laundry", item: laundry },
    { title: "Dish Washing", item: dishWashing },
    { title: "Bathroom Cleaning", item: bathroomCleaning },
    { title: "Kitchen Prep", item: kitchenPrep }
]



interface ServiceModalType {
    visible: boolean,
    setVisible: (val: boolean) => void,
    selectedService: string
}

const ServiceModal: React.FC<ServiceModalType> = ({ visible, setVisible, selectedService }) => {

    const [data, setData] = useState(everydayCleaning);

    useEffect(() => {
        console.log("selectedService : ", selectedService);
        const selectedData = headings.filter((item) => (item.title == selectedService));
        console.log("selectedData : ", selectedData)
        setData(selectedData[0].item);
    }, [])

    return (
        <View style={styles.modalMain}>

            {/* USED FOR CLOSING THE MODAL */}
            <Pressable onPress={() => setVisible(false)} style={{ height: "40%", width: "100%" }} />


            <View style={styles.modalBox}>

                <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginVertical: vs(6), gap: s(10) }}>
                        {headings.map((item) => (
                            <Pressable onPress={() => { setData(item.item) }} key={item.title} style={[styles.headerBox, data[3].title == item.title && styles.selectedHeaderBox]}>
                                <Text style={styles.headerBoxTxt}>{item.title}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>

                {/* ✅ Wrap content inside ScrollView */}
                <ScrollView contentContainerStyle={{ paddingBottom: vs(20) }} showsVerticalScrollIndicator={false}>

                    {/* THE SERVICE EXCLUDES */}
                    <View style={styles.section}>
                        <Text style={styles.title}>The Expert is trained to</Text>

                        {data[0].features?.map((item, index) => (
                            <View key={index} style={styles.listItem}>
                                <Ionicons name="checkmark-circle" size={22} color={AppConstants.iconColorGreen} />
                                <Text>{item}</Text>
                            </View>
                        ))}
                    </View>

                    {/* SERVICE EXCLUDES */}
                    <View style={styles.section}>
                        <Text style={styles.title}>Service Excludes</Text>

                        {data[1].features?.map((item, index) => (
                            <View key={index} style={styles.listItem}>
                                <MaterialIcons name="cancel" size={22} color={AppConstants.iconColorRed} />
                                <Text>{item}</Text>
                            </View>
                        ))}
                    </View>

                    {/* WHAT WE NEED FROM YOU */}
                    <View style={styles.section}>
                        <Text style={styles.title}>What we need from you</Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: s(15) }}>
                            {data[2].materials?.map((item, index) => (
                                <View key={index} style={{ gap: vs(4), alignItems: "center" }}>
                                    <View style={styles.iconBox}>
                                        {item.image}
                                    </View>
                                    <Text>{item.title}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                </ScrollView>
            </View>

        </View>
    );
};

export default ServiceModal;

const styles = StyleSheet.create({
    modalMain: {
        flex: 1,
        width: "100%",
        height: AppConstants.screenHeight,
        backgroundColor: "#00000072",
    },
    modalBox: {
        width: "100%",
        height: "60%", // ✅ Fixed height to enable scrolling
        backgroundColor: AppConstants.backgroundColorWhite,
        padding: s(20),
        borderTopLeftRadius: s(20),
        borderTopRightRadius: s(20),
    },
    headerBox: { paddingHorizontal: s(20), borderRadius: s(10), borderWidth: 2, paddingVertical: vs(6) },
    headerBoxTxt: {},
    selectedHeaderBox: { backgroundColor: AppConstants.backgroundColor1, borderWidth: 0 },
    selectedHeaderBoxTxt: {},
    section: {
        width: "100%",
        padding: s(20),
        borderColor: AppConstants.borderColor1,
        borderWidth: 2,
        gap: vs(8),
        borderRadius: s(20),
        marginBottom: vs(15),
    },
    title: {
        fontWeight: "800",
    },
    listItem: {
        flexDirection: "row",
        gap: s(6),
        alignItems: "center",
    },
    iconBox: {
        width: s(80),
        height: s(80),
        borderRadius: s(20),
        borderWidth: 2,
        borderColor: AppConstants.borderColor1,
        justifyContent: "center",
        alignItems: "center",
    },
});
