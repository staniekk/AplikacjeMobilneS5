import React from 'react';
import { Text, View, Pressable, TextInput, Alert, BackHandler, Image, ScrollView } from "react-native";
import { styles } from "./style";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



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
        }, [navigation])
    );

    const handleLogin = () => {
        if (!textLogin.trim() || !textPassword.trim()) {
            Alert.alert("Error", "Login and password are required.");
            return;
        }
<<<<<<< Updated upstream
        // // Walidacja loginu i hasła
        // apiClient.post('/login', {
        //     login: textLogin,
        //     password: textPassword
        // })
        axios.get('http://192.168.7.140:3000/users')
=======
        
         axios.get('http://192.168.7.140:3000/users')
>>>>>>> Stashed changes
            .then(response => {
                const users = response.data;
                 authenticatedUser = users.find(user => user.login === textLogin && user.password === textPassword);

                 if (authenticatedUser) {
                    // Zapisz aktualny czas jako czas ostatniego logowania
                    AsyncStorage.setItem('lastLoginTime', JSON.stringify(new Date().getTime()));
<<<<<<< Updated upstream
                    navigation.navigate("TabNav");
=======
                    navigation.navigate('DrawerNav');
                    
>>>>>>> Stashed changes
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


        </ScrollView>

    );
}
