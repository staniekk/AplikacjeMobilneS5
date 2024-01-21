import React, { useContext } from 'react';
import { Text, TextInput, Pressable, Alert, BackHandler, Image, ScrollView } from "react-native";
import { styles } from "./style";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { SettingsContext } from '../../Context/settingsContext';

// Ekran odpowiedzialny za logowanie użytkownika
// Dane do autoryzacji pobierana są z bazy danych i porównywane z danymi od użytkownika

export function Login({ navigation }) {
    const [textLogin, setLogin] = React.useState('');
    const [textPassword, setPassword] = React.useState('');
    const {setUserID} = useContext(SettingsContext)

    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem('lastLoginTime').then(lastLoginTime => {
                const timeNow = new Date().getTime();
                const timeElapsed = timeNow - JSON.parse(lastLoginTime);

                if (timeElapsed < 150000) { // 15 sekund = 15000 milisekund
                    navigation.navigate("DrawerNav");
                } else {
                    setLogin('');
                    setPassword('');
                }
            });
        }, [])
    );
    
    //Funckja odpowiedzialna za autoryzacja za pomocą odcisku palca
    //Logowanie za pomocą odcisku palca, loguje nas na użytkownika o ID 1
    const authenticateBiometrics = async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        if (!compatible) {
            Alert.alert('Urządzenie jest nie przystosowane');
            return;
        }

        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!enrolled) {
            Alert.alert('Nie ma ustawionego przycisku palca');
            return;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Uwierzytelnij',
            cancelLabel: 'Anuluj',
            fallbackLabel: 'Wpisz hasło ręcznie',
        });

        if (result.success) {
            navigation.navigate('DrawerNav');
            setUserID(1);
        } else {
            Alert.alert('Błąd uwierzytelnienia', 'Spróbuj jeszcze raz lub wpisz hasło ręcznie.');
        }
    };

    //Funkcja odpowiedzialna za logowanie użytkownika za pomocą hasła oraz loginu
    const handleLogin = () => {
        if (!textLogin.trim() || !textPassword.trim()) {
            Alert.alert("Error", "Login and password are required.");
            return;
        }

        axios.get('https://65a40329a54d8e805ed451eb.mockapi.io/api/am/users')
            .then(response => {
                const users = response.data;

                //Znalezienie użytkownika z tą samą nazwą oraz hasłem
                const authenticatedUser = users.find(user => user.login === textLogin && user.password === textPassword);
                
                if (authenticatedUser) {
                    AsyncStorage.setItem('lastLoginTime', JSON.stringify(new Date().getTime()));
                    setUserID(authenticatedUser.id);
                    console.log('Authenticated user ID:' +  authenticatedUser.id);
                    console.log('Authenticated user:' +  authenticatedUser);
                    navigation.navigate('DrawerNav');
                } else {
                    Alert.alert("Error", "Login or password mismatch.");
                }
            })
            .catch(error => {
                Alert.alert("Login Error", error.message);
            });
    };

    React.useEffect(() => {
        const backAction = () => true;
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    return (
        <ScrollView style={styles.mainContainer}
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={{
                flexGrow: 1,
                flex: 6,
                alignItems: 'center',
                justifyContent: 'center',
            }}>

            <Image style={styles.logo}
                source={require('../../img/logo/Logo.png')}
            />

            <Text style={styles.textInfo}> Time to run!</Text>

            <TextInput
                style={styles.loginTextInput}
                onChangeText={setLogin}
                value={textLogin}
                placeholder='Login'
            />

            <TextInput
                secureTextEntry={true}
                style={styles.loginTextInput}
                onChangeText={setPassword}
                value={textPassword}
                placeholder='Password'
            />
            <Pressable style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText}>Log in!</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Register')}>
                <Text style={styles.textInfoAcc}>Don't have an account? </Text>
            </Pressable>

            <Pressable onPress={authenticateBiometrics}>
                <Image style={styles.FP}
                    source={require('../../img/logo/FP.png')} />
            </Pressable>
        </ScrollView>
    );
}
