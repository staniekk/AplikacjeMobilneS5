import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    loginBtn: {
        padding: 5,
        backgroundColor: '#000',
        width: 150,
        marginBottom: 25
    },
    IdText: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    },
    QText: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 5,
        fontSize: 20
    },
    loginTextInput: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        padding: 2,
        backgroundColor: '#b3b3b3',
        width: 300,
        marginBottom: 15
    },
    textInfo:{
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    },
    textInfoTop:{
        color: '#000',
        fontWeight: 'normal',
        textAlign: 'center',
        fontSize: 40,
        flex: 1,
        paddingTop: 30,
        justifyContent: 'flex-start' 
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        padding: 20,
        paddingLeft: 15,
        fontSize: 35,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    editButton: {
        marginLeft: 'auto',
        backgroundColor: '#000',
        padding: 10,
    }

})
