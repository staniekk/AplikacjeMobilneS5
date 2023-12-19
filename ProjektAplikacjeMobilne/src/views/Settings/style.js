import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
        padding: 30
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
    },
    input: {
        color: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    logoutBtn: {
        backgroundColor: '#013442',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});
