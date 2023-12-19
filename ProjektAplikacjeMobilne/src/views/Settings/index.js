import React, { useState, useContext } from 'react';
import { View, Text, Pressable, ScrollView, BackHandler, Switch, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';
import { ThemeContext } from '../../Constants/ThemeContext';

export function Settings({ navigation }) {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Get isDarkMode and toggleTheme
    const [volume, setVolume] = useState(50); // State for volume slider
    const [dailyStepsGoal, setDailyStepsGoal] = useState('10000'); // State for daily steps goal
    const [pauseTime, setPauseTime] = useState('10'); // State for pause time
    const [finishTime, setFinishTime] = useState('120'); // State for finish time


    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('lastLoginTime');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Logout failed', error);
        }
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
                    onChangeText={setDailyStepsGoal}
                    value={dailyStepsGoal}
                    keyboardType="numeric"
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

            </ScrollView>


            <View style={styles.footer}>
                <Pressable style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Log out</Text>
                </Pressable>
            </View>
        </View>
        
    );
}
