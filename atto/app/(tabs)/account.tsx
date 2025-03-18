import { AppConstants } from '@/AppConstants'
import AddressModal from '@/components/account/modals/AddressModal'
import HelpModal from '@/components/account/modals/HelpModal'
import useAuth from '@/hooks/useAuth'
import { RootState } from '@/Store/store'
import Fontisto from '@expo/vector-icons/Fontisto'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { s, vs } from 'react-native-size-matters'
import { useSelector } from 'react-redux'

const Account = () => {
  const router = useRouter();
  const { loggedInUser } = useSelector((store: RootState) => store.auth);
  const { handleLogOut } = useAuth();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const profileList = [
    {
      title: "Your Address",
      icon: <Ionicons name='home' size={25} color={AppConstants.primaryColor} />,
      topic: "address"
    },
    {
      title: "Edit Profile",
      icon: <Ionicons name='pencil' size={25} color={AppConstants.primaryColor} />,
      topic: "edit"
    },
    {
      title: "Your Bookings",
      icon: <Ionicons name='notifications' size={25} color={AppConstants.primaryColor} />,
      topic: "bookings"
    },
    {
      title: "Help & Support",
      icon: <Ionicons name='help' size={25} color={AppConstants.primaryColor} />,
      topic: "help"
    },
  ];

  const handleCardClick = (topic: string) => {

    if (topic == "address") {
      setShowAddressModal(true);
    }

    if (topic == "edit") {
      router.push("/(user)/edit-profile");
    }

    if (topic == "help") {
      setShowHelpModal(true);
    }

    if (topic == "bookings") {
      router.push("/(tabs)/bookings");
    }

  }

  return (
    <View style={styles.main}>

      <View style={styles.header}>
        <Text style={styles.headerTxt}>Account</Text>
      </View>

      <ScrollView contentContainerStyle={styles.main2}>

        {/* PHOTO,NAME AND EMAIL */}
        <View style={styles.info}>
          <Fontisto name='person' size={80} />
          <Text style={{ fontSize: s(30), fontWeight: "800" }}>{loggedInUser?.name}</Text>
          <Text style={{ fontSize: s(12) }}>{loggedInUser?.email}</Text>
        </View>

        {/* CARDS PROFILE LIST */}
        <View style={styles.cardContainer}>

          {
            profileList.map((item, index) => (
              <Pressable onPress={() => handleCardClick(item.topic)} key={index} style={styles.card} >
                {item.icon}
                <Text style={styles.cardTxt}>{item.title}</Text>
                <Ionicons name='arrow-forward' size={20} />
              </Pressable>
            ))
          }

        </View>

        {/* LOGOUT BUTTON */}
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>

          <TouchableOpacity onPress={handleLogOut} style={{ width: "80%", backgroundColor: AppConstants.backgroundColor1, flexDirection: "row", gap: s(10), justifyContent: "center", alignItems: "center", padding: s(10), borderRadius: s(20) }}>
            <MaterialIcons name='logout' size={30} color={AppConstants.iconColor2} />
            <Text style={{ fontSize: s(16), fontWeight: "bold", color: AppConstants.textColor1 }}>Logout</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>


      {/* ADDRESS MODALS */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddressModal}
        onRequestClose={() => setShowAddressModal(false)}
      >
        <AddressModal setShowModal={setShowAddressModal} />
      </Modal>

      {/* HELP MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showHelpModal}
        onRequestClose={() => setShowHelpModal(false)}
      >
        <HelpModal setShowModal={setShowHelpModal} />
      </Modal>


    </View >
  )
}

export default Account

const styles = StyleSheet.create({
  main: {
    height: AppConstants.screenHeight,
  },
  header: {
    width: "100%",
    height: vs(80),
    backgroundColor: AppConstants.backgroundColor1,
    borderBottomLeftRadius: s(30),
    borderBottomRightRadius: s(30),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: AppConstants.screenPadding,
  },
  headerTxt: {
    textAlign: "center",
    fontSize: s(25),
    fontWeight: "800",
    color: AppConstants.textColor1
  },
  main2: {
    flex: 1,
    paddingTop: vs(10),
    paddingBottom: vs(80),
    justifyContent: "space-between",
    paddingHorizontal: AppConstants.screenPadding,
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: vs(0),
    gap: vs(0),
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: s(10)
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: vs(6),
    padding: vs(20),
    backgroundColor: "#F6F6F6FF",
    borderRadius: AppConstants.sectionBorderRadius
  },
  cardTxt: {
    fontSize: s(16),
    fontWeight: "600",
    color: "#000000FF"
  },
})