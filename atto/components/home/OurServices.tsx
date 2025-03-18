import { AppConstants } from '@/AppConstants'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { s, vs } from 'react-native-size-matters'
import ServiceModal from './services/ServiceModal'

const OurServices = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedService, setSelectedService] = useState<string>("");

    const firstRowImages = [
        {
            title: "Everday \n Cleaning",
            service: "Everyday Cleaning",
            image: require("@/assets/images/services/service1.png")
        },
        {
            title: "Weekly \n Cleaning",
            service: "Weekly Cleaning",
            image: require("@/assets/images/services/service2.png")
        },
    ];

    const secondRowImages = [
        {
            title: "Laundry",
            service: "Laundry",
            image: require("@/assets/images/services/service3.png")
        },
        {
            title: "Dish Washing",
            service: "Dish Washing",
            image: require("@/assets/images/services/service4.png")
        },
        {
            title: "Bathroom Cleaning",
            service: "Bathroom Cleaning",
            image: require("@/assets/images/services/service5.png")
        },
        {
            title: "Kitchen Cleaning",
            service: "Kitchen Prep",
            image: require("@/assets/images/services/service6.png")
        },
    ];

    return (
        <View style={{ paddingHorizontal: AppConstants.screenPadding }}>
            <View style={{ width: "100%", gap: vs(16), paddingHorizontal: AppConstants.screenPadding, borderColor: AppConstants.borderColor1, borderWidth: 2, padding: s(15), backgroundColor: "#FFFFFF", borderRadius: s(15) }}>

                <View style={{ width: "80%", gap: vs(6) }}>
                    <Text style={{ fontSize: s(16), fontWeight: "800" }}>Our Services</Text>
                    <Text>Avail one or multiple services in your booking</Text>
                </View>

                <View style={{ gap: 10 }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
                        {
                            firstRowImages.map((item, index) => (
                                <Pressable onPress={() => {
                                    setShowModal(true),
                                        setSelectedService(item.service)
                                }} key={index} style={{ flex: 1, height: vs(90), borderColor: AppConstants.borderColor1, borderWidth: 2, paddingLeft: s(15), paddingTop: s(15), backgroundColor: "#FFFFFF", borderRadius: s(15), position: "relative" }}>

                                    <Text style={{ fontSize: s(14), fontWeight: "600" }}>{item.title}</Text>
                                    <Image
                                        source={item.image}
                                        style={{ width: 80, height: 80, position: "absolute", bottom: 0, right: -10 }}
                                    />

                                </Pressable>
                            ))
                        }
                    </View>

                    {/* SECOND ROW IMAGES */}
                    <View style={{ flexDirection: "row", gap: 10, justifyContent: "space-between" }}>
                        {
                            secondRowImages.map((item, index) => (
                                <Pressable onPress={() => {
                                    setShowModal(true),
                                        setSelectedService(item.service)
                                }} key={index} style={{ flex: 1, height: vs(80), borderColor: AppConstants.borderColor1, borderWidth: 2, paddingLeft: s(15), paddingTop: s(15), backgroundColor: "#FFFFFF", borderRadius: s(15), justifyContent: "space-between" }}>

                                    <Text style={{ fontSize: s(8), fontWeight: "600" }}>{item.title}</Text>
                                    <Image
                                        source={item.image}
                                        style={{ width: 50, height: 50 }}
                                    />

                                </Pressable>
                            ))
                        }
                    </View>

                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => {
                        setShowModal(!showModal);
                    }}>
                    <ServiceModal setVisible={setShowModal} visible={showModal} selectedService={selectedService} />
                </Modal>

            </View>
        </View>
    )
}

export default OurServices

const styles = StyleSheet.create({

})