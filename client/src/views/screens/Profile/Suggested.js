import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Fonts from '../../../constants/Fonts'
import Colors from '../../../constants/Colors'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import SuggestedList from './SuggestedList'

const Suggested = () => {
    const { loading, user } = useSelector((state) => state.user);
    const { loading: yelloLoading, users } = useSelector((state) => state.yello);

    return (
        loading || yelloLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: Colors.white }}>
                <ScrollView>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 2, borderColor: '#D9D9D9' }}>
                        <Text style={[styles.headerTitle, { fontSize: 20 }]}>Start following <Text style={{ color: Colors.primary }}>YOLLO</Text>ers</Text>
                    </View>
                    {
                        users?.map((user0, index) => (
                            user?._id !== user0._id && (
                                <SuggestedList key={index} user0={user0} />
                            )
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
    )
}

export default Suggested

const styles = StyleSheet.create({
    header: { alignItems: 'center', justifyContent: 'center', padding: 18, backgroundColor: Colors.white },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 25, fontWeight: '700', paddingRight: 15, color: Colors.dark },
})