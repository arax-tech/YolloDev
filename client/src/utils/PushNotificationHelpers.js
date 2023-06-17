import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Store from '../redux/Store';
import { UpdateFCMAction } from '../redux/actions/YelloAction';


export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        // console.log('Authorization status:', authStatus);
        GetFCMToken();
    }
}


export const GetFCMToken = async () => {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    // console.log(fcmToken, 'old token')
 
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                Store.dispatch(UpdateFCMAction(fcmToken))
                // console.log(fcmToken, "new token")
                await AsyncStorage.setItem("fcmToken", fcmToken);
            }
        } catch (error) {
            console.log(error, "error in fcm token")
        }
    }
}


export const NotificationListner = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
        // console.log(
        //     'Notification caused app to open from background state:',
        //     remoteMessage.notification,
        // );
    });
   

    // Check whether an initial notification is available
    messaging().getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                // console.log(
                //     'Notification caused app to open from quit state:',
                //     remoteMessage.notification,
                // );
            }
        });

    messaging().onMessage(async remoteMessage => {
        // console.log("notification on forground state....", remoteMessage);
    })
}