import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    map: {
        height: Dimensions.get('window').height - 150,
        width: Dimensions.get('window').width - 25,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        marginTop:40
      },
    textInfo: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
        padding: 30
    },
    textInfoAcc: {
        color: '#564949',
        fontWeight: 'normal',
        textAlign: 'center',
        fontSize: 25,
        marginTop: 15
    },
    mainContainer:
    {
        backgroundColor: '#11B5E4'

    },
    logo: {

        width: 240,
        height: 200
    },
    FP: {
        marginTop: 30,
        width: 55,
        height: 55
    },
    runText: {
        
        color: '#564949',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25
    },
    runBtn: {
        
        padding: 2,
        backgroundColor: '#F4F7F8',
        width: 150,
        marginBottom: 15,
        borderRadius: 30,
        marginTop: 15,
        justifyContent: 'bottom', 
        textAlign:'center'

    },
})
