import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';


export const styles = StyleSheet.create({
    loginBtn: {
        padding: 5,
        backgroundColor: '#F4F7F8',
        width: 150,
        marginBottom: 10,
        borderRadius: 30,
        marginTop: 30

    },
    loginText: {
        color: '#564949',
        fontWeight: 'normal',
        textAlign: 'center',
        fontSize: 25
    },
    loginTextInput: {
        color: '#564949',
        fontWeight: '200',
        textAlign: 'left',
        fontSize: 25,
        elevation: 8,
        backgroundColor: '#F4F7F8',
        padding: 10,
        width: 300,
        height: 60,
        marginBottom: 15,
        borderRadius: 20

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
        backgroundColor: '#11B5E4',

    },
    logo: {
        marginTop: 50,
        marginBottom: 20,
        width: 55,
        height: 45,
    },
    FP: {
        marginTop: 30,
        width: 55,
        height: 55
    },
    refreshIcon: {
        width: 48,
        height: 48,
        position: 'absolute', 
        right: -145,
        bottom: 20
      },
    panel: {
        backgroundColor: '#F4F7F8',
        padding: 5,
        borderRadius: 12,
        elevation: 8,
        margin: 15,
        width: Dimensions.get('window').width - 50
    },
    stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    },
    statsLeft: {
        flex: 1,
        textAlign: 'left',
        color: '#564949',
        fontWeight: 'bold',
        fontSize: 21,
        paddingLeft: 10
    },
    statsRight: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 10
    },
    statsData: {
        color: '#11B5E4',
       fontWeight: 'bold',
       fontSize: 40,
    },
    statsUnit: {
        color: '#564949',
       fontWeight: 'bold',
       fontSize: 15,
    },
    panelTitle:
    {
        textAlign: 'center',
        color: '#11B5E4',
        fontWeight: 'bold',
        fontSize: 40,
        margin: 12
    },
    switcher: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingLeft: 75,
        paddingRight: 75,
        margin: 6
    },
    switcherText: {
        textAlign: 'center',
        color: '#11B5E4',
        fontWeight: 'bold',
        fontSize: 20,
    },
    chart: {
        width: Dimensions.get('window').width - 80
    },
    settingItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
    },
    settingText: {
            color: '#fff',
            fontSize: 18,
            marginBottom: 10,
            fontWeight: 'bold',
    },
    textInfoB: {
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 48,
            marginTop: 30,
    },
    textInfoS: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 28,
        marginTop: 30,
    }

})