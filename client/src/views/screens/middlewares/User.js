import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import RedirectLoading from './RedirectLoading';

const User = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    return user && user.role === "User" ? children : <RedirectLoading />
}

export default User