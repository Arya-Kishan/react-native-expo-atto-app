import { SlotsType } from '@/AppTypes';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, View } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppConstants } from '@/AppConstants';
import CreateSlotModal from '@/components/admin/slots/CreateSlotModal';
import { getAllSlots } from '@/services/api_services/firebase_api_services';
import { convertMinutesIntoHour, formatTime } from '@/utils/helper';
import { s, vs } from 'react-native-size-matters';

const AdminSlots = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [slots, setSlots] = useState<SlotsType[]>([]);

    const [showModal, setShowModal] = useState(false);

    const fetchAllSlots = async () => {
        const { data, success } = await getAllSlots();
        if (success) {
            setSlots(data);
        }
    }

    useEffect(() => {
        fetchAllSlots();
    }, [])

    console.log("slots : ", slots)

    // RENDER ITEM
    const renderItemSlots = ({ index, item }: { index: number, item: SlotsType }) => (
        <View style={styles.slotBox}>

            <View style={styles.slotLeft}>
                <Text style={styles.slotLeftTxt}>{item.offer}%</Text>
            </View>

            <View style={styles.slotRight}>
                <Text>Price : {item.price}</Text>
                <Text>Avaialble Time : {formatTime(Number(item.availableTime))}</Text>
                <Text>Working Time : {convertMinutesIntoHour(item.workingTime)}</Text>
            </View>

        </View>
    )

    return (
        <SafeAreaView style={styles.main}>

            <StatusBar hidden={false} />

            <View style={styles.header}>
                <Text style={styles.headerTxt}>Slots</Text>
                <MaterialIcons onPress={() => setShowModal(true)} name='add-circle' size={30} />
            </View>

            <View>
                <FlatList
                    data={slots}
                    renderItem={renderItemSlots}
                    contentContainerStyle={{ gap: s(10), marginTop: vs(10) }}
                />
            </View>

            {/* MODAL TO ADD SLOTS */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)} // Handles back button on Android
            >
                <CreateSlotModal setSlots={setSlots} slots={slots} setShowModal={setShowModal} />
            </Modal>

        </SafeAreaView>
    )
}

export default AdminSlots

const styles = StyleSheet.create({
    main: {
        padding: AppConstants.screenPadding
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerTxt: {
        fontSize: 25,
        fontWeight: "800",
    },
    slotBox: {
        width: "100%",
        backgroundColor: "#D6D6D6FF",
        flexDirection: "row",
        gap: s(10),
        padding: s(20)
    },
    slotLeft: {
        width: vs(40),
        height: vs(40),
        borderRadius: vs(20),
        backgroundColor: AppConstants.buttonColor1,
        justifyContent: "center",
        alignItems: "center"
    },
    slotLeftTxt: {
        fontSize: s(16),
        fontWeight: "bold",
        color: AppConstants.textColor1,
        textAlign: "center"
    },
    slotRight: {},

})