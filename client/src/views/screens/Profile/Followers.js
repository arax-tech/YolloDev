import { SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import SuggestedList from './SuggestedList'

const Followers = () => {
    const { loading, user } = useSelector((state) => state.user);
    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: Colors.white }}>
                <ScrollView>
                    {
                        user?.followers.map((user, index) => (
                            // console.log(._first_name)
                            <SuggestedList key={index} user0={user?.user} />
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
    )
}

export default Followers