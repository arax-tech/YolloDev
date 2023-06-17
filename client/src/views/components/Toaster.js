import Toast from 'react-native-toast-message';
export const Toaster = (type,heading, message) => {
    Toast.show({
        type: type,
        text1: heading,
        text2: message,
        position:"bottom",
    });
}