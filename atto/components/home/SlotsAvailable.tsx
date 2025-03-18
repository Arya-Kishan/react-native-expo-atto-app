import { AppConstants } from '@/AppConstants';
import { SlotsType } from '@/AppTypes';
import { AppDispatch, RootState } from '@/Store/store';
import useSlotService from '@/hooks/useSlotService';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Switch, Text, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import SlotCard from './SlotCard';


const SlotsAvailable = () => {

    const [isEnabled, setIsEnabled] = useState(true);
    const { slots, slotsLoader } = useSelector((store: RootState) => store.book);
    const { fetchAllSlots, refetchAllSlots } = useSlotService();

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
    }

    useEffect(() => {
        fetchAllSlots();
    }, [])


    return (
        <View style={{ paddingHorizontal: AppConstants.screenPadding }}>

            <View style={{ width: "100%", gap: vs(16), paddingHorizontal: AppConstants.screenPadding, borderColor: AppConstants.borderColor1, borderWidth: 2, padding: s(15), backgroundColor: "#FFFFFF", borderRadius: s(15) }}>

                {/* COMPANY TITLE */}
                <View style={{ gap: vs(5) }}>
                    <Text style={{ fontFamily: "Alice_400Regular", fontSize: s(40), color: AppConstants.textColor2 }}>Atto</Text>
                    <Text style={{ fontSize: s(12), fontWeight: "500" }}>Showing all earliest slots available</Text>
                </View>

                {/* COMPANY SLOTS AVAILABLE */}
                <View style={{ width: "100%", height: vs(170), justifyContent: "center", alignItems: "center" }}>

                    {
                        slotsLoader == "loading"
                            ?
                            <ActivityIndicator size={40} color={AppConstants.loaderColorViolet} />
                            :
                            slots?.length == 0
                                ?
                                <Text>NO SLOTS AVAILABLE</Text>
                                :
                                <FlatList
                                    data={slots}
                                    renderItem={({ item, index }: { item: SlotsType, index: number }) => (
                                        <SlotCard item={item} index={index} reFetchAllSlots={refetchAllSlots} />
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