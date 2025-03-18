import { SlotsType } from '@/AppTypes';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppConstants } from '@/AppConstants';
import CreateSlotModal from '@/components/admin/slots/CreateSlotModal';
import { getAllSlots, updateSlot } from '@/services/api_services/firebase_api_services';
import { formatTime } from '@/utils/helper';
import { s, vs } from 'react-native-size-matters';
import useSlotService from '@/hooks/useSlotService';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/store';

const AdminSlots = () => {

    const { slots, slotsLoader } = useSelector((store: RootState) => store.book);
    const { fetchAllSlots, refetchAllSlots } = useSlotService();

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchAllSlots();
    }, [])

    const handleUpdateSlot = async (item: SlotsType, wtd: boolean) => {
        if (wtd) {
            let { success } = await updateSlot(item, true);
            success ? refetchAllSlots() : ""
        } else {
            let { success } = await updateSlot(item, false);
            success ? refetchAllSlots() : ""
        }
    }

    // RENDER ITEM
    const renderItemSlots = ({ item }: { index: number, item: SlotsType }) => (
        <View style={styles.slotBox}>

            <View style={styles.slotLeft}>
                <Text style={styles.slotLeftTxt}>{item.offer}%</Text>
            </View>

            <View style={styles.slotRight}>
                <Text>Price : {item.price}</Text>
                <Text>Avaialble Time : {formatTime(Number(item.availableTime))}</Text>
                <Text>Working Time : {item.workingTime} Mins</Text>
                <Text>isBooked : {item.isBooked ? "true" : "false"}</Text>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", gap: s(20), marginTop: vs(10) }}>

                    <TouchableOpacity onPress={() => handleUpdateSlot(item, true)} style={{ backgroundColor: AppConstants.backgroundColorViolet, paddingHorizontal: s(15), paddingVertical: vs(5), borderRadius: AppConstants.buttonBorderRadius }}>
                        <Text style={{ fontWeight: "600", color: AppConstants.textColorWhite }}>NOT CLEANED</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleUpdateSlot(item, false)} style={{ backgroundColor: AppConstants.backgroundColorViolet, paddingHorizontal: s(15), paddingVertical: vs(5), borderRadius: AppConstants.buttonBorderRadius }}>
                        <Text style={{ fontWeight: "600", color: AppConstants.textColorWhite }}>CLEANED</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    )

    return (
        <SafeAreaView style={styles.main}>

            <View style={styles.header}>
                <Text style={styles.headerTxt}>Slots</Text>
                <MaterialIcons onPress={() => setShowModal(true)} name='add-circle' size={30} />
            </View>

            <View>
                <FlatList
                    data={slots}
                    renderItem={renderItemSlots}
                    contentContainerStyle={{
                        gap: s(10), marginTop: vs(10), paddingHorizontal: AppConstants.screenPadding
                    }}
                />
            </View>

            {/* MODAL TO ADD SLOTS */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)} // Handles back button on Android
            >
                {/* <CreateSlotModal setSlots={setSlots} slots={slots} setShowModal={setShowModal} /> */}
            </Modal>

        </SafeAreaView>
    )
}

export default AdminSlots

const styles = StyleSheet.create({
    main: {
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        height: vs(80),
        backgroundColor: AppConstants.backgroundColor1,
        borderBottomLeftRadius: s(30),
        borderBottomRightRadius: s(30),
        alignItems: "center",
        paddingHorizontal: AppConstants.screenPadding
    },
    headerTxt: {
        fontSize: 30,
        fontWeight: "800",
    },
    slotBox: {
        width: "100%",
        backgroundColor: "#D6D6D6FF",
        flexDirection: "row",
        gap: s(10),
        padding: s(20),
        borderRadius: AppConstants.sectionBorderRadius
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