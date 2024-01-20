import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    loginBtn: {
        padding: 5,
        backgroundColor: '#F4F7F8',
        width: 150,
        marginBottom: 30,
        borderRadius: 30,
        marginTop: 30,
        justifyContent: 'bottom'

    },
   
    loginText: {
        color: '#564949',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25
    },
    textInfoT: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
        marginTop: 30,

    },
 
    totd: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        marginTop: 5
    },
    tipInfo: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 13,
        marginTop: 15
    },
    mainContainer:
    {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#11B5E4'
    },
    logo: {
        marginTop: 50,
        width: 55,
        height: 45
    },
    footprint: {

        width: 55.2,
        height: 78.4,
        position: 'absolute', 
        top: -30,
        resizeMode: 'contain',
         
    },
 
    stepCounterContainer: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pedometerContainer: {
        backgroundColor: '#FFFFFF', 
        width: 200, 
        height: 200,
        borderRadius: 100, 
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1.0,
        shadowRadius: 5,
        elevation: 15,
        position: 'relative',
    },
    backgroundCircle:
    {
        backgroundColor: '#0caadc', 
        width: 270, 
        height: 270,
        borderRadius: 135,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        position: 'relative',
    },
    stepCount: {
        fontSize: 45,
        color: '#034748',
        fontWeight: 'bold',
    },
    goalText: {
        fontSize: 25,
        color: '#034748',
        fontWeight: 'bold',
    },
    distanceText: {
        fontSize: 28,
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom:30,
    },
    line: {
        height: 2,
        width: '80%', 
        backgroundColor: '#000000', // kolor linii
    }

})
