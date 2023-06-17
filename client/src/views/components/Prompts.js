import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect} from 'react'
import { Dialog } from 'react-native-paper';
import { useState } from 'react';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { ClosePromptAction } from '../../redux/actions/YelloAction';

const Prompts = () => {
    const dispatch = useDispatch();
    const { open, heading, message } = useSelector((state) => state.prompts);
    
    const [model, setModel] = useState(open);

    useEffect(() => {
        if (open && open === true) {
            setModel(true)
        }
    }, [open])

    useEffect(() => {

        const backAction = async () => {
            await dispatch(ClosePromptAction());
            setModel(false)
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const onCloseFunction = async () => {
        await dispatch(ClosePromptAction());
        setModel(false)
    }

    return (
        <Dialog visible={model} style={{ backgroundColor: "#fff" ,borderRadius : 20}} onDismiss={() => onCloseFunction()}>
            <Dialog.Content style={{}}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingBottom: 10, marginTop: -8, }}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.dark }}>{heading}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: -24, borderBottomWidth: 1, borderBottomColor: '#D9D9D9' }} />

                <View style={{ flexDirection: 'column', alignItems: 'center', padding: 0, alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>

                   
                    <Text style={styles.text}>{message}</Text>
                
                    <TouchableOpacity onPress={() => onCloseFunction()} style={[styles.tagButton, { backgroundColor: Colors.lightGray }]}>
                        <Text style={styles.tagButtonText}>Okay</Text>
                    </TouchableOpacity>
                    







                </View>

            </Dialog.Content>

        </Dialog>
    )
}

export default Prompts






const styles = StyleSheet.create({

    tagButton: { backgroundColor: Colors.white, padding: 9, paddingHorizontal: 15, marginTop : 8, marginBottom : -10, borderRadius: 20, borderColor: '#E4E4E4', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: "#000", textAlign: 'center', fontWeight: '700', paddingLeft: 3 },
    text: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, textAlign: 'center' },
})