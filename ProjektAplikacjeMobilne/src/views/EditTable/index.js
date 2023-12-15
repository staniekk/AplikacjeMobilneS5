import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { styles } from './style';

export function EditTable({ route, navigation }) {
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (route.params?.description) {
            setDescription(route.params.description);
        }
    }, [route.params?.description]);

    const handleSave = () => {
        if (route.params?.updateTaskDescription) {
            route.params.updateTaskDescription(route.params.id, description);
        }
        navigation.goBack();
    };



    
    return (
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style = {styles.textInfo}>ID: {route.params.id}</Text>
            <TextInput
                style={styles.QText}
                value={description}
                onChangeText={setDescription}
                placeholder="Opisy"
                multiline
            />
            <Pressable style={styles.loginBtn} onPress={handleSave}>
                <Text style={styles.loginText}>Save</Text>
            </Pressable>
        </View>
    );
}
