import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'

import { CloseButton, PrimaryButton } from '../components/Button'

import ReanimatedBottomsheet from "react-native-reanimated-bottomsheet";
import { ScrollView } from 'react-native-gesture-handler'

const Model = ({ open }) => {
    const bottomSheetRef = useRef(null);
    return (
        <ReanimatedBottomsheet
            ref={bottomSheetRef}
            snapPoints={[0, 30, 350, Dimensions.get("screen").height]}
            renderHeader={() => (
                <View style={styles.bottomSheetHeader}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 12 }}>
                        <Text style={styles.bottomSheetTitle}>Total - 245 </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', top: -25, right: 15 }}>
                        <CloseButton onPress={() => bottomSheetRef.current.snapTo(0)} />
                    </View>
                </View>
            )} renderContent={() => (
                <View style={styles.bottomSheetBody}>
                    <ScrollView>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                        <Text>description</Text>
                    </ScrollView>
                </View>
            )} />
    )
}

export default Model

const styles = StyleSheet.create({})