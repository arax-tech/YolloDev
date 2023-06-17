import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/views/screens/Login';
import Splash from './src/views/screens/Splash';
import Check from './src/views/screens/Check';
import OTPVerification from './src/views/screens/OTPVerification';

import Home from './src/views/screens/Home';
import BottomNavigation from './src/views/navigation/BottomNavigation';
import Report from './src/views/screens/Report';
import Notification from './src/views/screens/Notification';
import AuthWelcome from './src/views/screens/AuthWelcome';

import Search from './src/views/screens/Search/Search';



import Profile from './src/views/screens/Profile/Profile';
import ProfileTabs from './src/views/screens/Profile/ProfileTabs';
import ProfileEdit from './src/views/screens/Profile/ProfileEdit';


import Settings from './src/views/screens/Settings/Settings';
import Account from './src/views/screens/Settings/Account';
import NotificationSettings from './src/views/screens/Settings/NotificationSettings';
import SupportAndHelp from './src/views/screens/Settings/SupportAndHelp';
import AccountDisabled from './src/views/screens/Settings/AccountDisabled';
import DeleteAccount from './src/views/screens/Settings/DeleteAccount';


import PostCreateSuccess from './src/views/screens/Post/PostCreateSuccess';
import CreateSuccess from './src/views/screens/Post/CreateSuccess';


import { Provider } from 'react-redux';
import Store from './src/redux/Store';
import { AuthUserAction } from './src/redux/actions/AuthAction';

import Sheet from './src/views/screens/Sheet';
import CommentSheet from './src/views/components/BottomSheet';
import { OneMinuteRewardAction } from './src/redux/actions/ReactionAction';
import Memories from './src/views/screens/Memories/Memories';
import PublicProfile from './src/views/screens/Profile/PublicProfile';
import SignlePost from './src/views/screens/Profile/SignlePost';
import MemorySignlePost from './src/views/screens/Memories/MemorySignlePost';
import Referral from './src/views/screens/Settings/Referral';
import MemoriesTimeline from './src/views/screens/Memories/MemoriesTimeline';
import CreatePost from './src/views/screens/Post/CreatePost';
import ProfileActivePostTimeline from './src/views/screens/Profile/ProfileActivePostTimeline';
import ProfileInActivePostTimeline from './src/views/screens/Profile/ProfileInActivePostTimeline';
import InActiveSignlePost from './src/views/screens/Profile/InActiveSignlePost';
import Prompts from './src/views/components/Prompts';
import Suggested from './src/views/screens/Profile/Suggested';

import EditPost from './src/views/screens/Post/EditPost';

import { Toast } from 'react-native-toast-message/lib/src/Toast';


const Stack = createNativeStackNavigator();

const App = () => {
    const [show, setShow] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 3000)
    }, [])

    useEffect(() => {
        Store.dispatch(AuthUserAction());
    }, [Store.dispatch]);


    useEffect(() => {
        const getReward = () => {
            Store.dispatch(OneMinuteRewardAction());
        }
        setInterval(getReward, 60000);
    }, [Store.dispatch])

   

    // useEffect(() => {
    //     const backAction = () => {
    //         Alert.alert("Hold On!", "Are you sure to exit App ?", [
    //             {
    //                 text: "Cancel",
    //                 onPress: () => null,
    //                 style: "cancel"
    //             }, {
    //                 text: "Yes",
    //                 onPress: () => BackHandler.exitApp()
    //             }
    //         ]);
    //         return true;
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         backAction
    //     );

    //     return () => backHandler.remove();
    // }, [])



    // const { isAuthenticated } = Store.getState().auth;
    return (
        <Provider store={Store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Splash'>

                    {show ? <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} /> : null}
                    <Stack.Screen options={{ headerShown: false }} name="Check" component={Check} />
                    <Stack.Screen options={{ headerShown: false }} name="AuthWelcome" component={AuthWelcome} />
                    <Stack.Screen options={{ headerShown: false, headerBackVisible: false }} name="Login" component={Login} />
                    <Stack.Screen options={{ headerTitle: "" }} name="OTPVerification" component={OTPVerification} />

                    <Stack.Screen options={{ headerShown: false }} name="HomeNavigation" component={BottomNavigation} />
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />



                    <Stack.Screen options={{ headerShown: false }} name="Search" component={Search} />

                    <Stack.Screen options={{ headerShown: false }} name="Memories" component={Memories} />
                    <Stack.Screen options={{ headerShown: false }} name="MemoriesTimeline" component={MemoriesTimeline} />
                    <Stack.Screen options={{ headerShown: false }} name="MemorySignlePost" component={MemorySignlePost} />



                    <Stack.Screen options={{ headerShown: false }} name="Add" component={CreatePost} />
                    <Stack.Screen options={{ headerShown: false }} name="EditPost" component={EditPost} />
                    <Stack.Screen options={{ headerShown: false }} name="CreateSuccess" component={CreateSuccess} />
                    <Stack.Screen options={{ headerShown: false }} name="PostCreateSuccess" component={PostCreateSuccess} />

                    <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
                    <Stack.Screen options={{ headerShown: false }} name="ProfileActivePostTimeline" component={ProfileActivePostTimeline} />
                    <Stack.Screen options={{ headerShown: false }} name="ProfileInActivePostTimeline" component={ProfileInActivePostTimeline} />
                    <Stack.Screen options={{ headerShown: false }} name="SignlePost" component={SignlePost} />
                    <Stack.Screen options={{ headerShown: false }} name="InActiveSignlePost" component={InActiveSignlePost} />
                    <Stack.Screen options={{ headerShown: false }} name="ProfileTabs" component={ProfileTabs} />
                    <Stack.Screen options={{ headerShown: false }} name="Suggested" component={Suggested} />
                    {/* <Stack.Screen options={{ headerShown: false }} name="ProfileEdit" component={ProfileEdit} /> */}

                    <Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
                    <Stack.Screen options={{ headerShown: false }} name="Account" component={Account} />
                    <Stack.Screen options={{ headerShown: false }} name="Referral" component={Referral} />
                    <Stack.Screen options={{ headerShown: false }} name="AccountDisabled" component={AccountDisabled} />
                    <Stack.Screen options={{ headerShown: false }} name="DeleteAccount" component={DeleteAccount} />
                    <Stack.Screen options={{ headerShown: false }} name="NotificationSettings" component={NotificationSettings} />
                    <Stack.Screen options={{ headerShown: false }} name="SupportAndHelp" component={SupportAndHelp} />

                    <Stack.Screen options={{ headerShown: false }} name="Sheet" component={Sheet} />

                    <Stack.Screen name="Report" component={Report} />
                    <Stack.Screen name="Notification" component={Notification} />
                </Stack.Navigator>
                <CommentSheet />
                <Prompts />
                <Toast />
            </NavigationContainer>
        </Provider>
    )
}

export default App


