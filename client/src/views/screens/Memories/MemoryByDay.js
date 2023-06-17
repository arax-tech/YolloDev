import { View, SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import MemoryPost from './MemoryPost';
import { MemoriesTimelineAction } from '../../../redux/actions/MemoriesAction';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const MemoryByDay = ({ posts }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            {
                posts?.length > 0 ? (
                    <View style={styles.boxContainer}>
                        {
                            posts?.map((post) => (
                                <MemoryPost key={post._id} post={post} onPress={() => {
                                    dispatch(MemoriesTimelineAction(posts))
                                    navigation.navigate('MemoriesTimeline')

                                }} />
                            ))
                        }
                    </View>
                ) : (
                    <View style={styles.notFoundBox}>
                        <Text style={styles.notFoundTitle}>No <Text style={{ color: Colors.primary }}>Yollo</Text> memories for the day...</Text>

                    </View>
                )
            }
        </SafeAreaView>
    )
}

export default MemoryByDay

const styles = StyleSheet.create({
    boxContainer: { width: "100%", padding: 5, flexDirection: "row", flexWrap: "wrap" },
    notFoundBox: { flex: 1, alignItems: "center", justifyContent: "center" },
    notFoundTitle: { fontFamily: Fonts.primary, fontSize: 16, color: Colors.dark, textAlign: 'center', paddingTop: 20 },
})

