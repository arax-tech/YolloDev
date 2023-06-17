import { SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import SuggestedList from './SuggestedList'

const Following = () => {
    const { loading, user } = useSelector((state) => state.user);
    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: Colors.white }}>
                <ScrollView>
                    {
                        user?.following.map((data, index) => (
                            <SuggestedList key={index} user0={data?.user} />
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
    )
}

export default Following
