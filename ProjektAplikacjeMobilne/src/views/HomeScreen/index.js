import React from 'react';
import { Text, View, Pressable, TextInput, Alert, BackHandler, Image } from "react-native";
import { styles } from "./style";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';


export function HomeScreen({ navigation }) {

    const [textLogin, setLogin] = React.useState('');
    const [textPassword, setPassword] = React.useState('');

    useFocusEffect(
        React.useCallback(() => {
            setLogin('');
            setPassword('');
        }, [])
    );

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

                <Text style={styles.textInfoT}> Today:</Text>
                <Text style={styles.textInfoT}> 3.16</Text>

                <TextInput
                    style={styles.loginTextInput}
                    onChangeText={setLogin}
                    value={textLogin}
                    placeholder='Tutaj będzie ten licznik'
                />



                <Text style={styles.textInfoAcc}>tip of the day </Text>
                <Text style={styles.textInfo}>Lorem ipsum lorem ipsum </Text>

                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Pressable style={styles.loginBtn} onPress={() => navigation.navigate('Map')}>
                    <Text style={styles.loginText}>Run!</Text>
                </Pressable >

                {/* <Pressable style={styles.textInfo} onPress={() => navigation.navigate('TabNav')}>
                <Text>Go to Home screen</Text>
            </Pressable> */}

            </View>
        </View>
    );
}
