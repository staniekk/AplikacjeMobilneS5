import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 2,
    },
    stepsCount: {
        fontSize: 48,
        color: 'blue',
        fontWeight: 'bold',
    },
    progressBarContainer: {
        height: 20,
        width: '100%',
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        marginTop: 10,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: 'blue',
        borderRadius: 10,
    },
    goalText: {
        fontSize: 16,
        color: 'grey',
        marginTop: 5,
    },
});