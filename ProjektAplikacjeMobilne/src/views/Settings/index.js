import React, { useState, useContext } from 'react';
import { View, Text, Pressable, ScrollView, BackHandler, Switch, TextInput, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';
import { ThemeContext } from '../../Constants/ThemeContext';
import { SettingsContext } from '../../Context/settingsContext';
import axios from 'axios';

export function Settings({ navigation }) {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Get isDarkMode and toggleTheme
    const [volume, setVolume] = useState(50); // State for volume slider
    const [pauseTime, setPauseTime] = useState('10'); // State for pause time
    const [finishTime, setFinishTime] = useState('120'); // State for finish time
    
    const {dailyStepGoal, setDailyStepGoal, userID} = useContext(SettingsContext)
    const [tempStepGoal, setTempStepGoal] = useState(dailyStepGoal); 

 
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('lastLoginTime');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const handleStepGoalChange = () =>{

        setTempStepGoal(Math.round( tempStepGoal))
        setDailyStepGoal(Math.round( tempStepGoal))

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
        <View style={styles.container}>
            <ScrollView style={styles.mainContainer} keyboardShouldPersistTaps='handled'>
            <Text style={styles.textInfo}>Settings</Text>

            {/* Dark Theme Toggle */}
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Dark Theme</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={toggleTheme}
                    value={isDarkMode}
                />
            </View>

            {/* Volume Slider */}
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Volume</Text>
                <Slider
                    style={styles.slider}
                    value={volume}
                    onValueChange={setVolume}
                    minimumValue={0}
                    maximumValue={100}
                />
            </View>

            {/* Daily Steps Goal Input */}
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

            {/* Pause Time Input */}
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Pause Time (s)</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPauseTime}
                    value={pauseTime}
                    placeholderTextColor="#FFFFFF"
                />
            </View>

            {/* Finish Time Input */}
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Finish Time (s)</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setFinishTime}
                    value={finishTime}
                    placeholderTextColor="#FFFFFF"
                />
            </View>

            <View style={styles.settingItem}>
                <Text style={styles.settingText}>{userID}</Text>
            </View>

            </ScrollView>


            <View style={styles.footer}>
                <Pressable style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Log out</Text>
                </Pressable>
            </View>
        </View>
        
    );
}
