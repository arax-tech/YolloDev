import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

const Sheet = () => {
    const sheetRef = useRef(0);
    const data = useMemo(
        () =>
            Array(50)
                .fill(0)
                .map((_, index) => `index-${index}`),
        []
    );
    const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

    const [openModel, setOpenModel] = useState(0);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
        setOpenModel(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    // render
    const renderItem = useCallback(
        ({ item }) => (
            <View style={styles.itemContainer}>
                <Text>{item}</Text>
            </View>
        ),
        []
    );
    return (
        <View style={styles.sheetContainer}>
            <Button title="Open" onPress={() => handleSnapPress(2)} />
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                enableOverDrag={true}
                onChange={handleSheetChange}
            >
                <Button title="Close" onPress={() => handleClosePress()} />
                <BottomSheetFlatList
                    style={{ marginBottom: 50 }}
                    data={data}
                    keyExtractor={(i) => i}
                    renderItem={renderItem}
                    contentContainerStyle={styles.sheetContentContainer}
                />
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    sheetContainer: {
        flex: 1,
        paddingTop: 200,
    },
    sheetContentContainer: {
        backgroundColor: "white",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
    },
});

export default Sheet;