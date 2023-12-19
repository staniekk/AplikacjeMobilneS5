import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        backgroundColor: '#11B5E4',
        flex: 1,
        padding: 30,
    },
    textInfo: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
        padding: 30,
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
    input: {
        color: '#ffffff',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: 80,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    footer: {
        padding: 10,
        borderTopWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
    },
    logoutBtn: {
        backgroundColor: '#013442', 
        padding: 15,
        borderRadius: 8,
        width: '90%',
        alignItems: 'center',
    },
    logoutText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
