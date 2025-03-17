import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { StatusBar } from "expo-status-bar";
import { AppConstants } from '@/AppConstants';
import HomeHeader from '@/components/home/HomeHeader';
import SlotsAvailable from '@/components/home/SlotsAvailable';
import ScheduleLater from '@/components/home/ScheduleLater';
import OurServices from '@/components/home/OurServices';
import TrainedProfessional from '@/components/home/TrainedProfessional';
import Map from '@/components/home/Map';
import { useNotifications } from '@/hooks/useNotifications';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/store';

const TabIndex = () => {

    const { loggedInUser } = useSelector((store: RootState) => store.auth);

    // USED FOR FCM - THIS IS THE MAIN TRIGGERING POINT
    useNotifications(loggedInUser?.uuid!);

    return (
        <ScrollView>
            <View style={{ gap: AppConstants.gapBetweenSections }}>
                <StatusBar hidden={false} style="light" />
                <HomeHeader />
                <SlotsAvailable />
                <ScheduleLater />
                <OurServices />
                <TrainedProfessional />
                <Map />
            </View>
        </ScrollView>
    )
}

export default TabIndex

const styles = StyleSheet.create({})