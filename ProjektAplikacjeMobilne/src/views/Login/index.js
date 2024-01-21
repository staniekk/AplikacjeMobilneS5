import React from 'react';
import { Text, TextInput, Pressable, Alert, BackHandler, Image, ScrollView } from "react-native";
import { styles } from "./style";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

export function Login({ navigation }) {
    const [textLogin, setLogin] = React.useState('');
    const [textPassword, setPassword] = React.useState('');

    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem('lastLoginTime').then(lastLoginTime => {
                const timeNow = new Date().getTime();
                const timeElapsed = timeNow - JSON.parse(lastLoginTime);

                if (timeElapsed < 150000) { // 15 sekund = 15000 milisekund
                    navigation.navigate("TabNav");
                } else {
                    setLogin('');
                    setPassword('');
                }
            });
        }, [])
    );

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
        } else {
            Alert.alert('Błąd uwierzytelnienia', 'Spróbuj jeszcze raz lub wpisz hasło ręcznie.');
        }
    };

    const handleLogin = () => {
        if (!textLogin.trim() || !textPassword.trim()) {
            Alert.alert("Error", "Login and password are required.");
            return;
        }

        axios.get('https://65a40329a54d8e805ed451eb.mockapi.io/api/am/users')
            .then(response => {
                const users = response.data;
                const authenticatedUser = users.find(user => user.login === textLogin && user.password === textPassword);

                if (authenticatedUser) {
                    AsyncStorage.setItem('lastLoginTime', JSON.stringify(new Date().getTime()));
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
