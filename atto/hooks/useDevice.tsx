import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useDevice = () => {
    const insets = useSafeAreaInsets();

    const bottomNotchHeight = insets.bottom;
    const topNotchHeight = insets.top;

    return ({ bottomNotchHeight, topNotchHeight })
}

export default useDevice