import React from 'react';
import { Text, View, Pressable, TextInput, Alert, BackHandler,Image } from "react-native";
import { styles } from "./style";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';


export function LoginW({ navigation }) {

    const [textLogin, setLogin] = React.useState('');
    const [textPassword, setPassword] = React.useState('');

    useFocusEffect(
        React.useCallback(() => {
            setLogin('');
            setPassword('');
        }, [])
    );

    const handleJoinAccount = () => {
        if (!textLogin.trim()) {
            Alert.alert("Error", "Login is required.");
            return;
        }
        if (!textPassword.trim()) {
            Alert.alert("Error", "Password is required.");
            return;
        }


        axios.get('http://192.168.1.140:3000/users')
        .then(response => {
            const users = response.data;
            const authenticatedUser = users.find(user => user.login === textLogin && user.password === textPassword);

            if (authenticatedUser) {
                navigation.navigate("TaskList");
            } else {

                alert("Nieprawidłowy login lub hasło");
            }
        })

        navigation.navigate('HomeScreen');
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
                <Pressable style={styles.loginBtn} onPress={handleJoinAccount}>
                    <Text style={styles.loginText}>Log in!</Text>
                </Pressable >
                <Pressable onPress={() =>navigation.navigate('Register')}>
                <Text style={styles.textInfoAcc}>Don't have an account? </Text>
                </Pressable>


                <Pressable >

                <Image style={styles.FP}
             source={require('../../img/logo/FP.png')}/>
                </Pressable>

                
                {/* <Pressable style={styles.textInfo} onPress={() => navigation.navigate('TabNav')}>
                <Text>Go to Home screen</Text>
            </Pressable> */}

            </View>
        </View>
    );
}
