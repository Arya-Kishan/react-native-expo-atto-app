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
import HomeHeaderFeatures from '@/components/home/HomeHeaderFeatures';
import { vs } from 'react-native-size-matters';

const TabIndex = () => {

    const { loggedInUser } = useSelector((store: RootState) => store.auth);

    useNotifications(loggedInUser?.uuid!);

    return (
        <View>
            <HomeHeader />
            <ScrollView contentContainerStyle={{ gap: AppConstants.gapBetweenSections, paddingBottom: vs(100) }}>
                <HomeHeaderFeatures />
                <SlotsAvailable />
                <ScheduleLater />
                <OurServices />
                <TrainedProfessional />
                <Map />
            </ScrollView>
        </View>
    )
}

export default TabIndex

const styles = StyleSheet.create({})