import React, { useState, useContext } from 'react';
import { View, Text, Pressable, ScrollView, BackHandler, Switch, TextInput, Alert, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';
import { ThemeContext } from '../../Constants/ThemeContext';
import { SettingsContext } from '../../Context/settingsContext';
import axios from 'axios';

export function Settings({ navigation }) {
    // ustawianie celu krokow, zmienne do settingsow
    const { dailyStepGoal, setDailyStepGoal, userID, stepLength, setStepLength } = useContext(SettingsContext);
    const [tempStepGoal, setTempStepGoal] = useState(dailyStepGoal);
    const [tempStepLength, setTempLength] = useState(stepLength);

    // modal do zmiany hasla (peek)
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');

    // modal do zmiany hasla (ukryte hasla)
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [repeatNewPasswordVisible, setRepeatNewPasswordVisible] = useState(false);

    
    // wylogowanie, usuwa sesje
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('lastLoginTime');
            navigation.navigate('Login'); // przenies do ekranu logowania
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    // obsluga zmiany dzienneego celu krokow 
    const handleStepGoalChange = () =>{

        // zaokraglenie, aby nie wyswietlac liczb po przecinku
        setTempStepGoal(Math.round( tempStepGoal))
        setDailyStepGoal(Math.round( tempStepGoal))

        // update danych na serwerze
        const changeSettings = async () => {
            axios.put(`https://65ad4acaadbd5aa31be0832b.mockapi.io/am/userSettings/${userID}`,{
                dailyStepGoal:dailyStepGoal
            })
            .then(() => {
                console.log("Success, settings modified."); 
             })
            .catch(error => {
                console.log(error.message)
                Alert.alert("Settings modifications Error", error.message);
            });
            }
        changeSettings();
    }

    // obsluga zmiany dlugosci krokow
    const handleStepLengthChange = () =>{
            
        // zaokraglenie, aby nie wyswietlac liczb po przecinku
        setTempLength(tempStepLength)
        setStepLength(tempStepLength)

        // update danych na serwerze
        const changeSettings = async () => {
            axios.put(`https://65ad4acaadbd5aa31be0832b.mockapi.io/am/userSettings/${userID}`,{
                stepLength:stepLength
            })
            .then(() => {
                console.log("Success, settings modified.");
             })
            .catch(error => {
                console.log(error.message)
                Alert.alert("Settings modifications Error", error.message);
            });
            }
        changeSettings();
    }

    // obsluga cofniecia
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

    
    // obsluga zmiany hasla
    const handleChangePassword = () => {
        // sprawdz czy nowe haslo zostalo wpisane tak samo w obu polach.
        if (newPassword !== repeatNewPassword) {
            Alert.alert("Error", "New passwords do not match.");
            return;
        }
        
        // nowe haslo ma miec minimum 2 znaki
        if (newPassword.length < 2) { 
            Alert.alert("Error", "New password must be at least 2 characters long.");
            return;
        }
    
        // pobierz haslo uzytkownika i sprawdz czy uzytkownik poprawnie wpisal aktualne (stare) haslo
        axios.get(`https://65a40329a54d8e805ed451eb.mockapi.io/api/am/users?id=${userID}`)
    .then(response => {
        const userData = response.data;

        // nie ma takiego uzytkownika 
        if (!userData || userData.length === 0) {
            Alert.alert("Error", "User not found.");
            return;
        }

        // potwierdz ze znasz haslo
        if (userData[0].password !== currentPassword) {
            Alert.alert("Error", "Current password is incorrect.");
            return;
        }
        
        // zupdateuj haslo na serwerze
        const updatedUserData = { ...userData[0], password: newPassword };
        axios.put(`https://65a40329a54d8e805ed451eb.mockapi.io/api/am/users/${userID}`, updatedUserData)
        .then(response => {
            // schowaj modal ze zmiana hasla
            setModalVisible(false);
            Alert.alert("Success", "Password successfully changed.");
        })
        .catch(error => {
            Alert.alert("Error", "Failed to change password. " + error.message);
        });
        })
        .catch(error => {
            Alert.alert("Error", "Failed to verify current password. " + error.message);
        });
    };

    // wyswietla settingsy, cel krokow dzienny 
    return (
        <View style={styles.container}>
            <ScrollView style={styles.mainContainer} keyboardShouldPersistTaps='handled'>
                <Text style={styles.textInfo}>Settings</Text>

                {/* Dzienny cel krokow */}
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Daily Steps Goal</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTempStepGoal}
                        value={tempStepGoal.toString()}
                        inputMode='numeric'
                        keyboardType="numeric"
                        onSubmitEditing={handleStepGoalChange}
                    />
                </View> 

                {/* dlugosc kroku */}
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Step Length</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTempLength}
                        value={tempStepLength.toString()}
                        inputMode='numeric'
                        keyboardType="numeric"
                        onSubmitEditing={handleStepLengthChange}
                    />
                </View> 

                {/* wyswitetla user id */}
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>User ID:{userID}</Text>
                </View>

                {/* zmien haslo przyscisk */}
                <Pressable style={styles.changePasswordButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.changePasswordButtonText}>Change Password</Text>
                </Pressable>

            </ScrollView>

            {/* stopka */}
            <View style={styles.footer}>
                <Pressable style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Log out</Text>
                </Pressable>
            </View>

            {/* modal zmiany hasla */}
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            >
                <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.modalInput}
                        secureTextEntry={!currentPasswordVisible}
                        placeholder="Current Password"
                        onChangeText={setCurrentPassword}
                        value={currentPassword}
                    />
                    <Pressable onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}>
                        <Text>{currentPasswordVisible ? 'Hide' : 'Show'}</Text>
                    </Pressable>

                    <TextInput
                        style={styles.modalInput}
                        secureTextEntry={!newPasswordVisible}
                        placeholder="New Password"
                        onChangeText={setNewPassword}
                        value={newPassword}
                    />
                    <Pressable onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
                        <Text>{newPasswordVisible ? 'Hide' : 'Show'}</Text>
                    </Pressable>

                    <TextInput
                        style={styles.modalInput}
                        secureTextEntry={!repeatNewPasswordVisible}
                        placeholder="Repeat New Password"
                        onChangeText={setRepeatNewPassword}
                        value={repeatNewPassword}
                    />
                    <Pressable onPress={() => setRepeatNewPasswordVisible(!repeatNewPasswordVisible)}>
                        <Text>{repeatNewPasswordVisible ? 'Hide' : 'Show'}</Text>
                    </Pressable>

                    {/* Change Password Button */}
                    <Pressable
                        style={styles.modalButton}
                        onPress={handleChangePassword}
                    >
                        <Text style={styles.modalButtonText}>Change Password</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
        </View>
    );
}
