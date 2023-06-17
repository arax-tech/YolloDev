import React, { useEffect, useState } from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/views/screens/Login';
import Splash from './src/views/screens/Splash';
import Check from './src/views/screens/Check';
import OTPVerification from './src/views/screens/OTPVerification';
import Home from './src/views/screens/Home';
import BottomNavigation from './src/views/navigation/BottomNavigation';
import Profile from './src/views/screens/Profile';
import Model from './src/views/components/Model';
import Report from './src/views/screens/Report';
import Notification from './src/views/screens/Notification';
import ProfileEdit from './src/views/screens/ProfileEdit';
import CreateSuccess from './src/views/screens/CreateSuccess';
import ProfileTabs from './src/views/screens/ProfileTabs';
import Settings from './src/views/screens/Settings';
import Account from './src/views/screens/Account';
import NotificationSettings from './src/views/screens/NotificationSettings';
import SupportAndHelp from './src/views/screens/SupportAndHelp';

import AuthWelcome from './src/views/screens/AuthWelcome';
import AccountDisabled from './src/views/screens/AccountDisabled';
import DeleteAccount from './src/views/screens/DeleteAccount';
import { useSelector } from 'react-redux';
import Loading from './src/views/components/Loading';
import Store from './src/redux/Store';
import { AuthUserAction } from './src/redux/actions/AuthAction';


const Stack = createNativeStackNavigator();

const Main = () => {
    const { loading, isAuthenticated } = useSelector((state) => state.auth);

    const [show, setShow] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 3000)
    }, [])


    useEffect(() => {
        Store.dispatch(AuthUserAction());
    }, []);



    return (
        loading ? <Loading /> :
            <NavigationContainer>
                <Stack.Navigator initialRouteName={isAuthenticated && isAuthenticated === true ? "AuthWelcome" : "Splash"}>

                    {show ? <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} /> : null}

                    <Stack.Screen options={{ headerShown: false }} name="Check" component={Check} />
                    <Stack.Screen options={{ headerShown: false }} name="AuthWelcome" component={AuthWelcome} />
                    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                    <Stack.Screen options={{ headerTitle: "" }} name="OTPVerification" component={OTPVerification} />

                    <Stack.Screen options={{ headerShown: false }} name="HomeNavigation" component={BottomNavigation} />
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                    <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
                    <Stack.Screen options={{ headerShown: false }} name="CreateSuccess" component={CreateSuccess} />

                    <Stack.Screen options={{ headerShown: false }} name="ProfileTabs" component={ProfileTabs} />
                    <Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
                    <Stack.Screen options={{ headerShown: false }} name="Account" component={Account} />
                    <Stack.Screen options={{ headerShown: false }} name="AccountDisabled" component={AccountDisabled} />
                    <Stack.Screen options={{ headerShown: false }} name="DeleteAccount" component={DeleteAccount} />
                    <Stack.Screen options={{ headerShown: false }} name="NotificationSettings" component={NotificationSettings} />
                    <Stack.Screen options={{ headerShown: false }} name="SupportAndHelp" component={SupportAndHelp} />

                    <Stack.Screen name="Report" component={Report} />
                    <Stack.Screen name="Notification" component={Notification} />
                    <Stack.Screen name="ProfileEdit" options={{ headerShown: false }} component={ProfileEdit} />
                </Stack.Navigator>
            </NavigationContainer>
    )
}

export default Main