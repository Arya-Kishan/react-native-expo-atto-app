import { AppConstants } from "@/AppConstants";
import React, { useState } from "react";
import { Button, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { s, vs } from "react-native-size-matters";

interface DatePickerType {
    selectedTime: string,
    setSelectedTime: (value: string) => void,

}

const DatePicker: React.FC<DatePickerType> = ({ selectedTime, setSelectedTime }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        setSelectedTime(date);
        hideDatePicker();
    };

    return (
        <View>

            <TouchableOpacity onPress={showDatePicker} style={styles.btn}>
                <Text style={styles.btnTxt}>Choose Time</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

export default DatePicker;

const styles = StyleSheet.create({
    btn: {
        width: "100%",
        paddingHorizontal: s(10),
        paddingVertical: vs(5),
        borderRadius: s(15),
        backgroundColor: AppConstants.backgroundColor1
    },
    btnTxt: {
        textAlign: "center",
        fontWeight: "500",
        color: AppConstants.textColor1,
        letterSpacing: s(1)
    },
});