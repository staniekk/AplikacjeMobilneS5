import React from 'react';
import { Text, View, Pressable, TextInput, Alert, BackHandler, Image } from "react-native";
import { styles } from "./style";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';



export function Login({ navigation }) {
    const [textLogin, setLogin] = React.useState('');
    const [textPassword, setPassword] = React.useState('');

    useFocusEffect(
        React.useCallback(() => {
            setLogin('');
            setPassword('');
        }, [])
    );

    const handleLogin = () => {
        if (!textLogin.trim() || !textPassword.trim()) {
            Alert.alert("Error", "Login and password are required.");
            return;
        }
        // // Walidacja loginu i hasła
        // apiClient.post('/login', {
        //     login: textLogin,
        //     password: textPassword
        // })
        axios.get('http://192.168.1.229:3000/users')
            .then(response => {
                const users = response.data;
                const authenticatedUser = users.find(user => user.login === textLogin && user.password === textPassword);

                if (authenticatedUser) {
                    navigation.navigate("TaskList"); // Zmienić na właściwy cel nawigacyjny
                } else {
                    Alert.alert("Error", "Nieprawidłowy login lub hasło");
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
        <View style={styles.mainContainer}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={styles.logo}
                    source={require('../../img/logo/Logo.png')}
                />
            </View>
            <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>

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
                </Pressable >
                <Pressable onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.textInfoAcc}>Don't have an account? </Text>
                </Pressable>


                <Pressable >

                    <Image style={styles.FP}
                        source={require('../../img/logo/FP.png')} />
                </Pressable>


                {/* <Pressable style={styles.textInfo} onPress={() => navigation.navigate('TabNav')}>
                <Text>Go to Home screen</Text>
            </Pressable> */}

            </View>
        </View>
    );
}
