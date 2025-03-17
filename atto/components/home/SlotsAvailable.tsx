import { AppConstants } from '@/AppConstants';
import { SlotsType } from '@/AppTypes';
import { getAllSlots } from '@/services/api_services/firebase_api_services';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Switch, Text, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import SlotCard from './SlotCard';

// const availableSlots: SlotsType[] = [
//     {
//         slotId: 1,
//         timeInMins: 60,
//         price: 144,
//         previousPrice: 200,
//         availableTime: 10,
//     },
//     {
//         slotId: 2,
//         timeInMins: 120,
//         price: 210,
//         previousPrice: 300,
//         availableTime: 10,
//     },
//     {
//         slotId: 3,
//         timeInMins: 30,
//         price: 144,
//         previousPrice: 200,
//         availableTime: 10,
//     },
//     {
//         slotId: 4,
//         timeInMins: 10,
//         price: 144,
//         previousPrice: 200,
//         availableTime: 10,
//     },
//     {
//         slotId: 5,
//         timeInMins: 300,
//         price: 144,
//         previousPrice: 200,
//         availableTime: 10,
//     },
// ];

const SlotsAvailable = () => {

    const [isEnabled, setIsEnabled] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [slots, setSlots] = useState<SlotsType[]>([]);

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
    }

    const fetchAllSlots = async () => {
        setLoading(true);
        const { data, success } = await getAllSlots();
        if (success) {
            setSlots(data);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchAllSlots();
    }, [])


    return (
        <View style={{ paddingHorizontal: AppConstants.screenPadding }}>

            <View style={{ width: "100%", gap: vs(16), paddingHorizontal: AppConstants.screenPadding, borderColor: AppConstants.borderColor1, borderWidth: 2, padding: s(15), backgroundColor: "#FFFFFF", borderRadius: s(15) }}>

                {/* COMPANY TITLE */}
                <View style={{ gap: vs(5) }}>
                    <Text style={{ fontSize: s(35), fontWeight: "bold", color: AppConstants.textColor2 }}>Atto</Text>
                    <Text style={{ fontSize: s(12), fontWeight: "500" }}>Showing all earliest slots available</Text>
                </View>

                {/* COMPANY SLOTS AVAILABLE */}
                <View style={{ width: "100%", height: vs(170), justifyContent: "center", alignItems: "center" }}>

                    {
                        loading
                            ?
                            <ActivityIndicator size={40} color={AppConstants.loaderColor1} />
                            :
                            slots.length == 0
                                ?
                                <Text>NO SLOTS AVAILABLE</Text>
                                :
                                <FlatList
                                    data={slots}
                                    renderItem={({ item, index }: { item: SlotsType, index: number }) => (
                                        <SlotCard item={item} index={index} />
                                    )}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ gap: s(12) }}
                                />
                    }
                </View>

                {/* EARLIEST SLOT */}
                <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderColor: AppConstants.borderColor1, borderWidth: 2, padding: s(10), borderRadius: AppConstants.buttonBorderRadius }}>
                    <Text style={{ fontWeight: "500" }}>Show earliest available slot</Text>
                    <Switch
                        trackColor={{ false: '#FFFFFFFF', true: '#6b46c1' }}
                        thumbColor={isEnabled ? '#FFFFFFFF' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

            </View>

        </View>
    )
}

export default SlotsAvailable

const styles = StyleSheet.create({})