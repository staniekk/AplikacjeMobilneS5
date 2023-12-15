import React from 'react';
import { Text, ScrollView, Pressable, TextInput, Alert, BackHandler, Image } from "react-native";
import { styles } from "./style";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export function Register({ navigation }) {
    const [textLoginR, setLoginR] = React.useState('');
    const [textPasswordR, setPasswordR] = React.useState('');
    const [textPasswordRepeatR, setPasswordRepeatR] = React.useState('');

    useFocusEffect(
        React.useCallback(() => {
            setLoginR('');
            setPasswordR('');
            setPasswordRepeatR('');
        }, [])
    );

    const checkUserExists = async (username) => {
        try {
            const response = await axios.get('http://192.168.1.229:3000/users');
            const users = response.data;
            return users.some(user => user.login === username);
        } catch (error) {
            Alert.alert("Error", "Unable to check if username exists: " + error.message);
            return false;
        }
    };

    const handleCreateAccount = async () => {
        if (!textLoginR.trim()) {
            Alert.alert("Error", "Login is required.");
            return;
        }
        if (!textPasswordR.trim()) {
            Alert.alert("Error", "Password is required.");
            return;
        }
        if (!textPasswordRepeatR.trim()) {
            Alert.alert("Error", "Repeat password is required.");
            return;
        }
        if (textPasswordR !== textPasswordRepeatR) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        const userExists = await checkUserExists(textLoginR);
        if (userExists) {
            Alert.alert("Error", "Username already exists. Please choose a different one.");
        } else {
            axios.post('http://192.168.1.229:3000/users', {
                login: textLoginR,
                password: textPasswordR
            })
                .then(() => {
                    Alert.alert("Success", "Account created successfully.");
                    navigation.navigate("Login");
                })
                .catch(error => {
                    Alert.alert("Registration Error", error.message);
                });
        }
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
                    onChangeText={setLoginR}
                    value={textLoginR}
                    placeholder='Login'
                />

                <TextInput
                    secureTextEntry
                    style={styles.loginTextInput}
                    onChangeText={setPasswordR}
                    value={textPasswordR}
                    placeholder='Password'
                />

                <TextInput
                    secureTextEntry
                    style={styles.loginTextInput}
                    onChangeText={setPasswordRepeatR}
                    value={textPasswordRepeatR}
                    placeholder='Repeat Password'
                />
                <Pressable style={styles.loginBtn} onPress={handleCreateAccount}>
                    <Text style={styles.loginText}>Register!</Text>
                </Pressable>
                {/* <Pressable style={styles.text} onPress={() => navigation.navigate('TabNav')}>
                <Text>Go to Home screen</Text>
            </Pressable> */}
            

        </ScrollView>


    );

}
