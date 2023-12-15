import React from 'react';
import { Text, View, Pressable, TextInput, Alert, BackHandler,Image } from "react-native";
import { styles } from "./style";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export function Register({ navigation }) {

    [textLoginR, setLoginR] = React.useState('');
    [textPasswordR, setPasswordR] = React.useState('');
    [textPasswordRepeatR, setPasswordRepeatR] = React.useState('');

    useFocusEffect(
        React.useCallback(() => {
            setLoginR('');
            setPasswordR('');
            setPasswordRepeatR('');
        }, [])
    );
    
    const handleCreateAccount = () => {
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
        // Call register user function
        registerUser();
    };

    React.useEffect(() => {
        const backAction = () => {
          return true; 
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    const registerUser = () => {
        axios.post('http://192.168.1.140:3000/users/register', {
            login: textLoginR,
            password: textPasswordR
        }).then(response => {
            const data = response.data;
            if (data.success) {
                Alert.alert("Success", "Account created successfully.");
                navigation.navigate('LoginW');
            } else {
                Alert.alert("Error", data.message || "Failed to create account.");
            }
        }).catch(error => {
            Alert.alert("Error", "Failed to create account.");
        });
    };

    return (
        <View style={styles.mainContainer}>
      
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={styles.logo}
             source={require('../../img/logo/Logo.png')}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


                </View>
                <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
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
                </View>

        </View>

       
    );

        }
