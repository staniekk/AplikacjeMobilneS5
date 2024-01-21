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
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },

    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    // Style for the Change Password Button
    changePasswordButton: {
        backgroundColor: '#fff', // Example button color
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    changePasswordButtonText: {
        color: 'black',
        fontSize: 18,
    },

    // Styles for the Password Change Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalInput: {
        width: '90%', // Increase width
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 30,
        marginVertical: 4, // Equal vertical margin
        alignSelf: 'center', // Center align
    },
    modalButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
