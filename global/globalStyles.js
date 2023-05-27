import { StyleSheet } from 'react-native';
import { fontPixel, heightPixel, widthPixel } from './adaptiveFunctions';

module.exports = StyleSheet.create({
    text: {
        color: 'rgba(255,255,255,1)',
        fontFamily: 'Days-Sans',
        fontSize: fontPixel(36),
        textAlign: 'center',
    },
})