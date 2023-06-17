import { View, Text, ToastAndroid } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';

const RedirectLoading = () => {
    const [count, setCount] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
            count === 0 && ToastAndroid.show(`Please Login first...`, ToastAndroid.SHORT);
            count === 0 && navigation.navigate("Login");

        }, 1000);
        return () => clearInterval(interval);
    }, [navigate, count, role])
    return <Loading />
}

export default RedirectLoading
