import { AppConstants } from "@/AppConstants";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302504/atto/icons/mop_bucket_bmp3pp.png",
            },
            {
                title: "Surface cleaner",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302505/atto/icons/surface_cleaner_brlh35.png",
            },
            {
                title: "Dusting cloth",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302500/atto/icons/dusting_cloth_cibdrf.png",
            },
            {
                title: "Cleaning brush",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302499/atto/icons/cleaning_brush_zvtyx2.png",
            },
            {
                title: "Broom",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302499/atto/icons/broom_d3siv4.png",
            },
            {
                title: "Dustpan",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302500/atto/icons/dustpan_g5qbcw.png",
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
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302504/atto/icons/mop_bucket_bmp3pp.png",
            },
            {
                title: "Surface cleaner",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302505/atto/icons/surface_cleaner_brlh35.png",
            },
            {
                title: "Dusting cloth",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302500/atto/icons/dusting_cloth_cibdrf.png",
            },
            {
                title: "Cleaning brush",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302499/atto/icons/cleaning_brush_zvtyx2.png",
            },
            {
                title: "Broom",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302499/atto/icons/broom_d3siv4.png",
            },
            {
                title: "Dustpan",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302500/atto/icons/dustpan_g5qbcw.png",
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
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302506/atto/icons/washing_supplies_y482w8.png",
            },
            {
                title: "Machine Instruction",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302503/atto/icons/machine_instruction_deamtp.png",
            },
            {
                title: "Drying rack",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302500/atto/icons/drying_rack_c7cnac.png",
            },
            {
                title: "Iron and Board",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302501/atto/icons/iron_board_ms16t6.png",
            },
            {
                title: "Mesh bags",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302503/atto/icons/mesh_bags_urt1t2.png",
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
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302500/atto/icons/dish_soap_vd3xud.png",
            },
            {
                title: "Scrubber/sponge",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302504/atto/icons/scrubber_ycl09l.png",
            },
            {
                title: "Dishcloth",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302500/atto/icons/dusting_cloth_cibdrf.png",
            },
            {
                title: "Dish Rack",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302499/atto/icons/dish_rack_ybihjm.png",
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
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742303356/atto/icons/all_purpose_n4hsaj.png",
            },
            {
                title: "Toilet cleaner and brush",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742303320/atto/icons/toilet_cleaner_eymdiv.png",
            },
            {
                title: "Mop and bucket",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302504/atto/icons/mop_bucket_bmp3pp.png",
            },
            {
                title: "Scrubber or sponge",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302504/atto/icons/scrubber_ycl09l.png",
            },
            {
                title: "Microfiber cloth",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302500/atto/icons/dusting_cloth_cibdrf.png",
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
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302502/atto/icons/knife_ragkpx.png",
            },
            {
                title: "Chopping board",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302499/atto/icons/chopping_board_s7ou4f.png",
            },
            {
                title: "Ingredients",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302500/atto/icons/ingredients_nv1uon.png",
            },
            {
                title: "Clear instruction",
                image: "https://res.cloudinary.com/dwvuqahw2/image/upload/v1742302499/atto/icons/clear_instruction_khdqkc.png",
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
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginVertical: vs(6), marginBottom: vs(10), gap: s(0) }}>
                        {headings.map((item) => (
                            <Pressable onPress={() => { setData(item.item) }} key={item.title} style={[styles.headerBox, data[3].title == item.title && styles.selectedHeaderBox]}>
                                <Text style={[styles.headerBoxTxt, data[3].title == item.title && styles.selectedTxt]}>{item.title}</Text>
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
                                        <Image source={{ uri: item.image }} style={{ width: s(40), height: s(40) }} />
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
    headerBox: {
        paddingHorizontal: s(8),
        borderRadius: s(10),
        borderWidth: 0,
        paddingVertical: vs(6)
    },
    headerBoxTxt: {
        color: AppConstants.textColorViolet,
        fontWeight: "700"
    },
    selectedHeaderBox: {
        backgroundColor: AppConstants.backgroundColor1,
        borderWidth: 0
    },
    selectedTxt: {
        color: AppConstants.textColorWhite
    },
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
