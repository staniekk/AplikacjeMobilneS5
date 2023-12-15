import React from 'react';
import { View, Text, FlatList, Pressable, BackHandler } from 'react-native';
import { styles } from './style';
 import { api } from "../../instanceAxios.js";
import { useFocusEffect } from '@react-navigation/native';


export function TaskList({ navigation }) {

    const [tasks, setTasks] = React.useState([
        { id: '1', description: 'Task 1' },
        { id: '2', description: 'Task 2' },
        { id: '3', description: 'Task 3' },
    ]);

    
    const updateTaskDescription = (id, newDescription) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, description: newDescription };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.IdText}>{item.id}</Text>
            <Text style={styles.QText}>{item.description}</Text>
            <Pressable
                style={styles.editButton}
                onPress={() => navigation.navigate('EditTable', {
                    id: item.id,
                    description: item.description,
                    updateTaskDescription: updateTaskDescription
                })}
            >
                <Text style={styles.textInfo}>Edit</Text>
            </Pressable>
        </View>
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

        <View style={styles.textInfoTop}>
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}


